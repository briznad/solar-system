export interface Planet {
  id: string;
  name: string;
  description: string;
  diameter: number; // in kilometers
  distanceFromSun: number; // in million kilometers
  hasRings: boolean;
  moons: number;
  imageUrl?: string;
  createdBy: string; // user ID
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanetData {
  name: string;
  description: string;
  diameter: number;
  distanceFromSun: number;
  hasRings: boolean;
  moons: number;
  imageUrl?: string;
}
