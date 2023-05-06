import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloutsListComponent } from './callouts-list.component';

describe('CalloutsListComponent', () => {
  let component: CalloutsListComponent;
  let fixture: ComponentFixture<CalloutsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalloutsListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalloutsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
