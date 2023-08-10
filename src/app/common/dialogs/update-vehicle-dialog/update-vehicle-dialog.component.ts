import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-vehicle-dialog',
  templateUrl: './update-vehicle-dialog.component.html',
  styleUrls: ['./update-vehicle-dialog.component.scss']
})
export class UpdateVehicleDialogComponent {
  resultToReturn: string = 'Ok';
  constructor(public dialogRef: MatDialogRef<UpdateVehicleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {licensePlate: string}){}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
