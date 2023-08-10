import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VehiclesEditComponent } from './components/vehicles-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MaintenancesModule } from '../maintenances/maintenances.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { InspectionReportsModule } from '../inspection-reports/inspection-reports.module';


@NgModule({
  declarations: [VehiclesEditComponent], 
  imports: [ 
    CommonModule, ReactiveFormsModule, FormsModule, VehiclesComponent, MatIconModule, 
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, MaintenancesModule,
    MatExpansionModule, InspectionReportsModule
  ],
  exports: [VehiclesEditComponent]
})
export class VehiclesModule { }
