"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Map, { Source, Layer, MapRef } from "react-map-gl/mapbox";
import { useFlightPlanStore } from "@/store/flight-plan-store";

const STYLE_MAP: Record<string, string> = {
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  outdoors: "mapbox://styles/mapbox/outdoors-v12",
};

// Coordinates and details for Roldanillo launch sites
const LAUNCH_COORDINATES: Record<
  string,
  { lat: number; lng: number; altitude: number; landingLat: number; landingLng: number; landingAlt: number }
> = {
  "Aguaclara": { lat: 4.4072, lng: -76.1558, altitude: 1350, landingLat: 4.4120, landingLng: -76.0520, landingAlt: 920 },
  "Los Tanques": { lat: 4.413611, lng: -76.154722, altitude: 1420, landingLat: 4.4120, landingLng: -76.0520, landingAlt: 920 },
  "La Pista": { lat: 4.4120, lng: -76.0520, altitude: 920, landingLat: 4.4120, landingLng: -76.0520, landingAlt: 920 }
};

// Helper to map wind direction strings to degrees (same as API)
const DIRECTION_DEGREES: Record<string, number> = {
  N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
  E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
  S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
  W: 270, WNW: 292.5, NW: 315, NNW: 337.5
};

// Heatmap Layer Configuration (fades out at high zooms)
const heatmapLayer: any = {
  id: "thermals-heat",
  type: "heatmap",
  maxzoom: 15,
  paint: {
    // Weight: stronger thermals have higher density impact
    "heatmap-weight": [
      "interpolate",
      ["linear"],
      ["get", "strength"],
      0, 0,
      6, 1
    ],
    // Intensity: scales up with zoom level to maintain heat intensity
    "heatmap-intensity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      9, 1,
      15, 3
    ],
    // Color ramp matching the requested mockup (deep blue center surrounded by red, yellow, green, cyan)
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0, "rgba(0, 0, 0, 0)",            // Transparent boundary
      0.15, "rgba(0, 230, 255, 0.45)",  // Soft cyan glow
      0.4, "rgba(0, 255, 0, 0.65)",     // Green ring
      0.65, "rgba(255, 255, 0, 0.8)",   // Yellow ring
      0.85, "rgba(255, 0, 0, 0.95)",    // Red ring
      1.0, "rgba(0, 0, 200, 1.0)"       // Deep blue core (densest trigger point)
    ],
    // Radius: increases as we zoom in
    "heatmap-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      9, 8,
      12, 22,
      15, 45
    ],
    // Opacity: fades out to zoom 14.5 to clear the view for pinpoint markers
    "heatmap-opacity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      13, 0.85,
      14.5, 0
    ]
  }
};

// Pinpoint Circle Layer Configuration (fades in at high zooms for precision)
const pointsLayer: any = {
  id: "thermals-points",
  type: "circle",
  minzoom: 13,
  paint: {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      13, 4,
      16, 12
    ],
    "circle-color": [
      "case",
      ["boolean", ["get", "isTurbulent"], false], "#ef4444", // Red for turbulent lee side
      ["boolean", ["get", "isActive"], true], "#10b981",    // Green for active/safe thermal
      "#9ca3af" // Grey for inactive
    ],
    "circle-stroke-width": 2,
    "circle-stroke-color": "#ffffff",
    "circle-opacity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      13, 0,
      14, 0.9
    ],
    "circle-stroke-opacity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      13, 0,
      14, 0.9
    ]
  }
};

// Glide Cone Fill Layer
const glideConeLayer: any = {
  id: "glide-cone-fill",
  type: "fill",
  paint: {
    "fill-color": "#10b981",
    "fill-opacity": 0.12,
    "fill-outline-color": "#10b981"
  }
};

// Glide Cone Line Layer (for crisp border)
const glideConeLineLayer: any = {
  id: "glide-cone-line",
  type: "line",
  paint: {
    "line-color": "#10b981",
    "line-width": 2,
    "line-dasharray": [2, 2],
    "line-opacity": 0.6
  }
};

// Launch Site Marker Layer
const launchSiteMarkerLayer: any = {
  id: "launch-site-marker",
  type: "circle",
  paint: {
    "circle-radius": 8,
    "circle-color": "#3b82f6", // Blue for launch site
    "circle-stroke-width": 3,
    "circle-stroke-color": "#ffffff"
  }
};

interface MapboxMapProps {
  logoPosition: "bottom-left" | "bottom-right";
}

