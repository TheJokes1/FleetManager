import { BaseEntity } from "./BaseEntity";
import { Driver } from "./Driver";
import { Vehicle } from "./Vehicle";

export interface DriverVehicle extends BaseEntity {
    dateFrom: string | null;
    dateUntil: string | null;
    driverId: number;
    driver: Driver;
    vehicleId: number;
    vehicle: Vehicle;
}