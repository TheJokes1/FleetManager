import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportedDamageDTO } from '../../models/DTOs/reportedDamageDTO';

@Component({
  selector: 'app-reported-damage-dialog',
  templateUrl: './reported-damage-dialog.component.html',
  styleUrls: ['./reported-damage-dialog.component.scss']
})
export class ReportedDamageDialogComponent {
  reportedDamagesData: ReportedDamageDTO[]; 

  constructor(public dialogRef: MatDialogRef<ReportedDamageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.reportedDamagesData = data.reportedDamages;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
