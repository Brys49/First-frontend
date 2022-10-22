import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireTruckDetailComponent } from './fire-truck-detail.component';

describe('FireTruckDetailComponent', () => {
  let component: FireTruckDetailComponent;
  let fixture: ComponentFixture<FireTruckDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireTruckDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FireTruckDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
