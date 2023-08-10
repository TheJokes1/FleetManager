import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarComponent } from 'src/app/common/components/snackbar/snackbar.component';
import { CustomDialogComponent } from 'src/app/common/dialogs/custom-dialog/custom-dialog.component';
import { InspectionReportDTO } from 'src/app/common/models/DTOs/InspectionReportDTO';
import { DialogData } from 'src/app/common/models/MainClasses/DialogData';
import { InspectionReportsService } from 'src/app/core/services/inspection-reports.service';

@Component({
  selector: 'app-add-inspection-report',
  templateUrl: './add-inspection-report.component.html',
  styleUrls: ['./add-inspection-report.component.scss']
})
export class AddInspectionReportComponent {
  inspectionReportForm: FormGroup;
  title: string = "Add Inspection report for";
  driverId: number;
  vehicleId: number;
  driverName: string;
  licensePlate: string;

  constructor(private fb: FormBuilder,  private inspectionReportService: InspectionReportsService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog, private _snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.inspectionReportForm = this.fb.group({
      date: [new Date(), [Validators.required]],
      totalCost: [null, [Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      driverWasPresent: [true, [Validators.required]],
      filePath: [null]
    });
    this.route.queryParamMap.subscribe(params => {
      this.driverId = Number(params.get('driverId')) || null;
      this.vehicleId = Number(params.get('vehicleId')) || 0;
      this.driverName = params.get('driverName') || '';
      this.licensePlate = params.get('licensePlate');
    });
    console.log("DRIVERID: ", this.driverId);
  }

  onFileChange(event: Event){
  }

  onSubmit(){
    if (this.inspectionReportForm.valid){
      this.openDialogSubmit();
    }
  }

  openDialogSubmit(){
    const dialogData: DialogData = {
      title: "Add Inspection report",
      message: 'Add this inspection report'
    }
    const dialogRef = this.dialog.open(CustomDialogComponent , {
      data: dialogData});

      dialogRef.afterClosed().subscribe(result => {
        if (result == 'Ok') this.submitForm();
      })
  }

  submitForm(){
    const formValues= this.inspectionReportForm.value;
    const requestPayload = {
      date: formValues.date,
      totalCost: formValues.totalCost,
      driverWasPresent: formValues.driverWasPresent,
      inspectionReportFile: formValues.filePath,
      driverId: this.driverId,
      vehicleId: this.vehicleId,
      driverName: null,
      id: 0,
      filePath: formValues.filePath
    }
    console.log("PAYLOAD: ", requestPayload)
    this.addInspectionReport(requestPayload);
  }

  addInspectionReport(requestPayload: InspectionReportDTO){
    this.inspectionReportService.addInspectionReport(requestPayload).subscribe({
      next: (response: any) => {
        this.openSnackBar('Inspection Report added successfully');
        //console.log(response);
      },
      error: error => {
        (console.log(error))

      },
      complete: () => {}
  });
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
