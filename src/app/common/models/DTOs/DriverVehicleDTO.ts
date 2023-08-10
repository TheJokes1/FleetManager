import { BaseDTO } from "./BaseDTO";

export interface DriverVehicleDTO extends BaseDTO {
    firstName: string | null;
    name: string | null;
    vehicle: string | null;
    number: string | null;
    driversLicenseType: string | null;
    dateFrom?: string | null;
}