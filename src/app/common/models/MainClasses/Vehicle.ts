import { BaseEntity } from "./BaseEntity";
import { DamageReport } from "./DamageReport";
import { DriverVehicle } from "./DriverVehicle";
import { FuelType } from "./FuelType";
import { InspectionReport } from "./Inspectionreport";
import { LicensePlate } from "./LicensePlate";
import { Maintenance } from "./Maintenance";
import { Repair } from "./Repair";
import { UserRequest } from "./UserRequest";
import { VehicleType } from "./VehicleType";

export interface Vehicle extends BaseEntity {
    make: string | null;
    model: string | null;
    chassisNumber: string;
    vehicleType: number | null;
    fuelType: FuelType | null;
    mileage: number | null;
    startLeasing: string | null;
    firstRegistration: string | null;
    durationLeasingMonths: number | null;
    active: boolean | null;
    driverVehicles: DriverVehicle[];
    damageReports: DamageReport[];
    inspectionReports: InspectionReport[];
    licensePlates: LicensePlate;
    userRequests: UserRequest[];
    repairs: Repair[];
    maintenances: Maintenance[];
}