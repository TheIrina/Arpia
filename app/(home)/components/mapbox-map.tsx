"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Map, { Source, Layer } from "react-map-gl/mapbox";

const STYLE_MAP: Record<string, string> = {
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  outdoors: "mapbox://styles/mapbox/outdoors-v12",
};

interface MapboxMapProps {
  logoPosition: "bottom-left" | "bottom-right";
}

const heatmapLayer: any = {
  id: "thermals-heat",
  type: "heatmap",
  maxzoom: 16,
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
      16, 3
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
    // Radius: increases as we zoom in to show area of thermal trigger impact
    "heatmap-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      9, 8,
      12, 22,
      16, 45
    ],
    // Opacity: fades out slightly at maximum zoom to reveal underlying topography
    "heatmap-opacity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      13, 0.85,
      16, 0.25
    ]
  }
};

export default function MapboxMap({ logoPosition }: MapboxMapProps) {
  const position = { latitude: 4.413611, longitude: -76.154722 };
  
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

  const fetchThermals = useCallback((minLat: number, maxLat: number, minLng: number, maxLng: number) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/thermals?minLat=${minLat}&maxLat=${maxLat}&minLng=${minLng}&maxLng=${maxLng}`
        );
        if (res.ok) {
          const data = await res.json();
          setThermalsGeojson(data);
        }
      } catch (error) {
        console.error("Error fetching thermals:", error);
      }
    }, 350); // 350ms debounce
  }, []);

  const handleMapUpdate = useCallback((evt: any) => {
    const map = evt.target;
    const zoom = map.getZoom();

    if (zoom < 9) {
      // Clear thermal layers at very low zoom levels to conserve resources
      setThermalsGeojson({ type: "FeatureCollection", features: [] });
      return;
    }

    const bounds = map.getBounds();
    fetchThermals(
      bounds.getSouth(),
      bounds.getNorth(),
      bounds.getWest(),
      bounds.getEast()
    );
  }, [fetchThermals]);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Map
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
      <Source id="thermals-source" type="geojson" data={thermalsGeojson}>
        <Layer {...heatmapLayer} />
      </Source>
    </Map>
  );
}
