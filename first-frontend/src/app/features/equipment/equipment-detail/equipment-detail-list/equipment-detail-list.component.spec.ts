import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentDetailListComponent } from './equipment-detail-list.component';

describe('EquipmentDetailListComponent', () => {
  let component: EquipmentDetailListComponent;
  let fixture: ComponentFixture<EquipmentDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentDetailListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
