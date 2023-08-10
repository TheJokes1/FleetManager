import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeDTO } from '../../common/models/DTOs/TypeDTO';
import { Constants } from 'src/app/common/models/interfaces/Constants';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {
  private baseUrlRead: string = Constants.baseUrlRead;
  private baseUrlWrite: string = Constants.baseUrlWrite;

  constructor(private https: HttpClient) { }

  getVehicleTypes = () =>{
    return this.https.get<TypeDTO[]>(`${this.baseUrlRead}type/vehicleType`);
  }

  getRequestTypes = () => {
    return this.https.get<TypeDTO[]>(`${this.baseUrlRead}type/requestType`);
  }
  
  getFuelcardExtras = () => {
    console.log("get fuelcards");
    return this.https.get<TypeDTO[]>(`${this.baseUrlRead}type/fuelcardExtra`);
  }
  
  // saveAllVehicleTypes = (payload: TypeDTO[]) => {
  //   console.log("payload: ", payload);
  //   const url = `${this.baseUrlWrite}type/vehicleType`;
  //   const headers = new HttpHeaders().append('header', 'value');
  //   return this.https.post<TypeDTO[]>(url, payload, {headers});
  // }

  deleteType = (id: number) => {
    return this.https.delete(`${this.baseUrlWrite}type/vehicleType/${id}`)
  }

  addType = (payload: TypeDTO) => {
    const url = `${this.baseUrlWrite}type/vehicleType`;
    const headers = new HttpHeaders().append('header', 'value');
    return this.https.post<TypeDTO[]>(url, payload, {headers});
  }
 
  updateType = (payload: TypeDTO, id: number) => {
    const url = `${this.baseUrlWrite}type/vehicleType/${id}`;
    const headers = new HttpHeaders().append('header', 'value');
    return this.https.put<TypeDTO[]>(url, payload, {headers});
  }
}
