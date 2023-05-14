import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Equipment } from 'src/app/core/models/equipment.model';
import { EquipmentService } from 'src/app/core/services/equipment.service';
import { AddEquipmentDialogComponent } from './add-equipment-dialog/add-equipment-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StorageLocationsDialogComponent } from "./storage-locations-dialog/storage-locations-dialog.component";
import { StorageLocation } from "../../core/models/storage-location.model";

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss', '../../shared/styles/feature-dashboard.scss']
})
export class EquipmentComponent implements OnInit, OnDestroy {
  public selectedEquipmentId!: number;
  public displaySummary: boolean = true;

  private storageLocations: StorageLocation[] = [];
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog, private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.equipmentService.getStorageLocations().pipe(
      takeUntil(this._destroy$))
      .subscribe(storageLocations => this.storageLocations = storageLocations)
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public showDetails(id: number): void {
    this.displaySummary = false;
    this.selectedEquipmentId = id;
  }

  public displaySummaryToggle(displaySummaryFlag: boolean): void {
    this.displaySummary = displaySummaryFlag;
  }

  public openDialog(): void {
    const newEquipment: Equipment = {
      id: 0,
      name: '',
      serialNumber: '',
      quantity: 1,
      category: '',
      storageLocation: this.equipmentService.getDefaultStorageLocation(),
      parameters: new Map<string, string>()
    }

    const dialogRef: MatDialogRef<AddEquipmentDialogComponent> = this.dialog.open(AddEquipmentDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-equipment-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {
        equipment: newEquipment,
        storageLocations: this.storageLocations
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      equipment => {
        if (equipment) {
          this.equipmentService.addEquipment(equipment)
        }
      });
  }

  public openStorageLocationsDialog(): void {
    const dialogRef: MatDialogRef<StorageLocationsDialogComponent> = this.dialog.open(StorageLocationsDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'storage-locations-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {
        storageLocations: this.storageLocations
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      storageLocations => {
        if (storageLocations) {
          for (const storageLocation of storageLocations) {
            this.equipmentService.addStorageLocation(storageLocation)
          }
        }
      });
  }
}
