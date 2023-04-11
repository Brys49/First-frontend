import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallOutDetailListComponent } from './call-out-detail-list.component';

describe('CallOutDetailListComponent', () => {
  let component: CallOutDetailListComponent;
  let fixture: ComponentFixture<CallOutDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallOutDetailListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallOutDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
