import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallOutDetailSectionComponent } from './call-out-detail-section.component';

describe('CallOutDetailSectionComponent', () => {
  let component: CallOutDetailSectionComponent;
  let fixture: ComponentFixture<CallOutDetailSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallOutDetailSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallOutDetailSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
