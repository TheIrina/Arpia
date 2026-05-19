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

export interface ThermalData {
  currentClimbRate: number; // m/s
  maxClimbRate: number;
  cloudbase: number; // meters
  forecast: { time: string; rate: number }[];
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

    if (hourIndex !== -1) {
      // Get next 7 hours of daytime
      for (let i = 0; i < 7; i++) {
        const idx = hourIndex + i;
        if (idx >= data.hourly.time.length) break;

        const timeStr = data.hourly.time[idx].split("T")[1]; // "14:00"
        const hour = timeStr.split(":")[0] + "h";

        const temp = data.hourly.temperature_2m[idx];
        const cloudcover = data.hourly.cloudcover[idx];

        // Very rough mock calculation: more temp & less clouds = better thermals
        // Base thermal rate ~ 0 to 5 m/s
        let rate = (temp - 20) * 0.5 + (100 - cloudcover) * 0.02;
        rate = Math.max(0, Math.min(6, rate)); // Clamp 0 to 6
        rate = Math.round(rate * 10) / 10;

        if (rate > maxClimbRate) maxClimbRate = rate;

        forecast.push({ time: hour, rate });
      }
    }

    const currentClimbRate = forecast.length > 0 ? (forecast[0]?.rate ?? 0) : 0;
    const cloudbase =
      hourIndex !== -1
        ? Math.round(2000 + (data.hourly.temperature_2m[hourIndex] - 20) * 100)
        : 2100;

    const thermalData: ThermalData = {
      currentClimbRate,
      maxClimbRate: Math.max(maxClimbRate, 1), // Avoid 0 max
      cloudbase,
      forecast:
        forecast.length > 0
          ? forecast
          : [
              { time: "10h", rate: 2.1 },
              { time: "11h", rate: 3.2 },
              { time: "12h", rate: 4.1 },
              { time: "13h", rate: 4.5 },
              { time: "14h", rate: 3.8 },
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
        forecast: [{ time: "10h", rate: 2.1 }],
      },
    };
  }
}
