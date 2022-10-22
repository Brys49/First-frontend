import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFireTruckDialogComponent } from './add-fire-truck-dialog.component';

describe('AddFireTruckDialogComponent', () => {
  let component: AddFireTruckDialogComponent;
  let fixture: ComponentFixture<AddFireTruckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFireTruckDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFireTruckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
