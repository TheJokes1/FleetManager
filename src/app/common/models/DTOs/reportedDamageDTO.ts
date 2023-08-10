import { BaseDTO } from "./BaseDTO";

export interface ReportedDamageDTO extends BaseDTO {
    part: string;
    damage: string;
    cost: number;
    repairType: string | null;
    inspectionReportId: number;
}