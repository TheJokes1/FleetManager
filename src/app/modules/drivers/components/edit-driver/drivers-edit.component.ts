import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, debounceTime, map, startWith, switchMap, tap, throwError } from 'rxjs';
import { DriversService } from 'src/app/core/services/drivers.service';
import { CustomDialogComponent } from 'src/app/common/dialogs/custom-dialog/custom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from 'src/app/common/models/MainClasses/DialogData';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleService } from 'src/app/core/services/vehicles.service';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_AUTOCOMPLETE_VALUE_ACCESSOR } from '@angular/material/autocomplete';
import { Vehicle } from 'src/app/common/models/MainClasses/Vehicle';
import { VehicleDisplayDTO } from 'src/app/common/models/DTOs/VehicleDisplayDTO';
import { DamageReportDTO } from 'src/app/common/models/DTOs/DamageReportDTO';
import { Maintenances } from 'src/app/core/services/maintenances.service';

@Component({
  selector: 'app-drivers-edit',
  templateUrl: './drivers-edit.component.html',
  styleUrls: ['./drivers-edit.component.scss']
})

export class DriversEditComponent implements OnInit{
  driverId: number = 0;
  vehicleId: number;
  title: string = 'Edit Driver';
  licenses: string[] = ['A', 'B', 'C', 'D'];
  disabled: boolean = false;
  dialogData: {title: '', message: ''};
  errorMessage: string = '';
  //drivers: DriverVehicleModel[];
  drivers: any[] = [];
  vehicles: any[] = [];
  length: number = 0;
  vehicleString: string;;
  filteredVehicles: Observable<VehicleDisplayDTO[]>;
  damageReportArray: DamageReportDTO[]= [];

  driverForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]),
    name: new FormControl('',  [Validators.required, Validators.maxLength(50)]),
    address1: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    address2: new FormControl('', [Validators.maxLength(50)]),
    postalCode: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    country: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    dateOfBirth: new FormControl('', Validators.required),
    socialSecurityNumber: new FormControl('', Validators.required),
    driversLicenseType: new FormControl('', Validators.required),
    currentVehicle: new FormControl(''),
    searchQuery: new FormControl(''),
    vehicleControl: new FormControl()
  });

  constructor(private route: ActivatedRoute, private driverService: DriversService, private formBuilder: FormBuilder,
    private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private location: Location,
    private vehicleService: VehicleService, private maintenanceService: Maintenances){}

    
  ngOnInit(): void {
    var identity = this.route.snapshot.paramMap.get('driverId');
    this.driverId = Number(identity) || 0;
    this.getDriverData(this.driverId);
    this.getDriverVehicleData(this.driverId);
    this.getDamageReports(this.driverId);
    this.filteredVehicles = this.driverForm.get("vehicleControl").valueChanges.pipe(
      //tap(value => console.log(value)),
      startWith(''),
      debounceTime(700),
      switchMap(value => (this.getVehicles(value))),    
    );
  }

  getDriverData(id: number) {
    this.driverService.getDriverById(id).subscribe({
      next: (response: any) => {
        console.log("driver: ", response);
        this.driverForm.patchValue(response);
      },
      error: error => console.log(error),
      complete: () => {}
    })
  }

  getDriverVehicleData(id: number) {
    this.driverService.getDriverVehicle(this.driverId).subscribe({
      next: (response: any) => {
        console.log("driverVehicle: ", response);
        this.vehicleId= response.vehicleId;
        this.getVehicleById();
      }
    })
  }
  
  getDamageReports(vehicleId: number){
    this.maintenanceService.getDamageReportsById(vehicleId).subscribe({
      next: (response: any) => {
        console.log("damageReports: ", response);
        this.damageReportArray = response;
      },
      error: error => (console.log(error)),
      complete: () => {}
    });
  }

  getVehicleById(){
    this.vehicleService.getVehicleById(this.vehicleId).subscribe({
      next: (response: any) => {
        //console.log('vehicle: ', response);
        this.vehicleString = response.make + ' ' + response.model + ' (' + response.licensePlateNumber + ')';
      }
    });
  }


  getVehicles(searchQuery: string){
    return this.vehicleService.getVehicles(0, 100, searchQuery)
    .pipe(
      map((response: any) => {
        const mappedData = response.items.map((item: any) => {
          return {
            ...item,
            mappedString: `${item.make} ${item.model} (${item.licensePlateNumber})`
          };
        });
        //return {items: mappedData};
        return mappedData;
      })
    )
  }

  getMappedString(vehicleId: number): string {
    const selectedVehicle = this.vehicles.find(vehicle => vehicle.id === vehicleId);
    return selectedVehicle ? selectedVehicle.mappedString : '';
  }
  
  displayFn(vehicle: VehicleDisplayDTO): string {
    if (vehicle != null)
      return `${vehicle.make} ${vehicle.model} (${vehicle.licensePlateNumber})`;
    else return null;
  }

  onSubmit(){
    console.log(this.driverForm.value);
    this.openDialogSubmit();
  }

  openDialogSubmit(){
    const dialogData: DialogData = {
      title: "Update Driver",
      message: 'Are you sure to update this driver? This car may be used by another driver currently.'
    }
    const dialogRef = this.dialog.open(CustomDialogComponent , {
      data: dialogData});

      dialogRef.afterClosed().subscribe(result => {
        if (result == 'Ok') this.submitForm();
      })
  }


  // getVehicleId(mappedString: string): number {
  //   const selectedVehicle = this.vehicles.find(vehicle => vehicle.mappedString === mappedString);
  //   return selectedVehicle ? selectedVehicle.id : null;
  // }

  submitForm() {
    const formValues = this.driverForm.value;
    const requestPayload ={
      id: this.driverId,
      firstName: formValues.firstName,
      name: formValues.name,
      address1: formValues.address1,
      address2: formValues.address2,
      postalCode: formValues.postalCode,
      city: formValues.city,
      country: formValues.country,
      socialSecurityNumber: formValues.socialSecurityNumber,
      dateOfBirth: formValues.dateOfBirth,
      driversLicenseType: formValues.driversLicenseType,
      driverVehicleId: this.vehicleId,
      newVehicleId: formValues.vehicleControl.id
      }
      
    this.updateDriver(requestPayload);
  }
  
  updateDriver(requestpayload){
    if (this.driverForm.valid) {
      const formData = this.driverForm.value;
      console.log("response update: ", formData);
    }
    this.driverService.updateDriver(this.driverId, requestpayload).subscribe({
      next: (response: any) => {
        if (requestpayload.newVehicleId == undefined) {
          requestpayload.newVehicleId = this.vehicleId;
        }else {
          this.vehicleString = this.driverForm.value.vehicleControl.mappedString;
        }
        this.clearErrorMessage();
        this.openSnackBar('updated successfully');
        console.log("vehiclestring: ", this.vehicleString);
      },
      error: error => {
        console.log("unsuccessfull error", error.error);
        this.handleError(error);
      },
      complete: () =>{
      }
    })
  }

  openSnackBar(message : string){
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {message},
      duration: 4000});
  }

  handleError(error: HttpErrorResponse){
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: `, error);
        this.errorMessage = error.error;
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  
  addDamageReport(){
    this.router.navigate(['vehicles', this.vehicleId, 'damageReports']);
  }

  clearErrorMessage(){
    this.errorMessage = "";
  }

  goBack(){
    this.router.navigate(['/drivers']);
  }

  }
