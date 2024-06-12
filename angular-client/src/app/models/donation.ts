import { Donor } from './donor';
import { Entity } from './entity';

export interface Donation {
  numberOfParts: number;
  condition: string;
  kg: number;
  points: number;
  state: string;
  donor: string | null;
  entity: string;
}
