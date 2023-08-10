import { BaseDTO } from "./BaseDTO";

export interface DriverModel extends BaseDTO{
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
    NewVehVehicleId: number | null;
}