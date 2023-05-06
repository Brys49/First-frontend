import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireTruckEquipmentComponent } from './fire-truck-equipment.component';

describe('FireTruckEquipmentComponent', () => {
  let component: FireTruckEquipmentComponent;
  let fixture: ComponentFixture<FireTruckEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FireTruckEquipmentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FireTruckEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
