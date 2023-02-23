import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FireTruck } from 'src/app/core/models/fire-truck.model';
import { FireTrucksService } from 'src/app/core/services/fire-trucks.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { AddFireTruckDialogComponent } from '../add-fire-truck-dialog/add-fire-truck-dialog.component';

@Component({
  selector: 'app-fire-truck-detail',
  templateUrl: './fire-truck-detail.component.html',
  styleUrls: ['./fire-truck-detail.component.scss', '../../../shared/styles/feature-details.scss',
    '../../../shared/styles/lists.scss']
})
export class FireTruckDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public fireTruckId: number = 0;
  @Output() public displaySummaryEvent = new EventEmitter<boolean>();
  public fireTruck!: FireTruck;

  private _destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog,
              private fireTrucksService: FireTrucksService) {
  }

  ngOnInit(): void {
    this.getFireTruck();
  }

  ngOnChanges(): void {
    this.getFireTruck();
  }

  public goBack(): void {
    this.displaySummaryEvent.emit(true)
  }

  public deleteFireTruck(id: number): void {
    this.fireTrucksService.deleteFireTruck(id);
    this.goBack();
  }

  public edit(): void {
    const dialogRef = this.dialog.open(AddFireTruckDialogComponent, {
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

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  private getFireTruck(): void {
    this.fireTrucksService.getFireTruck(this.fireTruckId).pipe(
      takeUntil(this._destroy$)
    ).subscribe(fireTruck => this.fireTruck = fireTruck
    );
  }
}
