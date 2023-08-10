import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-vehicle-dialog',
  templateUrl: './delete-vehicle-dialog.component.html',
  styleUrls: ['./delete-vehicle-dialog.component.scss']
})
export class DeleteVehicleDialogComponent {
  resultToReturn: string = 'Ok';
  constructor(public dialogRef: MatDialogRef<DeleteVehicleDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: {Id: string}){}
  
  onNoClick(): void {
    console.log(this.data.Id)
    this.dialogRef.close();
  }
}
