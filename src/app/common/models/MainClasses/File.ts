import { BaseEntity } from "./BaseEntity";
import { DamageReport } from "./DamageReport";
import { InspectionReport } from "./Inspectionreport";
import { Maintenance } from "./Maintenance";
import { Repair } from "./Repair";

export interface File extends BaseEntity {
    fileType: string;
    filepath: string;
    inspectionReportId: number | null;
    inspectionReport: InspectionReport;
    damageReportId: number | null;
    damageReport: DamageReport;
    repairId: number | null;
    repair: Repair;
    maintenanceId: number | null;
    maintenance: Maintenance;
}