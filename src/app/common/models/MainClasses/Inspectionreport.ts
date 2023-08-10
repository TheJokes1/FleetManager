import { BaseEntity } from "./BaseEntity";
import { Driver } from "./Driver";
import { ReportedDamage } from "./ReportedDamage";
import { Vehicle } from "./Vehicle";

export interface InspectionReport extends BaseEntity {
    date: string;
    driverWasPresent: boolean;
    totalCost: number | null;
    vehicleId: number;
    vehicle: Vehicle;
    driverId: number;
    driver: Driver;
    files: File[];
    reportedDamages: ReportedDamage[];
}