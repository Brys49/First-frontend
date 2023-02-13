import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEquipmentToFireTruckDialogComponent } from './add-equipment-to-fire-truck-dialog.component';

describe('AddEquipmentToFireTruckDialogComponent', () => {
  let component: AddEquipmentToFireTruckDialogComponent;
  let fixture: ComponentFixture<AddEquipmentToFireTruckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEquipmentToFireTruckDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEquipmentToFireTruckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
