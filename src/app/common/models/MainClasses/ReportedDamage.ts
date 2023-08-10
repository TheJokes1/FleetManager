import { BaseEntity } from "./BaseEntity";
import { DamageReport } from "./DamageReport";
import { InspectionReport } from "./Inspectionreport";

export interface ReportedDamage extends BaseEntity {
    part: string;
    damage: string;
    cost: number;
    repairType: string | null;
    inspectionReportId: number;
    inspectionReport: InspectionReport;
    damageReports: DamageReport[];
}