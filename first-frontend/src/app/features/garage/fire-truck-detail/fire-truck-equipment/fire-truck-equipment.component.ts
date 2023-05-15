import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FireTrucksService } from '../../../../core/services/fire-trucks.service';
import { Equipment } from '../../../../core/models/equipment.model';
import { EquipmentService } from '../../../../core/services/equipment.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  AddEquipmentToFireTruckDialogComponent
} from '../add-equipment-to-fire-truck-dialog/add-equipment-to-fire-truck-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FireTruck } from "../../../../core/models/fire-truck.model";

@Component({
  selector: 'app-fire-truck-equipment',
  templateUrl: './fire-truck-equipment.component.html',
  styleUrls: ['./fire-truck-equipment.component.scss',
    '../../../../shared/styles/lists.scss']
})
export class FireTruckEquipmentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public fireTruck: FireTruck = {
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
  };
  public fireTruckEquipment: Equipment[] = []

  private remainingEquipment: Equipment[] = []
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog,
              private fireTruckService: FireTrucksService,
              private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.getFireTruckEquipment();
  }

  ngOnChanges(): void {
    this.getFireTruckEquipment();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public openDialog(): void {
    const dialogRef: MatDialogRef<AddEquipmentToFireTruckDialogComponent> = this.dialog.open(AddEquipmentToFireTruckDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-equipment-to-fire-truck-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {
        remainingEquipment: this.remainingEquipment
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe(result => {
      for (let equipment of result) {
        this.equipmentService.changeEquipmentStorageLocation(equipment,
          this.fireTruck.name + " - " + this.fireTruck.operationalNumber)
      }
      this.getFireTruckEquipment()
    });
  }

  public removeEquipment(equipment: Equipment): void {
    this.equipmentService.removeEquipmentFromFireTruck(equipment)
    this.ngOnInit()
  }

  private getFireTruckEquipment(): void {
    this.equipmentService.getFireTruckEquipment(this.fireTruck.name, this.fireTruck.operationalNumber).pipe(
      takeUntil(this._destroy$)
    ).subscribe(fireTruckEquipment => this.fireTruckEquipment = fireTruckEquipment)

    this.equipmentService.getRemainingEquipment(this.fireTruck.name, this.fireTruck.operationalNumber).pipe(
      takeUntil(this._destroy$)
    ).subscribe(remainingEquipment => this.remainingEquipment = remainingEquipment)
  }
}
