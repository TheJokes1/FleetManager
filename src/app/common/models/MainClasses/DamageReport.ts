import { BaseEntity } from "./BaseEntity";
import { Driver } from "./Driver";
import { Repair } from "./Repair";
import { ReportedDamage } from "./ReportedDamage";
import { Vehicle } from "./Vehicle";

export interface DamageReport extends BaseEntity {
    reportDate: string;
    dateOfDamage: string | null;
    damageDescription: string;
    vehicleId: number;
    vehicle: Vehicle | null;
    driverId: number;
    driver: Driver | null;
    reportedDamageId: number | null;
    reportedDamage: ReportedDamage | null;
    repairId: number | null;
    repair: Repair | null;
    repairs: Repair[] | null;
    files: File[] | null;
}