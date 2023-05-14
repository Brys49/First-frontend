import { Component, OnDestroy, OnInit } from '@angular/core';
import { FireTruck } from '../../core/models/fire-truck.model';
import { FireTrucksService } from '../../core/services/fire-trucks.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddFireTruckDialogComponent } from './add-fire-truck-dialog/add-fire-truck-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EquipmentService } from "../../core/services/equipment.service";
import { StorageLocation } from "../../core/models/storage-location.model";

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss', '../../shared/styles/feature-dashboard.scss']
})
export class GarageComponent implements OnInit, OnDestroy {
  public selectedFireTruckId!: number;
  public displaySummary: boolean = true;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog,
              private fireTrucksService: FireTrucksService,
              private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public showDetails(id: number): void {
    this.displaySummary = false;
    this.selectedFireTruckId = id;
  }

  public displaySummaryToggle(displaySummaryFlag: boolean): void {
    this.displaySummary = displaySummaryFlag;
  }

  public openDialog(): void {
    const newFireTruck: FireTruck = {
      id: 0,
      name: '',
      image: null,
      vin: '',
      productionYear: 0,
      licensePlate: '',
      operationalNumber: '',
      type: '',
      totalWeight: 0,
      horsepower: 0,
      numberOfSeats: 0,
      mileage: 0,
      vehicleInspectionExpiryDate: new Date(),
      insuranceExpiryDate: new Date(),
      parameters: new Map<string, string>(),
      imgUrl: ''
    }

    const dialogRef: MatDialogRef<AddFireTruckDialogComponent> = this.dialog.open(AddFireTruckDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-fire-truck-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {fireTruck: newFireTruck}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      fireTruck => {
        if (fireTruck) {
          const newStorageLocation: StorageLocation = {
            id: 0,
            name: fireTruck.name + " - " + fireTruck.operationalNumber,
            default: false,
            onFireTruck: true
          };
          this.equipmentService.addStorageLocation(newStorageLocation);
          this.fireTrucksService.addFireTruck(fireTruck);
        }
      });
  }
}
