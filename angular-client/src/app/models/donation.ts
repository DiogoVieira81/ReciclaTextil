import { Donor } from "./donor";
import { Entity } from "./entity";

export interface Donation {
  id: string;
  numberOfParts: number;
  condition: string;
  kg: number;
  points: number;
  state: string;
  donor: Donor;
  entity: Entity;
}
