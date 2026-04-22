import Map from "react-map-gl/mapbox";
import { MobileNavbar } from "../components/mobile-navbar";
import { MapAttribution } from "../components/map-attribution";


const getLightPreset = () => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 9) return "dawn";
  if (hour >= 9 && hour < 17) return "day";
  if (hour >= 17 && hour < 20) return "dusk";
  return "night";
};

export function MobileClient() {
  const position = { latitude: 4.413611, longitude: -76.154722 };

  return (
    <main className="h-full w-full relative">
      <MobileNavbar />
      <section className="absolute inset-0 w-full h-full">
        <MapAttribution />
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_KEY}
          initialViewState={{ ...position, zoom: 12 }}
          mapStyle="mapbox://styles/mapbox/standard"
          style={{ width: "100%", height: "100%" }}
          attributionControl={false}
          logoPosition="bottom-left"
          onLoad={(e) => {
            e.target.setConfigProperty("basemap", "lightPreset", getLightPreset());
          }}
        />
      </section>
    </main>
  );
}
