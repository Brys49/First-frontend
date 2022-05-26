import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallOutsComponent } from './call-outs.component';

describe('CallOutsComponent', () => {
  let component: CallOutsComponent;
  let fixture: ComponentFixture<CallOutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallOutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallOutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
