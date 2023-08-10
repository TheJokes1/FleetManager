import { BaseEntity } from "./BaseEntity";
import { DamageReport } from "./DamageReport";
import { Vehicle } from "./Vehicle";

export interface Repair extends BaseEntity {
    date: string;
    cost: number | null;
    vehicleId: number;
    vehicle: Vehicle;
    files: File[];
    damageReports: DamageReport[];
}