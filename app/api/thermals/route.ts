import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { thermals } from "@/db/schema";
import { and, between, eq, gte } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const minLatStr = searchParams.get("minLat");
  const maxLatStr = searchParams.get("maxLat");
  const minLngStr = searchParams.get("minLng");
  const maxLngStr = searchParams.get("maxLng");
  
  const season = searchParams.get("season");
  const windDirection = searchParams.get("windDirection");
  const minStrengthStr = searchParams.get("minStrength");

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

    if (season && season !== "All") {
      conditions.push(eq(thermals.season, season));
    }

    if (windDirection && windDirection !== "All") {
      conditions.push(eq(thermals.windDirection, windDirection));
    }

    if (minStrengthStr) {
      const minStrength = parseFloat(minStrengthStr);
      if (!isNaN(minStrength)) {
        conditions.push(gte(thermals.strength, minStrength));
      }
    }

    const results = await db
      .select()
      .from(thermals)
      .where(and(...conditions))
      .limit(1000); // safety cap to prevent client performance degradation

    const geojson = {
      type: "FeatureCollection",
      features: results.map((t) => ({
        type: "Feature",
        id: t.id,
        geometry: {
          type: "Point",
          coordinates: [t.longitude, t.latitude],
        },
        properties: {
          name: t.name,
          strength: t.strength,
          frequency: t.frequency,
          windDirection: t.windDirection,
          season: t.season,
        },
      })),
    };

    return NextResponse.json(geojson);
  } catch (err: any) {
    console.error("Failed to query thermals:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