export default function MapboxMap({ logoPosition }: MapboxMapProps) {
  const position = { latitude: 4.413611, longitude: -76.154722 };
  const mapRef = useRef<MapRef | null>(null);

  // Subscribe to Zustand flight plan store
  const selectedHour = useFlightPlanStore((s) => s.selectedHour);
  const forecastItems = useFlightPlanStore((s) => s.forecastItems);
  const selectedLaunch = useFlightPlanStore((s) => s.selectedLaunch);

  // Find wind properties for the active hour
  const currentForecast = forecastItems.find((f) => f.time === `${selectedHour}h`);
  const windDir = currentForecast?.windDirection ?? "E";
  const windSpeed = currentForecast?.windSpeed ?? 5;

  const [mapStyleUrl] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const savedStyle = localStorage.getItem("arpia_map_style");
      if (savedStyle && STYLE_MAP[savedStyle]) {
        return STYLE_MAP[savedStyle];
      }
    }
    return "mapbox://styles/mapbox/outdoors-v12";
  });

  const [thermalsGeojson, setThermalsGeojson] = useState<any>({
    type: "FeatureCollection",
    features: []
  });

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchThermals = useCallback(
    (minLat: number, maxLat: number, minLng: number, maxLng: number, wDir: string, wSpeed: number, hr: number) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch(
            `/api/thermals?minLat=${minLat}&maxLat=${maxLat}&minLng=${minLng}&maxLng=${maxLng}&windDir=${wDir}&windSpeed=${wSpeed}&hour=${hr}`
          );
          if (res.ok) {
            const data = await res.json();
            setThermalsGeojson(data);
          }
        } catch (error) {
          console.error("Error fetching thermals:", error);
        }
      }, 350); // 350ms debounce
    },
    []
  );

  const handleMapUpdate = useCallback(
    (evt: any) => {
      const map = evt.target;
      const zoom = map.getZoom();

      if (zoom < 9) {
        setThermalsGeojson({ type: "FeatureCollection", features: [] });
        return;
      }

      const bounds = map.getBounds();
      if (bounds) {
        fetchThermals(
          bounds.getSouth(),
          bounds.getNorth(),
          bounds.getWest(),
          bounds.getEast(),
          windDir,
          windSpeed,
          selectedHour
        );
      }
    },
    [fetchThermals, windDir, windSpeed, selectedHour]
  );

  // Sync camera position when launch site changes in the sidebar
  useEffect(() => {
    if (selectedLaunch && mapRef.current) {
      const coords = LAUNCH_COORDINATES[selectedLaunch.name];
      if (coords) {
        mapRef.current.flyTo({
          center: [coords.lng, coords.lat],
          zoom: 13.5,
          essential: true,
          duration: 2000
        });
      }
    }
  }, [selectedLaunch]);

  // Re-fetch thermals when wind direction, speed or active hour changes
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      const zoom = map.getZoom();
      if (zoom >= 9) {
        const bounds = map.getBounds();
        if (bounds) {
          fetchThermals(
            bounds.getSouth(),
            bounds.getNorth(),
            bounds.getWest(),
            bounds.getEast(),
            windDir,
            windSpeed,
            selectedHour
          );
        }
      }
    }
  }, [windDir, windSpeed, selectedHour, fetchThermals]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Compute the shifted Glide Cone geometry based on wind drift physics
  const glideConeGeojson = useCallback(() => {
    if (!selectedLaunch) return null;
    const coords = LAUNCH_COORDINATES[selectedLaunch.name];
    if (!coords) return null;

    const h = coords.altitude - coords.landingAlt;
    if (h <= 0) return null;

    // Glide ratio (8:1 glide path standard)
    const GLIDE_RATIO = 8;
    const baseRadiusMeters = h * GLIDE_RATIO;

    // Wind drift calculations
    const windSpeedMs = (windSpeed || 0) / 3.6;
    const descentRate = 1.25; // m/s descent average
    const glideTimeSeconds = h / descentRate;
    const driftMeters = windSpeedMs * glideTimeSeconds;

    // Downwind shift direction (opposite to wind source direction)
    const windAngleDeg = DIRECTION_DEGREES[windDir.toUpperCase()] ?? 0;
    const downwindAngleRad = ((windAngleDeg + 180) % 360) * (Math.PI / 180);

    const R = 6378137; // Earth radius in meters
    const dLat = (driftMeters * Math.cos(downwindAngleRad)) / R;
    const dLng = (driftMeters * Math.sin(downwindAngleRad)) / (R * Math.cos((coords.lat * Math.PI) / 180));

    const centerLat = coords.lat + dLat * (180 / Math.PI);
    const centerLng = coords.lng + dLng * (180 / Math.PI);

    // Build the glide circle polygon coordinates
    const points = 36;
    const ring = [];
    for (let i = 0; i < points; i++) {
      const theta = (i / points) * 2 * Math.PI;
      const pLat = centerLat + (baseRadiusMeters * Math.cos(theta) / R) * (180 / Math.PI);
      const pLng = centerLng + (baseRadiusMeters * Math.sin(theta) / (R * Math.cos((centerLat * Math.PI) / 180))) * (180 / Math.PI);
      ring.push([pLng, pLat]);
    }
    ring.push(ring[0]!); // Close polygon loop

    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [ring]
          },
          properties: { name: "Glide Cone" }
        }
      ]
    } as any;
  }, [selectedLaunch, windDir, windSpeed]);

  // Compute selected launch site point geometry
  const launchPointGeojson = useCallback(() => {
    if (!selectedLaunch) return null;
    const coords = LAUNCH_COORDINATES[selectedLaunch.name];
    if (!coords) return null;

    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [coords.lng, coords.lat]
          },
          properties: { name: selectedLaunch.name }
        }
      ]
    } as any;
  }, [selectedLaunch]);

  const coneData = glideConeGeojson();
  const launchData = launchPointGeojson();

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY || ""}
      initialViewState={{ ...position, zoom: 12 }}
      mapStyle={mapStyleUrl}
      style={{ width: "100%", height: "100%" }}
      attributionControl={false}
      logoPosition={logoPosition}
      reuseMaps={true}
      onLoad={handleMapUpdate}
      onMoveEnd={handleMapUpdate}
    >
      {/* 1. Glide Cone Layer (drawn below thermals) */}
      {coneData && (
        <Source id="glide-cone-source" type="geojson" data={coneData}>
          <Layer {...glideConeLayer} />
          <Layer {...glideConeLineLayer} />
        </Source>
      )}

      {/* 2. Launch Site Pin Layer */}
      {launchData && (
        <Source id="launch-point-source" type="geojson" data={launchData}>
          <Layer {...launchSiteMarkerLayer} />
        </Source>
      )}

      {/* 3. Thermals Heatmap and Pinpoint Layers */}
      <Source id="thermals-source" type="geojson" data={thermalsGeojson}>
        <Layer {...heatmapLayer} />
        <Layer {...pointsLayer} />
      </Source>
    </Map>
  );
}
