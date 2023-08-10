import { BaseEntity } from "./BaseEntity";
import { Vehicle } from "./Vehicle";

export interface LicensePlate extends BaseEntity {
    number: string;
    dateFrom: Date | null;
    dateUntil: Date | null;
    vehicleId: number;
    active: boolean
    //vehicle: Vehicle | null;
}