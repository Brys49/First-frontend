import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FireTruck } from 'src/app/core/models/fire-truck.model';
import { FireTrucksService } from 'src/app/core/services/fire-trucks.service';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { AddFireTruckDialogComponent } from '../add-fire-truck-dialog/add-fire-truck-dialog.component';
import { Callout } from '../../../core/models/callout.model';
import { CalloutsService } from '../../../core/services/callouts.service';
import { EquipmentService } from "../../../core/services/equipment.service";

@Component({
  selector: 'app-fire-truck-detail',
  templateUrl: './fire-truck-detail.component.html',
  styleUrls: ['./fire-truck-detail.component.scss', '../../../shared/styles/feature-details.scss',
    '../../../shared/styles/lists.scss']
})
export class FireTruckDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public fireTruckId: number = 0;
  @Output() public displaySummaryEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public fireTruck!: FireTruck;
  public callouts: Callout[] = [];

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog,
              private fireTrucksService: FireTrucksService,
              private calloutsService: CalloutsService,
              private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.getFireTruck();
    this.getCallouts();
  }

  ngOnChanges(): void {
    this.getFireTruck();
    this.getCallouts();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public goBack(): void {
    this.displaySummaryEvent.emit(true)
  }

  public deleteFireTruck(id: number): void {
    const fireTruckStorageName: string = this.fireTruck.name + " - " + this.fireTruck.operationalNumber;
    this.equipmentService.moveEquipmentToDefaultStorageLocation(fireTruckStorageName);
    this.fireTrucksService.deleteFireTruck(id);
    this.goBack();
  }

  public edit(): void {
    const dialogRef: MatDialogRef<AddFireTruckDialogComponent> = this.dialog.open(AddFireTruckDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-fire-truck-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {fireTruck: this.fireTruck}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      fireTruck => {
        if (fireTruck) {
          if (fireTruck.name !== this.fireTruck.name || fireTruck.operationalNumber !== this.fireTruck.operationalNumber) {
            const oldStorageLocationName: string = this.fireTruck.name + " - " + this.fireTruck.operationalNumber;
            const newStorageLocationName: string = fireTruck.name + " - " + fireTruck.operationalNumber;
            this.equipmentService.editStorageLocation(oldStorageLocationName, newStorageLocationName);
          }
          this.fireTrucksService.updateFireTruck(fireTruck);
          this.getFireTruck();
        }
      });
  }

  private getFireTruck(): void {
    this.fireTrucksService.getFireTruck(this.fireTruckId).pipe(
      takeUntil(this._destroy$)
    ).subscribe(fireTruck => this.fireTruck = fireTruck)
  }

  private getCallouts(): void {
    this.calloutsService.getFireTruckCallouts(this.fireTruckId).pipe(
      takeUntil(this._destroy$)
    ).subscribe(callouts => this.callouts = callouts)
  }
}
