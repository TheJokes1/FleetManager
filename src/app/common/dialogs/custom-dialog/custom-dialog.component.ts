import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/common/models/MainClasses/DialogData';


@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss']
})
export class CustomDialogComponent {
  resultToReturn: string = 'Ok';
  constructor(public dialogRef: MatDialogRef<CustomDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData){}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
