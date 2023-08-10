import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesEditComponent } from './vehicles-edit.component';

describe('VehiclesEditComponent', () => {
  let component: VehiclesEditComponent;
  let fixture: ComponentFixture<VehiclesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiclesEditComponent]
    });
    fixture = TestBed.createComponent(VehiclesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
