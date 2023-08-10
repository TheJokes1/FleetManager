import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportedDamageDialogComponent } from 'src/app/common/dialogs/reported-damage-dialog/reported-damage-dialog.component';
import { InspectionReportDTO } from 'src/app/common/models/DTOs/InspectionReportDTO';
import { ReportedDamageDTO } from 'src/app/common/models/DTOs/reportedDamageDTO';
import { InspectionReportsService } from 'src/app/core/services/inspection-reports.service';

@Component({
  selector: 'app-inspection-reports',
  templateUrl: './inspection-reports.component.html',
  styleUrls: ['./inspection-reports.component.scss']
})
export class InspectionReportsComponent {

  @Input() inspectionReportData: InspectionReportDTO[]= [];
  displayedColumns: string[] = ['name', 'date', 'cost', 'driverWasPresent', 'reportedDamage'];
  reportedDamageArray: ReportedDamageDTO[] = [];

  constructor(private datePipe: DatePipe, private dialog: MatDialog, private inspectionReportService: InspectionReportsService){
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  openDamageReportDialog(id: number){
    console.log("inspectionreportId: ", id);
    this.inspectionReportService.getReportedDamagesById(id).subscribe({
      next: (response: ReportedDamageDTO[]) => {
        console.log("reportedDamages: ", response);
        this.reportedDamageArray = response;
        this.openDialog(this.reportedDamageArray);
      },
      error: error => (console.log(error)),
      complete: () => {}
    })
    
  }

  openDialog(reportedDamages: ReportedDamageDTO[]){
    const dialogRef = this.dialog.open(ReportedDamageDialogComponent, {
      width: '550px',
      data: { reportedDamages} 
    });

    dialogRef.afterClosed().subscribe(result => {
      // Add any logic you want to execute after the dialog is closed
    });
  }
}
