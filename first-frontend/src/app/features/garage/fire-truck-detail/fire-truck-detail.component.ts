import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FireTruck } from 'src/app/core/models/fire-truck.model';
import { FireTrucksService } from 'src/app/core/services/fire-trucks.service';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { AddFireTruckDialogComponent } from '../add-fire-truck-dialog/add-fire-truck-dialog.component';
import { CallOut } from '../../../core/models/call-out.model';
import { CallOutsService } from '../../../core/services/call-outs.service';

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
  public callOuts: CallOut[] = [];

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog,
              private fireTrucksService: FireTrucksService,
              private callOutsService: CallOutsService) {
  }

  ngOnInit(): void {
    this.getFireTruck();
    this.getCallOuts();
  }

  ngOnChanges(): void {
    this.getFireTruck();
    this.getCallOuts();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public goBack(): void {
    this.displaySummaryEvent.emit(true)
  }

  public deleteFireTruck(id: number): void {
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
          this.fireTrucksService.updateFireTruck(fireTruck);
          this.getFireTruck()
        }
      });
  }

  private getFireTruck(): void {
    this.fireTrucksService.getFireTruck(this.fireTruckId).pipe(
      takeUntil(this._destroy$)
    ).subscribe(fireTruck => this.fireTruck = fireTruck)
  }

  private getCallOuts(): void {
    this.callOutsService.getFireTruckCallOuts(this.fireTruckId).pipe(
      takeUntil(this._destroy$)
    ).subscribe(callOuts => this.callOuts = callOuts)
  }
}
