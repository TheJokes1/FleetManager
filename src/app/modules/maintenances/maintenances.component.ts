import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaintenanceDTO } from 'src/app/common/models/DTOs/MaintenanceDTO';

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.component.html',
  styleUrls: ['./maintenances.component.scss'],
  providers: [DatePipe]
})
export class MaintenancesComponent {

  @Input() maintenanceData: MaintenanceDTO[]= [];
  displayedColumns: string[] = ['date', 'cost', 'garage', 'worksPerformed'];

  constructor(private datePipe: DatePipe){
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
