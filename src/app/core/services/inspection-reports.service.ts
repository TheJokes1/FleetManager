import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InspectionReportDTO } from 'src/app/common/models/DTOs/InspectionReportDTO';
import { ReportedDamageDTO } from 'src/app/common/models/DTOs/reportedDamageDTO';
import { Constants } from 'src/app/common/models/interfaces/Constants';

@Injectable({
  providedIn: 'root'
})
export class InspectionReportsService {
  private baseUrlRead: string = Constants.baseUrlRead;
  private baseUrlWrite: string = Constants.baseUrlWrite;

  constructor(private https: HttpClient) { }

  getInspectionReportByVehicleId(id: number) {
    return this.https.get<InspectionReportDTO[]>(`${this.baseUrlRead}vehicle/inspectionReport/${id}`)
  }

  getReportedDamagesById(id: number) {
    return this.https.get<ReportedDamageDTO[]>(`${this.baseUrlRead}vehicle/reportedDamage/${id}`)
  }

  addInspectionReport(payload: InspectionReportDTO){
    console.log('Add Inspection in service: ', payload);
    const headers = new HttpHeaders().append('header', 'value');
    return this.https.post<InspectionReportDTO > (this.baseUrlWrite + 'vehicle/inspectionReport', payload, {headers})
  }
}