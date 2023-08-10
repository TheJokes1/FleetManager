import { BaseDTO } from "./BaseDTO";

export interface DamageReportDTO extends BaseDTO {
    reportDate: string;
    dateOfDamage: string | null;
    damageDescription: string;
    vehicleId: number;
    driverId: number;
    reportedDamageId: number | null;
    repairId: number | null;
}