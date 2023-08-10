import { BaseDTO } from "./BaseDTO";

export interface MaintenanceSaveDTO {
    vehicleId: number;
    date: string;
    cost: number | null;
    garage: string | null;
    worksPerformed: string | null;
    filePath: string | null;
    //fileData: File | null;
}