import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionReportsComponent } from './inspection-reports.component';
import { AddInspectionReportComponent } from './add-inspection-report/add-inspection-report.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [InspectionReportsComponent, AddInspectionReportComponent],
  imports: [
    CommonModule, MatTableModule, MatFormFieldModule, MatSelectModule,
    MatInputModule, MatDatepickerModule, MatIconModule, MatOptionModule,
    MatNativeDateModule, MatButtonModule , FormsModule, ReactiveFormsModule
  ],
  exports: [InspectionReportsComponent]
})
export class InspectionReportsModule { }
