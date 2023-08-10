import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { map, throwError } from 'rxjs';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { CustomDialogComponent } from 'src/app/common/dialogs/custom-dialog/custom-dialog.component';
import { DialogData } from 'src/app/common/models/MainClasses/DialogData';
import { DriversService } from 'src/app/core/services/drivers.service';
import { VehicleService } from 'src/app/core/services/vehicles.service';

@Component({
  selector: 'app-drivers-add',
  templateUrl: './drivers-add.component.html',
  styleUrls: ['../edit-driver/drivers-edit.component.scss']
})
export class DriversAddComponent implements OnInit{
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
    vehicleControl: new FormControl(null)
  });
  driverId: number;
  vehicles: any[]= [];
  title: string = 'Add a Driver';
  licenses: string[] = ['Am', 'A', 'B', 'C', 'D'];
  errorMessage: string = '';


  constructor(private router: Router, private dialog: MatDialog, private route: ActivatedRoute, private vehicleService: VehicleService,
    private driverService: DriversService, private snackBar: MatSnackBar) {
  }

  ngOnInit(){
    var identity = this.route.snapshot.paramMap.get('vehicleId');
    this.driverId = Number(identity) || 0;
    this.getVehicleData();
  }

  onSubmit(){
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

  getVehicleData(){
    this.vehicleService.getVehicles(0, 1000)
    .pipe(
      map((response: any) => {
        const mappedData = response.items.map((item: any) => {
          return {
            ...item,
            mappedString: `${item.make} ${item.model} (${item.licensePlateNumber})`
          };
        });
        return mappedData;
      })
    ).subscribe({
      next: (vehicles : any) => {
        console.log("vehicleData: ", vehicles);
        this.vehicles = vehicles;
       // this.setVehicleControl(this.driverId);
      },
      error: error => console.log(error),
      complete: () => {
      }
    });
  }


  getVehicleId(mappedString: string): number {
    const selectedVehicle = this.vehicles.find(vehicle => vehicle.mappedString === mappedString);
    return selectedVehicle ? selectedVehicle.id : null;
  }

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
      //driverVehicleId: this.vehicleId,
      newVehicleId: formValues.vehicleControl
      }
      
    this.addDriver(requestPayload);
  }

  addDriver(payload: any){
    if (this.driverForm.valid) {
      const formData = this.driverForm.value;
    }
    this.driverService.addDriver(payload).subscribe({
      next: (response: any) => {
        console.log(response);
        this.clearErrorMessage();
        this.openSnackBar('added successfully');
        this.goBack();
        //this.vehicleString = this.getMappedString(this.driverForm.value.vehicleControl);
      },
      error: error => {
        console.log("unsuccessfull error", error.error);
        this.handleError(error);
      },
      complete: () =>{
      }
    })
  }

  getMappedString(vehicleId: number): string {
    const selectedVehicle = this.vehicles.find(vehicle => vehicle.id === vehicleId);
    return selectedVehicle ? selectedVehicle.mappedString : '';
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

  clearErrorMessage(){
    this.errorMessage = "";
  }

  goBack(){
    this.router.navigate(['/drivers']);
  }
}
