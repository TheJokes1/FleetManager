import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle} from 'src/app/common/models/MainClasses/Vehicle';
import { VehicleService } from 'src/app/core/services/vehicles.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { VehicleType } from 'src/app/common/models/MainClasses/VehicleType';
import { MatDialog } from '@angular/material/dialog';
import { UpdateVehicleDialogComponent } from 'src/app/common/dialogs/update-vehicle-dialog/update-vehicle-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../../common/components/snackbar/snackbar.component'
import { AddVehicleDialogComponent } from 'src/app/common/dialogs/add-vehicle-dialog/add-vehicle-dialog.component';
import { VehicleDisplayDTO } from 'src/app/common/models/DTOs/VehicleDisplayDTO';
import { DatePipe } from '@angular/common';
import { MaintenanceDTO } from 'src/app/common/models/DTOs/MaintenanceDTO';
import { Maintenances } from 'src/app/core/services/maintenances.service';
import { TypeDTO } from 'src/app/common/models/DTOs/TypeDTO';
import { ExtrasService } from 'src/app/core/services/extras.service';
import { InspectionReportDTO } from 'src/app/common/models/DTOs/InspectionReportDTO';
import { InspectionReportsService } from 'src/app/core/services/inspection-reports.service';
import { DialogData } from 'src/app/common/models/MainClasses/DialogData';
import { CustomDialogComponent } from 'src/app/common/dialogs/custom-dialog/custom-dialog.component';

@Component({
  selector: 'app-vehicles-edit',
  templateUrl: './vehicles-edit.component.html',
  styleUrls: ['./vehicles-edit.component.scss'],
  
})
export class VehiclesEditComponent implements OnInit {
  vehicleForm: FormGroup;
  fuelTypes =  ["Benzine","Diesel", "hybrideBenzine", "hybrideDiesel", "Elektrisch"]; 
  vehicleTypesString : string[] = [];
  vehicleTypes : VehicleType[] = [];
  vehicle!: Vehicle;
  formData: any = {};
  fuel: any;
  mistake: boolean;
  vehicleId: number = 0;
  errorMessage : string = "";
  selectedVehicleTypeIndex: number = null;;
  title: string = "Edit Vehicle";
  driverList : string[]= [];
  vehicleAddNumber: number = 59;
  maintenanceArray: MaintenanceDTO[]= [];
  inspectionArray: InspectionReportDTO[]= [];
  driverId: number;
  driverName: string;
  

  constructor(private route: ActivatedRoute, private router: Router, private vehicleService: VehicleService, 
      private formBuilder: FormBuilder, private dialog: MatDialog, private _snackBar: MatSnackBar, private datepipe: DatePipe,
      private maintenanceService: Maintenances, private extraService: ExtrasService, private inspectionService: InspectionReportsService) {

    this.vehicleForm = this.formBuilder.group({
      make: ['', Validators.required],
      model: [''],
      chassisNumber: [''],
      vehicleType: [''],
      fuelType: [''],
      mileage: [''],
      startLeasing: [''],
      firstRegistration: [''],
      durationLeasingMonths: [''],
      licensePlateNumber: [''],
      licensePlateDateFrom: [''],
      licenseplateDateUntil: [''],
    });
  }

  ngOnInit(): void {
    var identity = this.route.snapshot.paramMap.get('vehicleId');
    this.vehicleId = Number(identity) || 0;
    if (this.vehicleId == this.vehicleAddNumber) this.title = "Add a vehicle";
    this.getVehicleData(this.vehicleId);
    this.getVehicleTypes();
    this.getMaintenances();
    this.getInspectionReports();
    //this.getDrivers();
  }

  getVehicleTypes() {
    this.extraService.getVehicleTypes().subscribe({
      next: (response: TypeDTO[]) => {
        this.vehicleTypes = response.map(vehicleType =>{
          return {
            id: vehicleType.id,
            name: vehicleType.name
          }
        })
        console.log(this.vehicleTypes);
      },
      error: error => console.log(error)
    })
  }

  getVehicleData(id: number) : void {
    this.vehicleService.getVehicleById(id).subscribe({
      next: (response : any) => {
        console.log("vehicle: ", response);
        this.vehicleId = response.id;
        this.populateForm(response);
      },
      error: error => console.log(error),
      complete: () => {
      }
    });
  }
  
  getMaintenances(){
    this.maintenanceService.getMaintenancesById(this.vehicleId).subscribe({
      next: (response: MaintenanceDTO[]) => {
        console.log(response);
        this.maintenanceArray = response;
      },
      error: error => (console.log(error)),
      complete: () => {}
    });
  }

  getInspectionReports() {
    this.inspectionService.getInspectionReportByVehicleId(this.vehicleId).subscribe({
      next: (response: InspectionReportDTO[]) => {
        console.log("Inspection reports: ", response);
        this.inspectionArray = response;
        this.driverName = this.inspectionArray[0].driverName;
        this.driverId = this.inspectionArray[0].driverId;
      },
      error: error => (console.log(error)),
      complete: () => {}
    })
  }
  
