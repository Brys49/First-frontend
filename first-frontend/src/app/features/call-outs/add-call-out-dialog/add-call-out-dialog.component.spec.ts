import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCallOutDialogComponent } from './add-call-out-dialog.component';

describe('AddCallOutDialogComponent', () => {
  let component: AddCallOutDialogComponent;
  let fixture: ComponentFixture<AddCallOutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCallOutDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCallOutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
