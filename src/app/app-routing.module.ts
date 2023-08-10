import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from './modules/vehicles/vehicles.component';
import { VehiclesEditComponent} from './modules/vehicles/components/vehicles-edit.component'
import { DriversComponent } from './modules/drivers/drivers.component';
import { HomeComponent } from './common/components/header/home.component';
import { DriversService } from '../app/core/services/drivers.service';
import { DriversEditComponent } from './modules/drivers/components/edit-driver/drivers-edit.component';
import { DriversAddComponent } from './modules/drivers/components/add-driver/drivers-add.component';
import { AddMaintenanceComponent } from './modules/maintenances/add-maintenance/add-maintenance.component';
import { ExtrasComponent } from './modules/extras/extras.component';
import { SigninRedirectCallbackComponent } from './core/signin-redirect-callback/signin-redirect-callback.component';
import { AddDamageReportComponent } from './modules/damage-reports/add-damage-report/add-damage-report.component';
import { AddInspectionReportComponent } from './modules/inspection-reports/add-inspection-report/add-inspection-report.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'vehicles', component: VehiclesComponent},
  {path: 'vehicles/:vehicleId', component: VehiclesEditComponent},
  {path: 'drivers', component: DriversComponent},
  {path: 'drivers/add', component: DriversAddComponent},
  {path: 'drivers/:driverId', component: DriversEditComponent},
  {path: 'vehicles/:vehicleId/maintenances', component: AddMaintenanceComponent},
  {path: 'vehicles/:vehicleId/damageReports', component: AddDamageReportComponent},
  {path: 'vehicles/:vehicleId/inspectionReports', component: AddInspectionReportComponent},
  {path: 'extras/:extraType', component: ExtrasComponent},
  {path: 'signin-callback', component: SigninRedirectCallbackComponent },

  //{path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
