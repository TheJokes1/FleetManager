import { BaseDTO } from "./BaseDTO";

export interface VehicleCreateDTO extends BaseDTO {
    make: string;
    model: string;
    chassisNumber: string;
    vehicleTypeId: number;
    fuelType: string | null;
    mileage: number | null;
    startLeasing: string | null;
    firstRegistration: string | null;
    durationLeasingMonths: number | null;
    active: boolean;
    licensePlateNumber: string | null;
    dateFrom: string | null;
}