  populateForm(response: VehicleDisplayDTO): void {
    this.selectedVehicleTypeIndex = response.vehicleType;
    this.formData = {
      make: response.make,
      model: response.model,
      chassisNumber: response.chassisNumber,
      vehicleType: response.vehicleType,
      fuelType: response.fuelType,
      mileage: response.mileage,
      startLeasing: response.startLeasing.toString().split('T')[0],
      firstRegistration: response.firstRegistration.toString().split('T')[0],
      durationLeasingMonths: response.durationLeasingMonths,
      licensePlateNumber: response.licensePlateNumber,
      licensePlateDateFrom: response.dateFrom.toString().split('T')[0]
    };
    const date = new Date();
     if (response.id == this.vehicleAddNumber) this.formData.licensePlateDateFrom = this.datepipe.transform(date, 'yyyy-MM-dd');
     console.log("datefrom: ", this.formData.licensePlateDateFrom);
  }

  onSubmit() : void{
    this.errorMessage = '';
    if (this.vehicleId != this.vehicleAddNumber) this.openDialogUpdate()
    else this.openDialogAdd();
  }

  openDialogUpdate(): void{
    const dialogRef = this.dialog.open(UpdateVehicleDialogComponent, {
      data: {licensePlate: this.formData.licensePlateNumber}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Ok') this.submitForm();
    })
  }

    // TO IMPLEMENT
  openDialogAdd(): void{
    const dialogRef = this.dialog.open(AddVehicleDialogComponent, {
      data: {licensePlate: this.formData.licensePlateNumber}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'Ok') this.submitForm();
    })
  }

  submitForm() {
    //const selectedVehicleType = this.vehicleTypes.find(type => type.id === this.selectedVehicleTypeIndex)?.id;
    console.log("chosen: ", this.selectedVehicleTypeIndex)
    const formValues = this.formData;

    const requestPayload ={
      id: this.vehicleId,
      make: formValues.make,
      model: formValues.model,
      chassisNumber: formValues.chassisNumber,
      vehicleTypeId: +this.selectedVehicleTypeIndex,
      fuelType: formValues.fuelType,
      mileage: formValues.mileage,
      startLeasing: formValues.startLeasing,
      firstRegistration: formValues.firstRegistration,
      durationLeasingMonths: formValues.durationLeasingMonths,
      active: true,
      licensePlateNumber: formValues.licensePlateNumber,
      dateFrom: formValues.licensePlateDateFrom,
      }
    if (this.vehicleId == this.vehicleAddNumber) this.addVehicle(requestPayload)
      else this.updateVehicle(requestPayload);
  }

  updateVehicle(requestPayload) {
    this.vehicleService.updateVehicle(this.vehicleId, requestPayload).subscribe({
      next: (response : any) => {
        this.openSnackBar('updated successfully');
      },
      error: error => {
        console.log("unsuccessfull error", error.error);
        this.handleError(error);
      },
      complete: () => {}
    });
  }

  addVehicle(requestPayload){
    this.vehicleService.addVehicle(requestPayload).subscribe({
      next: (response : any) => {
        this.openSnackBar('Vehicle added successfully');
        this.goBack();
      },
      error: error => {
        console.log("unsuccessfull error", error.error);
        this.handleError(error);
      },
      complete: () => {}
    });
  }

  openSnackBar(message : string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {message},
      duration: 4000});
  }
  

  markFormGroupAsTouched(formGroup: FormGroup | FormArray): void {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupAsTouched(control);
      }
    });
  }

  clearErrorMessage(){
    this.errorMessage = "";
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

  addMaintenance(){
    console.log('add maintenance');
    this.router.navigate(['vehicles', this.vehicleId, 'maintenances']);
  }

  addInspectionReport(){
    console.log("DRIVERID: ", this.driverId);
    this.getDriverVehicleData(this.vehicleId);
     
  }

  getDriverVehicleData(id: number) {
    this.vehicleService.getDriverVehicle(this.vehicleId).subscribe({
      next: (response: any) => {
        this.driverId= response.driverId;
        console.log("DRIVERID after DriverVehicle: ", this.driverId);
        this.router.navigate(['vehicles', this.vehicleId, 'inspectionReports'],
        {queryParams: { driverId: this.driverId, vehicleId: this.vehicleId, 
          driverName: this.driverName, licensePlate: this.formData.licensePlateNumber }});
      },
      error: error =>{
        this.openDialog();
      }
    })
  }

  openDialog(){
    const dialogData: DialogData = {
      title: "No driver!",
      message: 'Please assign a driver to this vehicle first'
    }
    const dialogRef = this.dialog.open(CustomDialogComponent , {
      data: dialogData});
      dialogRef.afterClosed().subscribe(result => {
        if (result == 'Ok') {
          this.router.navigate(["/vehicles"]);
        }
      });
  }

  goBack(){
    this.router.navigate(["/vehicles"]);
  }
}