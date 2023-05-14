import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageLocationsDialogItemComponent } from './storage-locations-dialog-item.component';

describe('StorageLocationsDialogItemComponent', () => {
  let component: StorageLocationsDialogItemComponent;
  let fixture: ComponentFixture<StorageLocationsDialogItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorageLocationsDialogItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageLocationsDialogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
