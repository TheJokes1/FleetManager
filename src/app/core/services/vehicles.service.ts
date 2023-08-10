import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from 'src/app/common/models/MainClasses/Vehicle';
import { VehicleType } from 'src/app/common/models/MainClasses/VehicleType';
import { VehicleDisplayDTO } from 'src/app/common/models/DTOs/VehicleDisplayDTO';
import { Constants } from 'src/app/common/models/interfaces/Constants';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseUrlRead: string = Constants.baseUrlRead;
  private baseUrlWrite: string = Constants.baseUrlWrite;
  
  constructor(private https: HttpClient) { }

  getVehicles = (pageNumber?: number, pageSize?: number, searchQuery?: string) =>{
    console.log("search for: ", searchQuery)
    return this.https.get<VehicleDisplayDTO[]>(`${this.baseUrlRead}Vehicle?PageNumber=${pageNumber}&PageSize=${pageSize}&searchQuery=${searchQuery}`);
  }

  getVehicleById = (id: number) => {
    return this.https.get(this.baseUrlRead + 'Vehicle/' + id);
  }

  updateVehicle = (id: number, payload: any): any => {
    console.log("payload update vehicle: ", payload)
    const headers = new HttpHeaders().append('header', 'value');
    const params = new HttpParams().append('id', id);
    return this.https.put<Vehicle> (this.baseUrlWrite + 'Vehicle/' + id, payload, {headers, params})
  }

  deleteVehicle = (id: number) => {
      const headers = new HttpHeaders().append('header', 'value');
      const params = new HttpParams().append('id', id.toString());
      return this.https.delete(this.baseUrlWrite + 'Vehicle/' + id, { headers, params });
  }

  addVehicle = (payload: any): any => {
    const headers = new HttpHeaders().append('header', 'value');
    return this.https.post<Vehicle> (this.baseUrlWrite + 'Vehicle/', payload, {headers})
  }

  getDrivers = () =>{
    return this.https.get(this.baseUrlRead + 'Driver');
  }

  getDriverVehicle = (vehicleId: number) => {
    return this.https.get<any>(this.baseUrlRead + 'vehicle/driver/' + vehicleId);
  }
}
  
