import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { thermals } from "@/db/schema";
import { and, between } from "drizzle-orm";

// Helper to map wind direction strings to degrees
const DIRECTION_DEGREES: Record<string, number> = {
  N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
  E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
  S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
  W: 270, WNW: 292.5, NW: 315, NNW: 337.5
};

// Check if wind is blowing in the opposite direction of the slope/thermal trigger orientation (Lee side / Sotavento)
function isOppositeWind(current: string, ideal: string): boolean {
  if (!current || !ideal) return false;
  const degCurrent = DIRECTION_DEGREES[current.toUpperCase()];
  const degIdeal = DIRECTION_DEGREES[ideal.toUpperCase()];
  
  if (degCurrent === undefined || degIdeal === undefined) return false;
  
  let diff = Math.abs(degCurrent - degIdeal);
  if (diff > 180) diff = 360 - diff;
  
  // Angle difference > 120 degrees is considered lee side (sotavento)
  return diff > 120;
}

// Check if wind is aligned with slope/thermal orientation (Windward side / Barlovento)
function isAlignedWind(current: string, ideal: string): boolean {
  if (!current || !ideal) return false;
  const degCurrent = DIRECTION_DEGREES[current.toUpperCase()];
  const degIdeal = DIRECTION_DEGREES[ideal.toUpperCase()];
  
  if (degCurrent === undefined || degIdeal === undefined) return false;
  
  let diff = Math.abs(degCurrent - degIdeal);
  if (diff > 180) diff = 360 - diff;
  
  // Angle difference <= 45 degrees is windward (barlovento)
  return diff <= 45;
}

// Factor of thermal strength based on time of day (insolation)
function getSolarMultiplier(hour: number): number {
  const multipliers: Record<number, number> = {
    10: 0.5,
    11: 0.8,
    12: 1.0,
    13: 1.0,
    14: 0.9,
    15: 0.75,
    16: 0.5,
    17: 0.25
  };
  return multipliers[hour] ?? 0.1;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const minLatStr = searchParams.get("minLat");
  const maxLatStr = searchParams.get("maxLat");
  const minLngStr = searchParams.get("minLng");
  const maxLngStr = searchParams.get("maxLng");
  
  // Dynamic parameters for the algorithm
  const currentWindDir = searchParams.get("windDir"); // e.g., "WNW"
  const currentWindSpeedStr = searchParams.get("windSpeed"); // e.g., "15" (km/h)
  const hourStr = searchParams.get("hour"); // e.g., "13"

  if (!minLatStr || !maxLatStr || !minLngStr || !maxLngStr) {
    return NextResponse.json(
      { error: "Missing bounding box parameters: minLat, maxLat, minLng, maxLng" },
      { status: 400 }
    );
  }

  const minLat = parseFloat(minLatStr);
  const maxLat = parseFloat(maxLatStr);
  const minLng = parseFloat(minLngStr);
  const maxLng = parseFloat(maxLngStr);

  if (isNaN(minLat) || isNaN(maxLat) || isNaN(minLng) || isNaN(maxLng)) {
    return NextResponse.json(
      { error: "Invalid bounding box parameters" },
      { status: 400 }
    );
  }

  try {
    const conditions = [
      between(thermals.latitude, minLat, maxLat),
      between(thermals.longitude, minLng, maxLng),
    ];

    const results = await db
      .select()
      .from(thermals)
      .where(and(...conditions))
      .limit(1000);

    const windSpeed = currentWindSpeedStr ? parseFloat(currentWindSpeedStr) : 0;
    const hour = hourStr ? parseInt(hourStr, 10) : 12;

    const geojson = {
      type: "FeatureCollection",
      features: results.map((t) => {
        let finalStrength = t.strength ?? 0;
        let isActive = true;
        let isTurbulent = false;

        // Apply dynamic solar insolation scaling
        const solarFactor = getSolarMultiplier(hour);
        finalStrength = finalStrength * solarFactor;

        // Apply wind-slope thermal collision algorithm
        if (currentWindDir && t.windDirection) {
          if (isOppositeWind(currentWindDir, t.windDirection)) {
            // Wind on the lee side (sotavento)
            if (windSpeed > 12) {
              // Turbulent lee shade renders thermal unusable/dangerous
              finalStrength = 0;
              isActive = false;
              isTurbulent = true;
            } else {
              // Light wind: thermal still triggers but is weaker
              finalStrength = finalStrength * 0.5;
            }
          } else if (isAlignedWind(currentWindDir, t.windDirection)) {
            // Windward (barlovento): mechanical ridge lift combines with thermal lift
            finalStrength = finalStrength * 1.25;
          }
        }

        // Final sanity capping and rounding
        finalStrength = Math.round(finalStrength * 10) / 10;
        if (finalStrength < 0.8) {
          isActive = false;
          finalStrength = 0;
        }

        return {
          type: "Feature",
          id: t.id,
          geometry: {
            type: "Point",
            coordinates: [t.longitude, t.latitude],
          },
          properties: {
            name: t.name,
            strength: finalStrength,
            baseStrength: t.strength,
            frequency: t.frequency,
            windDirection: t.windDirection,
            season: t.season,
            altitude: t.altitude,
            isActive,
            isTurbulent
          },
        };
      }),
    };

    return NextResponse.json(geojson);
  } catch (err: any) {
    console.error("Failed to query thermals:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
