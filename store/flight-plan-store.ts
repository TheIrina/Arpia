import { create } from "zustand";
import { FlyConditions, LaunchSite, ThermalForecastItem } from "@/lib/weather";

interface FlightPlanState {
  // Base weather conditions loaded initially
  baseConditions: FlyConditions | null;
  setBaseConditions: (conds: FlyConditions) => void;

  // Hourly weather forecast data from Open-Meteo
  forecastItems: ThermalForecastItem[];
  setForecastItems: (items: ThermalForecastItem[]) => void;

  // Active time selected on the timeline (hour from 10 to 17)
  selectedHour: number;
  setSelectedHour: (hour: number) => void;

  // Active launch site card clicked in the sidebar
  selectedLaunch: LaunchSite | null;
  setSelectedLaunch: (launch: LaunchSite | null) => void;
}

export const useFlightPlanStore = create<FlightPlanState>((set) => ({
  baseConditions: null,
  setBaseConditions: (baseConditions) => set({ baseConditions }),
  forecastItems: [],
  setForecastItems: (forecastItems) => set({ forecastItems }),
  selectedHour: new Date().getHours() >= 10 && new Date().getHours() <= 17 ? new Date().getHours() : 12,
  setSelectedHour: (selectedHour) => set({ selectedHour }),
  selectedLaunch: null,
  setSelectedLaunch: (selectedLaunch) => set({ selectedLaunch }),
}));
