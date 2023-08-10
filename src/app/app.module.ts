import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// core
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'


// Materials
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


// Modules

import { LayoutComponent } from './common/layout/layout.component';

import { NavigationComponent } from './common/navigation/navigation.component';
import { HomeComponent } from './common/components/header/home.component';
import { SnackbarComponent } from './common/components/snackbar/snackbar.component';
import { AddVehicleDialogComponent } from './common/dialogs/add-vehicle-dialog/add-vehicle-dialog.component';
import { CustomDialogComponent } from './common/dialogs/custom-dialog/custom-dialog.component';
import { DeleteVehicleDialogComponent } from './common/dialogs/delete-vehicle-dialog/delete-vehicle-dialog.component';
import { UpdateVehicleDialogComponent } from './common/dialogs/update-vehicle-dialog/update-vehicle-dialog.component';
import { DriversModule } from './modules/drivers/drivers.module';
import { VehiclesModule } from './modules/vehicles/vehicles.module';
//import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import { MaintenancesModule } from './modules/maintenances/maintenances.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExtrasComponent } from './modules/extras/extras.component';
import { AuthInterceptorService } from './core/services/auth-interceptor.service';
import { AddDamageReportComponent } from './modules/damage-reports/add-damage-report/add-damage-report.component';
import { InspectionReportsComponent } from './modules/inspection-reports/inspection-reports.component';
import { AddInspectionReportComponent } from './modules/inspection-reports/add-inspection-report/add-inspection-report.component';
import { InspectionReportsModule } from './modules/inspection-reports/inspection-reports.module';
import { ReportedDamageDialogComponent } from './common/dialogs/reported-damage-dialog/reported-damage-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    NavigationComponent,
    UpdateVehicleDialogComponent,
    DeleteVehicleDialogComponent,
    AddVehicleDialogComponent,
    CustomDialogComponent,
    ExtrasComponent,
    ReportedDamageDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSidenavModule,
    MatExpansionModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatDatepickerModule, MatButtonModule,
    MatDialogModule, MatIconModule, MatSnackBarModule,
    VehiclesModule, 
    ReactiveFormsModule, DriversModule,
    FormsModule, MatSelectModule, MatAutocompleteModule, MaintenancesModule, InspectionReportsModule,
    SnackbarComponent, MatInputModule, MatFormFieldModule, MatNativeDateModule, MatAutocompleteModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }, DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
