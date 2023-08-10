import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverDTO } from 'src/app/common/models/DTOs/DriverDTO';
import { DriverVehicleDTO } from 'src/app/common/models/DTOs/DriverVehicleDTO';
import { Driver } from 'src/app/common/models/MainClasses/Driver';
import { Vehicle } from 'src/app/common/models/MainClasses/Vehicle';
import { Constants } from '../../common/models/interfaces/Constants';


@Injectable({
  providedIn: 'root'
})
export class DriversService {

  private baseUrlRead: string = Constants.baseUrlRead;
  private baseUrlWrite: string = Constants.baseUrlWrite;

  constructor(private https: HttpClient) { }

  getDrivers = (pageNumber: number, pageSize: number, searchQuery) => {
    return this.https.get<Driver[]>(this.baseUrlRead + 'Driver?pageNumber=' + pageNumber + '&pageSize=' + pageSize 
     + '&searchQuery=' + searchQuery);
  }

  getDriverById = (id: number) => {
    return this.https.get<Driver>(this.baseUrlRead + 'Driver/' + id);
  }

  updateDriver(id: number, payload: DriverDTO): any {
    console.log('payload in service: ', payload);
    const headers = new HttpHeaders().set('header', 'value');
    const url = `${this.baseUrlWrite}Driver/${id}`;
    return this.https.put<DriverDTO>(url, payload, { headers });
  }
  
  deleteDriver = (id: number) => {
    const headers = new HttpHeaders().append('header', 'value');
    const params = new HttpParams().append('id', id.toString());
    return this.https.delete(this.baseUrlWrite + 'Driver/' + id, { headers, params });
}

  getDriverVehicle = (id: number) => {
    return this.https.get<any>(this.baseUrlRead + 'Driver/vehicle/' + id);
  }

  addDriver = (payload: DriverDTO): any => {
    console.log(payload); 
    const headers = new HttpHeaders().append('header', 'value');
    return this.https.post<DriverDTO> (this.baseUrlWrite + 'Driver/', payload, {headers})
  }

}
