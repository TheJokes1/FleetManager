import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-damage-report',
  templateUrl: './add-damage-report.component.html',
  styleUrls: ['./add-damage-report.component.scss']
})
export class AddDamageReportComponent implements OnInit {
  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('vehicleId');
  }

}
