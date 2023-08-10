import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-vehicle-dialog',
  templateUrl: './add-vehicle-dialog.component.html',
  styleUrls: ['./add-vehicle-dialog.component.scss']
})
export class AddVehicleDialogComponent {
  resultToReturn: string = 'Ok';
  constructor(public dialogRef: MatDialogRef<AddVehicleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: {licensePlate: string}){}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
