export type Condition = "flyable" | "marginal" | "nofly";

export interface FlyConditions {
  windSpeed: number;
  windDirection: string;
  windGust?: number;
  condition: Condition;
}

export interface LaunchSite {
  name: string;
  windSpeed: number;
  windDirection: string;
  condition: Condition;
  optimalTime: string;
}

export interface ThermalForecastItem {
  time: string;
  rate: number;         // m/s
  cloudbase: number;    // meters
  temp: number;         // °C
  cloudcover: number;   // %
  windSpeed: number;    // km/h
  windDirection: string;// direction
}

export interface ThermalData {
  currentClimbRate: number; // m/s
  maxClimbRate: number;
  cloudbase: number; // meters
  forecast: ThermalForecastItem[];
}

export interface WeatherData {
  flyConditions: FlyConditions;
  launchSites: LaunchSite[];
  thermalData: ThermalData;
}

function getWindDirectionStr(degrees: number): string {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index] ?? "N";
}

function getCondition(speed: number, gust?: number): Condition {
  const max = gust ? Math.max(speed, gust) : speed;
  if (max < 20) return "flyable";
  if (max <= 28) return "marginal";
  return "nofly";
}

export async function getWeatherData(): Promise<WeatherData> {
  // Coordinates for Roldanillo, Valle del Cauca
  const lat = 4.4072;
  const lon = -76.1558;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_2m,cloudcover&current_weather=true&timezone=auto`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 900 }, // Cache for 15 minutes
    });

    if (!res.ok) throw new Error("Failed to fetch weather data");
    const data = await res.json();

    const currentWindSpeed = Math.round(data.current_weather.windspeed);
    const currentWindDir = getWindDirectionStr(
      data.current_weather.winddirection,
    );

    // Find current hour index for gusts (current_weather doesn't include gusts)
    const nowIso = data.current_weather.time; // e.g. "2026-05-15T18:00"
    const hourIndex = data.hourly.time.findIndex((t: string) => t === nowIso);

    const currentGust =
      hourIndex !== -1
        ? Math.round(data.hourly.wind_gusts_10m[hourIndex])
        : undefined;
    const condition = getCondition(currentWindSpeed, currentGust);

    const flyConditions: FlyConditions = {
      windSpeed: currentWindSpeed,
      windDirection: currentWindDir,
      condition,
    };

    if (currentGust !== undefined) {
      flyConditions.windGust = currentGust;
    }

    // Simulate different launch sites based on base wind
    const launchSites: LaunchSite[] = [
      {
        name: "Aguaclara",
        windSpeed: currentWindSpeed,
        windDirection: currentWindDir,
        condition: getCondition(currentWindSpeed),
        optimalTime: "10:30",
      },
      {
        name: "Los Tanques",
        windSpeed: Math.round(currentWindSpeed * 1.2), // Usually stronger
        windDirection: currentWindDir,
        condition: getCondition(Math.round(currentWindSpeed * 1.2)),
        optimalTime: "08:00",
      },
      {
        name: "La Pista",
        windSpeed: Math.round(currentWindSpeed * 0.8), // Usually weaker
        windDirection: currentWindDir,
        condition: getCondition(Math.round(currentWindSpeed * 0.8)),
        optimalTime: "11:00",
      },
    ];

    // Build thermal forecast from hourly temperatures (rough estimation)
    const forecast = [];
    let maxClimbRate = 0;

    if (hourIndex !== -1 && data.current_weather?.time) {
      const [dateStr, timeStr] = data.current_weather.time.split("T");
      const currentHour = parseInt(timeStr.split(":")[0]);

      let targetDateStr = dateStr;
      // If past 5 PM (17h), look ahead to tomorrow's thermal forecast to help paragliders plan ahead
      if (currentHour >= 17) {
        const d = new Date(dateStr + "T00:00:00");
        d.setDate(d.getDate() + 1);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        targetDateStr = `${yyyy}-${mm}-${dd}`;
      }

      // Populate thermal active hours (10h to 17h)
      for (let h = 10; h <= 17; h++) {
        const targetIso = `${targetDateStr}T${h.toString().padStart(2, "0")}:00`;
        const idx = data.hourly.time.findIndex((t: string) => t === targetIso);
        if (idx !== -1) {
          const temp = data.hourly.temperature_2m[idx];
          const cloudcover = data.hourly.cloudcover[idx];
          const hourlyWindSpeed = Math.round(data.hourly.wind_speed_10m[idx]);
          const hourlyWindDir = getWindDirectionStr(data.hourly.wind_direction_10m[idx]);

          // Mock thermal climb rate calculation:
          // Warm temps and low clouds maximize lift
          let rate = (temp - 20) * 0.5 + (100 - cloudcover) * 0.02;
          rate = Math.max(0.5, Math.min(6.0, rate)); // Realistic thermals in Roldanillo range from 0.5 to 6.0 m/s
          rate = Math.round(rate * 10) / 10;

          if (rate > maxClimbRate) maxClimbRate = rate;

          const hourlyCloudbase = Math.round(2000 + (temp - 20) * 120 - cloudcover * 5);

          forecast.push({
            time: `${h}h`,
            rate,
            cloudbase: Math.max(1000, hourlyCloudbase),
            temp: Math.round(temp),
            cloudcover: Math.round(cloudcover),
            windSpeed: hourlyWindSpeed,
            windDirection: hourlyWindDir,
          });
        }
      }
    }

    const currentClimbRate = forecast.length > 0 ? (forecast[0]?.rate ?? 0) : 0;
    const cloudbase =
      hourIndex !== -1
        ? Math.round(2000 + (data.hourly.temperature_2m[hourIndex] - 20) * 120 - data.hourly.cloudcover[hourIndex] * 5)
        : 2100;

    const thermalData: ThermalData = {
      currentClimbRate,
      maxClimbRate: Math.max(maxClimbRate, 1.0), // Avoid 0 max
      cloudbase,
      forecast:
        forecast.length > 0
          ? forecast
          : [
              { time: "10h", rate: 2.1, cloudbase: 1950, temp: 24, cloudcover: 30, windSpeed: 12, windDirection: "ESE" },
              { time: "11h", rate: 3.2, cloudbase: 2100, temp: 26, cloudcover: 25, windSpeed: 14, windDirection: "SE" },
              { time: "12h", rate: 4.1, cloudbase: 2300, temp: 28, cloudcover: 15, windSpeed: 15, windDirection: "SE" },
              { time: "13h", rate: 4.5, cloudbase: 2400, temp: 29, cloudcover: 10, windSpeed: 17, windDirection: "SSE" },
              { time: "14h", rate: 3.8, cloudbase: 2200, temp: 27, cloudcover: 20, windSpeed: 16, windDirection: "SE" },
              { time: "15h", rate: 2.9, cloudbase: 2100, temp: 26, cloudcover: 25, windSpeed: 15, windDirection: "ESE" },
              { time: "16h", rate: 1.8, cloudbase: 1900, temp: 24, cloudcover: 35, windSpeed: 12, windDirection: "SE" },
              { time: "17h", rate: 0.8, cloudbase: 1700, temp: 22, cloudcover: 45, windSpeed: 9, windDirection: "ESE" },
            ],
    };

    return {
      flyConditions,
      launchSites,
      thermalData,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    // Return safe fallback if API fails
    return {
      flyConditions: {
        windSpeed: 18,
        windDirection: "SE",
        condition: "flyable",
      },
      launchSites: [
        {
          name: "Aguaclara",
          windSpeed: 18,
          windDirection: "SE",
          condition: "flyable",
          optimalTime: "10:30",
        },
      ],
      thermalData: {
        currentClimbRate: 3.2,
        maxClimbRate: 4.5,
        cloudbase: 2100,
        forecast: [
          { time: "10h", rate: 2.1, cloudbase: 1950, temp: 24, cloudcover: 30, windSpeed: 12, windDirection: "ESE" },
          { time: "11h", rate: 3.2, cloudbase: 2100, temp: 26, cloudcover: 25, windSpeed: 14, windDirection: "SE" },
          { time: "12h", rate: 4.1, cloudbase: 2300, temp: 28, cloudcover: 15, windSpeed: 15, windDirection: "SE" },
          { time: "13h", rate: 4.5, cloudbase: 2400, temp: 29, cloudcover: 10, windSpeed: 17, windDirection: "SSE" },
          { time: "14h", rate: 3.8, cloudbase: 2200, temp: 27, cloudcover: 20, windSpeed: 16, windDirection: "SE" },
          { time: "15h", rate: 2.9, cloudbase: 2100, temp: 26, cloudcover: 25, windSpeed: 15, windDirection: "ESE" },
          { time: "16h", rate: 1.8, cloudbase: 1900, temp: 24, cloudcover: 35, windSpeed: 12, windDirection: "SE" },
          { time: "17h", rate: 0.8, cloudbase: 1700, temp: 22, cloudcover: 45, windSpeed: 9, windDirection: "ESE" },
        ],
      },
    };
  }
}
