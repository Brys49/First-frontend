import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalloutDialogComponent } from './add-callout-dialog.component';

describe('AddCalloutDialogComponent', () => {
  let component: AddCalloutDialogComponent;
  let fixture: ComponentFixture<AddCalloutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCalloutDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddCalloutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
