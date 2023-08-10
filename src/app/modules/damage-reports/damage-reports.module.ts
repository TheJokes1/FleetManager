import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AddDamageReportComponent } from './add-damage-report/add-damage-report.component';
import { DamageReportsComponent } from './damage-reports.component';


@NgModule({
  declarations: [  AddDamageReportComponent, DamageReportsComponent],
  imports: [
    CommonModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatIconModule,
    MatNativeDateModule, MatButtonModule , FormsModule, 
    ReactiveFormsModule
  ],
  exports: [DamageReportsComponent]
})
export class DamageReportsModule { }
