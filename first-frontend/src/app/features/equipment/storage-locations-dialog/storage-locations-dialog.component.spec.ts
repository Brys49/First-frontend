import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageLocationsDialogComponent } from './storage-locations-dialog.component';

describe('StorageLocationsDialogComponent', () => {
  let component: StorageLocationsDialogComponent;
  let fixture: ComponentFixture<StorageLocationsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageLocationsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageLocationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
