import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloutDetailComponent } from './callout-detail.component';

describe('CalloutDetailComponent', () => {
  let component: CalloutDetailComponent;
  let fixture: ComponentFixture<CalloutDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalloutDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalloutDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
