import { BaseDTO } from "./BaseDTO";

export interface InspectionReportDTO extends BaseDTO{
    vehicleId: number;
    driverId: number | null;
    driverName: string | null;
    date: string;
    driverWasPresent: boolean;
    totalCost: number | null;
    filePath: string | null;
}