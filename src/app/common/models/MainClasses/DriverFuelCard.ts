import { BaseEntity } from "./BaseEntity";
import { Driver } from "./Driver";
import { FuelCard } from "./FuelCard";

export interface DriverFuelCard extends BaseEntity {
    dateFrom: string;
    dateUntil: string | null;
    driverId: number;
    driver: Driver;
    fuelCardId: number;
    fuelCard: FuelCard;
}