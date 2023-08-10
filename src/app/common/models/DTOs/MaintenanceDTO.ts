import { BaseDTO } from "./BaseDTO";

export interface MaintenanceDTO {
    vehicleId: number;
    date: string;
    cost: number | null;
    garage: string | null;
    worksPerformed: string | null;
    filePath: string;
}