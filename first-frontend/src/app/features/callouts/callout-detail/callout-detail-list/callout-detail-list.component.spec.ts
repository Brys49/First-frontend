import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalloutDetailListComponent } from './callout-detail-list.component';

describe('CalloutDetailListComponent', () => {
  let component: CalloutDetailListComponent;
  let fixture: ComponentFixture<CalloutDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalloutDetailListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalloutDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
