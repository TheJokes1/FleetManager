import { BaseEntity } from "./BaseEntity";
import { DamageReport } from "./DamageReport";
import { DriverFuelCard } from "./DriverFuelCard";
import { DriverVehicle } from "./DriverVehicle";
import { InspectionReport } from "./Inspectionreport";
import { UserRequest } from "./UserRequest";

export interface Driver extends BaseEntity {
    name: string;
    firstName: string;
    address1: string | null;
    address2: string | null;
    postalCode: string | null;
    city: string | null;
    country: string | null;
    dateOfBirth: string;
    socialSecurityNumber: string | null;
    driversLicenseType: string | null;
    active: boolean | null;
    inspectionReports: InspectionReport[];
    userRequests: UserRequest[];
    driverVehicles: DriverVehicle[];
    damageReports: DamageReport[];
    driverFuelCards: DriverFuelCard[];
}