import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDamageReportComponent } from './add-damage-report.component';

describe('AddDamageReportComponent', () => {
  let component: AddDamageReportComponent;
  let fixture: ComponentFixture<AddDamageReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDamageReportComponent]
    });
    fixture = TestBed.createComponent(AddDamageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
