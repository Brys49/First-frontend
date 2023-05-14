import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { StorageLocation } from "../../../core/models/storage-location.model";


@Component({
  selector: 'app-storage-locations-dialog',
  templateUrl: './storage-locations-dialog.component.html',
  styleUrls: ['./storage-locations-dialog.component.scss']
})
export class StorageLocationsDialogComponent implements OnInit {
  public storageLocationsData: StorageLocation[] = this.data.storageLocations;
  public disableClose: boolean = false;

  private childrenInEditModeCounter: number = 0;

  constructor(public dialogRef: MatDialogRef<StorageLocationsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { storageLocations: StorageLocation[] }) {
  }

  ngOnInit(): void {
  }

  public close(): void {
    this.dialogRef.close(null)
  }

  public inEditModeEvent(editModeChange: number): void {
    this.childrenInEditModeCounter += editModeChange;
    this.disableClose = this.childrenInEditModeCounter !== 0;
  }

  public addStorageLocation(): void {
    this.storageLocationsData.push({
      name: '',
      default: false,
      onFireTruck: false
    });

    this.inEditModeEvent(1);
  }

}
