import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireTruckDetailListComponent } from './fire-truck-detail-list.component';

describe('FireTruckDetailListComponent', () => {
  let component: FireTruckDetailListComponent;
  let fixture: ComponentFixture<FireTruckDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireTruckDetailListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FireTruckDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
