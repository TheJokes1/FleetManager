import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriversComponent } from './drivers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepicker, MatDatepickerModule, matDatepickerAnimations } from '@angular/material/datepicker';
import { MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DriversEditComponent } from './components/edit-driver/drivers-edit.component';
import { DriversAddComponent } from './components/add-driver/drivers-add.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { DamageReportsModule } from '../damage-reports/damage-reports.module';


@NgModule({
  declarations: [
    DriversEditComponent,
    DriversAddComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, MatIconModule, DriversComponent, MatAutocompleteModule, 
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatButtonModule, MatInputModule,
    MatExpansionModule, DamageReportsModule
  ],
})
export class DriversModule { }
