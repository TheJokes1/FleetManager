import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaintenancesComponent } from './maintenances.component';
import { MatTableModule } from '@angular/material/table';
import { AddMaintenanceComponent } from './add-maintenance/add-maintenance.component'; 
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [MaintenancesComponent, AddMaintenanceComponent],
  imports: [
    CommonModule, MatTableModule, MatFormFieldModule,
    MatInputModule, MatDatepickerModule, MatIconModule,
    MatNativeDateModule, MatButtonModule , FormsModule, ReactiveFormsModule
  ],
  exports: [MaintenancesComponent],
})
export class MaintenancesModule { 
  
  
}
