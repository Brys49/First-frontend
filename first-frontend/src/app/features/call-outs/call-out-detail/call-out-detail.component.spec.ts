import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallOutDetailComponent } from './call-out-detail.component';

describe('CallOutDetailComponent', () => {
  let component: CallOutDetailComponent;
  let fixture: ComponentFixture<CallOutDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallOutDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallOutDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
