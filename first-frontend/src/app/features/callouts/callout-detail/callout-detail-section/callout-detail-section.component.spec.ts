import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloutDetailSectionComponent } from './callout-detail-section.component';

describe('CalloutDetailSectionComponent', () => {
  let component: CalloutDetailSectionComponent;
  let fixture: ComponentFixture<CalloutDetailSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalloutDetailSectionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalloutDetailSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
