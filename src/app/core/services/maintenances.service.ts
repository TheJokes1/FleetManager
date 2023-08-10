import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DamageReportDTO } from 'src/app/common/models/DTOs/DamageReportDTO';
import { InspectionReportDTO } from 'src/app/common/models/DTOs/InspectionReportDTO';
import { MaintenanceDTO } from 'src/app/common/models/DTOs/MaintenanceDTO';
import { MaintenanceSaveDTO } from 'src/app/common/models/DTOs/MaintenanceSaveDTO';
import { Maintenance } from 'src/app/common/models/MainClasses/Maintenance';
import { Vehicle } from 'src/app/common/models/MainClasses/Vehicle';
import { Constants } from 'src/app/common/models/interfaces/Constants';

@Injectable({
  providedIn: 'root'
})
export class Maintenances {
  private baseUrlRead: string = Constants.baseUrlRead;
  private baseUrlWrite: string = Constants.baseUrlWrite;

  constructor(private https: HttpClient) { }

  getMaintenancesById(id: number){
    return this.https.get<MaintenanceDTO[]>(`${this.baseUrlRead}vehicle/maintenance/${id}`)
  }

  getDamageReportsById(id: number){
    return this.https.get<DamageReportDTO[]>(`${this.baseUrlRead}damageReport/${id}`)
  }

  addMaintenance(payload: MaintenanceSaveDTO){
    console.log('in service: ',payload);
    const headers = new HttpHeaders().append('header', 'value');
    return this.https.post<MaintenanceSaveDTO> (this.baseUrlWrite + 'vehicle/maintenance', payload, {headers})
  }
}
