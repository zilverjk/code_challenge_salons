import { Service } from "./service";

export interface Salon {
  id: number;
  name: string;
  location: string;
  services: Service[];
}


