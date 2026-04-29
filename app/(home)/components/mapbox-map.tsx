"use client";

import { useState } from "react";
import Map from "react-map-gl/mapbox";

const STYLE_MAP: Record<string, string> = {
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
  outdoors: "mapbox://styles/mapbox/outdoors-v12",
};

interface MapboxMapProps {
  logoPosition: "bottom-left" | "bottom-right";
}

export default function MapboxMap({ logoPosition }: MapboxMapProps) {
  const position = { latitude: 4.413611, longitude: -76.154722 };
  
  // Since this component is dynamically imported with ssr: false,
  // window and localStorage are guaranteed to be defined here.
  const [mapStyleUrl] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const savedStyle = localStorage.getItem("arpia_map_style");
      if (savedStyle && STYLE_MAP[savedStyle]) {
        return STYLE_MAP[savedStyle];
      }
    }
    return "mapbox://styles/mapbox/outdoors-v12";
  });

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY || ""}
      initialViewState={{ ...position, zoom: 12 }}
      mapStyle={mapStyleUrl}
      style={{ width: "100%", height: "100%" }}
      attributionControl={false}
      logoPosition={logoPosition}
      reuseMaps={true}
    />
  );
}
