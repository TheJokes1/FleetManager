import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageReportsComponent } from './damage-reports.component';

describe('DamageReportsComponent', () => {
  let component: DamageReportsComponent;
  let fixture: ComponentFixture<DamageReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DamageReportsComponent]
    });
    fixture = TestBed.createComponent(DamageReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
