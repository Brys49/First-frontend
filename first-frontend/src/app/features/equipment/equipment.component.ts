import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Equipment } from 'src/app/core/models/equipment.model';
import { EquipmentService } from 'src/app/core/services/equipment.service';
import { AddEquipmentDialogComponent } from './add-equipment-dialog/add-equipment-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss', '../../shared/styles/feature-dashboard.scss']
})
export class EquipmentComponent implements OnInit, OnDestroy {
  public selectedEquipmentId!: number;
  public displaySummary: boolean = true;

  private _destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog, private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
  }

  public showDetails(id: number): void {
    this.displaySummary = false;
    this.selectedEquipmentId = id;
  }

  public displaySummaryToggle(v: boolean): void {
    this.displaySummary = v;
  }

  public openDialog(): void {
    const newEquipment: Equipment = {
      id: 0,
      name: '',
      serialNumber: '',
      storageLocation: '',
      parameters: new Map<string, string>()
    }

    const dialogRef = this.dialog.open(AddEquipmentDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-equipment-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {equipment: newEquipment}
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

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
