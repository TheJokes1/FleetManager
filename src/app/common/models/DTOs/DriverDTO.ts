import { BaseDTO } from "./BaseDTO";

export interface DriverDTO extends BaseDTO { 
    name: string;
    firstName: string;
    address1: string | null;
    address2: string | null;
    postalCode: string | null;
    city: string | null;
    country: string | null;
    dateOfBirth: string;
    socialSecurityNumber: string;
    driversLicenseType: string | null;
    driverVehicleId: number | null;
    newVehicleId: number | null;
}