import { Component, Input, OnInit, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Equipment } from 'src/app/core/models/equipment.model';
import { EquipmentService } from 'src/app/core/services/equipment.service';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddEquipmentDialogComponent } from '../add-equipment-dialog/add-equipment-dialog.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.scss', '../../../shared/styles/feature-details.scss',
  '../../../shared/styles/lists.scss']
})
export class EquipmentDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public equipmentId!: number;
  @Output() public displaySummaryEvent = new EventEmitter<boolean>();
  public equipment!: Equipment;

  private _destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog,
              private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.getEquipment();
  }

  ngOnChanges(): void {
    this.getEquipment()
  }

  public goBack(): void {
    this.displaySummaryEvent.emit(true)
  }

  public deleteEquipment(id: number): void {
    this.equipmentService.deleteEquipment(id);
    this.goBack();
  }

  public edit(): void {
    const dialogRef = this.dialog.open(AddEquipmentDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-equipment-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {equipment: this.equipment}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      equipment => {
        if (equipment) {
          this.equipmentService.updateEquipment(equipment);
          this.getEquipment()
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  private getEquipment(): void {
    this.equipmentService.getEquipment(this.equipmentId).pipe(
      takeUntil(this._destroy$)
    ).subscribe(equipment => this.equipment = equipment)
  }

}
