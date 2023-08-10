import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DamageReportDTO } from 'src/app/common/models/DTOs/DamageReportDTO';

@Component({
  selector: 'app-damage-reports',
  templateUrl: './damage-reports.component.html',
  styleUrls: ['./damage-reports.component.scss'],
  providers: [DatePipe]
})
export class DamageReportsComponent {

  @Input() damageReportData: DamageReportDTO[]= [];
  displayedColumns: string[] = ['reportDate', 'dateOfDamage', 'damageDescription'];

  constructor(private datePipe: DatePipe, private router: Router){
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}