import { BaseEntity } from "./BaseEntity";
import { Vehicle } from "./Vehicle";

export interface Maintenance extends BaseEntity {
    date: string;
    cost: number | null;
    garage: string | null;
    worksPerformed: string | null;
    vehicleId: number;
    filePath: string;
}