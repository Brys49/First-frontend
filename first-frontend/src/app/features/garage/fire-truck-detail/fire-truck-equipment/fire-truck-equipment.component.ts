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

@Component({
  selector: 'app-fire-truck-equipment',
  templateUrl: './fire-truck-equipment.component.html',
  styleUrls: ['./fire-truck-equipment.component.scss',
    '../../../../shared/styles/lists.scss']
})
export class FireTruckEquipmentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public fireTruckId: number = 0;
  public equipment: Equipment[] = []
  public fireTruckEquipment: Equipment[] = []

  private fireTruckEquipmentIds: number[] = []
  private remainingEquipment: Equipment[] = []
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog,
              private fireTruckService: FireTrucksService,
              private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.getEquipment();
    this.getFireTruckEquipment();
  }

  ngOnChanges(): void {
    this.getEquipment();
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
      for (let equipmentId of result) {
        this.fireTruckService.addEquipmentToFireTruck(this.fireTruckId, equipmentId)
      }
      this.getFireTruckEquipment()
    });
  }

  public removeEquipment(equipmentId: number): void {
    this.fireTruckService.removeEquipmentFromFireTruck(this.fireTruckId, equipmentId)
    this.ngOnInit()
  }

  private getEquipment(): void {
    this.equipmentService.getAllEquipment().pipe(
      takeUntil(this._destroy$)
    ).subscribe(equipment => this.equipment = equipment);
  }

  private getFireTruckEquipment(): void {
    this.fireTruckService.getFireTruckEquipment(this.fireTruckId).pipe(
      takeUntil(this._destroy$)
    ).subscribe(fireTruckEquipmentIds => this.fireTruckEquipmentIds = fireTruckEquipmentIds)

    this.fireTruckEquipment = this.equipment.filter(equipment => this.fireTruckEquipmentIds.includes(equipment.id))
    this.remainingEquipment = this.equipment.filter(equipment => !this.fireTruckEquipmentIds.includes(equipment.id))
  }
}
