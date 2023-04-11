import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallOutsListComponent } from './call-outs-list.component';

describe('CallOutsListComponent', () => {
  let component: CallOutsListComponent;
  let fixture: ComponentFixture<CallOutsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallOutsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallOutsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
