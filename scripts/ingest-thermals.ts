import * as dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../db/schema';

// Load environment variables from .env
dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL is not set in environment.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

// Real-world paragliding thermal trigger points in Valle del Cauca, Colombia (Roldanillo area)
const rawThermals = [
  // Roldanillo Ridge & Town Area
  {
    id: "thermal_roldanillo_los_tanques",
    name: "Los Tanques Launch Thermal",
    latitude: 4.413611,
    longitude: -76.154722,
    strength: 3.8,
    frequency: 5.0,
    windDirection: "E",
    season: "All"
  },
  {
    id: "thermal_roldanillo_la_cruz",
    name: "La Cruz Foothills (The Cross)",
    latitude: 4.4082,
    longitude: -76.1622,
    strength: 4.2,
    frequency: 4.8,
    windDirection: "E",
    season: "All"
  },
  {
    id: "thermal_roldanillo_el_pico",
    name: "El Pico Ridge Trigger",
    latitude: 4.4215,
    longitude: -76.1450,
    strength: 3.5,
    frequency: 4.6,
    windDirection: "ENE",
    season: "All"
  },
  {
    id: "thermal_roldanillo_aguaclara",
    name: "Aguaclara Valley Convection",
    latitude: 4.4102,
    longitude: -76.1380,
    strength: 3.2,
    frequency: 4.0,
    windDirection: "E",
    season: "All"
  },
  {
    id: "thermal_roldanillo_la_pista",
    name: "La Pista Landing Strip Thermal",
    latitude: 4.4120,
    longitude: -76.0520,
    strength: 2.9,
    frequency: 3.8,
    windDirection: "E",
    season: "All"
  },
  {
    id: "thermal_roldanillo_huasano",
    name: "Huasanó Slope Trigger",
    latitude: 4.3510,
    longitude: -76.1650,
    strength: 3.6,
    frequency: 4.2,
    windDirection: "SE",
    season: "All"
  },
  {
    id: "thermal_roldanillo_bolivar_ridge",
    name: "Bolívar South Ridge",
    latitude: 4.3120,
    longitude: -76.2050,
    strength: 3.4,
    frequency: 3.5,
    windDirection: "SSE",
    season: "All"
  },
  {
    id: "thermal_roldanillo_bolivar_flat",
    name: "Bolívar Valley Flat",
    latitude: 4.2980,
    longitude: -76.1850,
    strength: 3.0,
    frequency: 3.0,
    windDirection: "SE",
    season: "Dry"
  },
  {
    id: "thermal_roldanillo_higueroncito",
    name: "Higueroncito Quarry Spot",
    latitude: 4.4350,
    longitude: -76.1300,
    strength: 4.0,
    frequency: 4.5,
    windDirection: "E",
    season: "All"
  },
  
  // Zarzal Flats (across the valley)
  {
    id: "thermal_zarzal_sugar_mill",
    name: "Riopaila Zarzal Sugarcane Mill",
    latitude: 4.3980,
    longitude: -76.0710,
    strength: 4.8,
    frequency: 4.9,
    windDirection: "ESE",
    season: "Dry"
  },
  {
    id: "thermal_zarzal_railway",
    name: "Zarzal Railway Junction Flats",
    latitude: 4.4050,
    longitude: -76.0620,
    strength: 3.2,
    frequency: 3.5,
    windDirection: "E",
    season: "All"
  },
  {
    id: "thermal_zarzal_limones",
    name: "Limones Intersection Hotspot",
    latitude: 4.4510,
    longitude: -76.0420,
    strength: 3.5,
    frequency: 3.8,
    windDirection: "E",
    season: "All"
  },

  // La Unión & Toro (North-West along the main ridge route)
  {
    id: "thermal_la_union_town",
    name: "La Unión Town Thermal",
    latitude: 4.5290,
    longitude: -76.1010,
    strength: 3.7,
    frequency: 4.1,
    windDirection: "NNE",
    season: "All"
  },
  {
    id: "thermal_la_union_grapefields",
    name: "Grapefields Micro-climate Spot",
    latitude: 4.5420,
    longitude: -76.0890,
    strength: 3.9,
    frequency: 4.3,
    windDirection: "NE",
    season: "All"
  },
  {
    id: "thermal_toro_town",
    name: "Toro Town Foothills",
    latitude: 4.6110,
    longitude: -76.0820,
    strength: 4.0,
    frequency: 4.2,
    windDirection: "NE",
    season: "All"
  },
  {
    id: "thermal_toro_cemetery",
    name: "Toro Cemetery Hill Trigger",
    latitude: 4.6220,
    longitude: -76.0710,
    strength: 3.6,
    frequency: 3.9,
    windDirection: "NNE",
    season: "All"
  },

  // Obando / Victoria Flats (North-East route)
  {
    id: "thermal_obando_ridge",
    name: "Obando Slope Thermal",
    latitude: 4.5770,
    longitude: -75.9750,
    strength: 3.5,
    frequency: 3.8,
    windDirection: "NE",
    season: "All"
  },
  {
    id: "thermal_obando_plains",
    name: "Obando River Plains",
    latitude: 4.5820,
    longitude: -75.9920,
    strength: 3.1,
    frequency: 3.2,
    windDirection: "NNE",
    season: "All"
  },
  {
    id: "thermal_la_victoria_slopes",
    name: "La Victoria Hills Trigger",
    latitude: 4.5200,
    longitude: -75.9810,
    strength: 3.8,
    frequency: 4.0,
    windDirection: "E",
    season: "All"
  },

  // Ansermanuevo / Cartago (North Valley edge)
  {
    id: "thermal_ansermanuevo_launch_spot",
    name: "Ansermanuevo Waypoint Trigger",
    latitude: 4.7980,
    longitude: -75.9850,
    strength: 3.9,
    frequency: 4.7,
    windDirection: "NNE",
    season: "All"
  },
  {
    id: "thermal_ansermanuevo_flats",
    name: "Ansermanuevo Valley Convection",
    latitude: 4.7820,
    longitude: -75.9950,
    strength: 3.3,
    frequency: 3.6,
    windDirection: "N",
    season: "All"
  },
  {
    id: "thermal_cartago_airport_spot",
    name: "Santa Ana Airport Convection",
    latitude: 4.7420,
    longitude: -75.9320,
    strength: 3.4,
    frequency: 3.8,
    windDirection: "N",
    season: "All"
  },
  {
    id: "thermal_cartago_rio_viejo",
    name: "Río Viejo Thermal",
    latitude: 4.7210,
    longitude: -75.9550,
    strength: 3.0,
    frequency: 3.2,
    windDirection: "NNW",
    season: "All"
  },

  // Bugalagrande / Tuluá (South Valley route)
  {
    id: "thermal_bugalagrande_town",
    name: "Bugalagrande Industrial Heat",
    latitude: 4.2120,
    longitude: -76.1580,
    strength: 3.5,
    frequency: 3.4,
    windDirection: "S",
    season: "All"
  },
  {
    id: "thermal_riopaila_factory_south",
    name: "Riopaila South Industrial Zone",
    latitude: 4.2510,
    longitude: -76.1020,
    strength: 4.6,
    frequency: 4.0,
    windDirection: "SE",
    season: "All"
  },
  {
    id: "thermal_tulua_airport",
    name: "Farfán Airstrip Tuluá",
    latitude: 4.0880,
    longitude: -76.2020,
    strength: 3.3,
    frequency: 3.5,
    windDirection: "S",
    season: "All"
  },
  {
    id: "thermal_tulua_hills",
    name: "Tuluá East Foothills",
    latitude: 4.0720,
    longitude: -76.1520,
    strength: 3.6,
    frequency: 3.8,
    windDirection: "SSE",
    season: "All"
  }
];

async function main() {
  console.log("Starting paragliding thermals data ingestion to Neon database...");
  
  // Clean existing thermal records to allow idempotent ingestion updates
  console.log("Cleaning up existing thermals records...");
  try {
    // Basic delete all using Drizzle ORM
    await db.delete(schema.thermals);
    console.log("Existing records cleared.");
  } catch (err) {
    console.warn("Could not clear table, it might not exist yet or was empty. Continuing...", err);
  }

  // Insert real-world Valle del Cauca thermal trigger points
  console.log(`Inserting ${rawThermals.length} production-ready thermals...`);
  try {
    await db.insert(schema.thermals).values(rawThermals);
    console.log("Successfully ingested Valle del Cauca thermals to Neon!");
  } catch (err) {
    console.error("Error during thermal ingestion:", err);
    process.exit(1);
  }
  
  process.exit(0);
}

main();
