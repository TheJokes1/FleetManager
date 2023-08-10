import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { CustomDialogComponent } from 'src/app/common/dialogs/custom-dialog/custom-dialog.component';
import { MaintenanceDTO } from 'src/app/common/models/DTOs/MaintenanceDTO';
import { MaintenanceSaveDTO } from 'src/app/common/models/DTOs/MaintenanceSaveDTO';
import { DialogData } from 'src/app/common/models/MainClasses/DialogData';
import { Maintenance } from 'src/app/common/models/MainClasses/Maintenance';
import { Maintenances } from 'src/app/core/services/maintenances.service';
import { VehicleService } from 'src/app/core/services/vehicles.service';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.scss']
})
export class AddMaintenanceComponent {
  maintenanceForm: FormGroup;
  title: string= "Add Maintenance for vehicle ";
  vehicleId: number;
  vehicleName: string;
  fileName: string;
  selectedFile: File | undefined;

  constructor(private fb: FormBuilder, private maintenanceService: Maintenances, 
    private vehicleService: VehicleService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog, private _snackBar: MatSnackBar ) {}

  ngOnInit(): void {
   this.maintenanceForm = this.fb.group({
     vehicle: [{value: '', disabled: true}],
     date: ['', [Validators.required]],
     cost: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
     garage: ['', [Validators.required]],
     worksPerformed: ['', [Validators.required]],
     filePath: [null]
   });
   var id = this.route.snapshot.paramMap.get('vehicleId');
   this.vehicleId = Number(id) || 0;
   this.getVehicleData(this.vehicleId);
  }

  getVehicleData(id: number) : void {
    this.vehicleService.getVehicleById(id).subscribe({
      next: (response : any) => {
        console.log("vehicle: ", response);
        this.vehicleName = response.make + ' ' + response.model + ' (' + response.licensePlateNumber + ')';
      },
      error: error => console.log(error),
      complete: () => {
      }
    });
  }

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.fileName = input.files[0].name;
    }
  }

  onSubmit(){
    if (this.maintenanceForm.valid){
      console.log("filenames: ", this.fileName);
      this.openDialogSubmit();
    }
  }

  openDialogSubmit(){
    const dialogData: DialogData = {
      title: "Add Maintenance report",
      message: 'Add this maintenace report'
    }
    const dialogRef = this.dialog.open(CustomDialogComponent , {
      data: dialogData});
      dialogRef.afterClosed().subscribe(result => {
        if (result == 'Ok') this.submitForm();
      });
  }

  submitForm(){
    const formValues= this.maintenanceForm.value;
    console.log(formValues);
    const requestPayload = {
      vehicleId:  this.vehicleId,
      date: formValues.date,
      cost: formValues.cost,
      garage: formValues.garage,
      worksPerformed: formValues.worksPerformed,
      filePath: this.fileName,
      fileData: this.selectedFile
    }
    this.addMaintenance(requestPayload);
  }

  addMaintenance(requestPayload: MaintenanceSaveDTO){
    console.log("payload: ", requestPayload);
    this.maintenanceService.addMaintenance(requestPayload).subscribe({
      next: (response: any) => {
        this.openSnackBar('Maintenance added successfully');
        console.log(response);
      }, 
      error: error => console.log(error)
    })
  }

  openSnackBar(message : string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: {message},
      duration: 4000});
  }

  goBack(){
    this.router.navigate(['/vehicles/', this.vehicleId])
  }

 }
 
