import { BaseDTO } from "./BaseDTO";

export interface VehicleDisplayDTO extends BaseDTO {
    make: string | null;
    model: string | null;
    chassisNumber: string;
    fuelType: string | null;
    mileage: number | null;
    startLeasing: string | null;
    firstRegistration: string | null;
    durationLeasingMonths: number | null;
    vehicleType: number;
    active: boolean;
    licensePlateNumber: string;
    dateFrom: string;
}