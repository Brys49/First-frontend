import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Equipment} from 'src/app/core/models/equipment.model';
import {EquipmentService} from 'src/app/core/services/equipment.service';
import {AddEquipmentDialogComponent} from './add-equipment-dialog/add-equipment-dialog.component';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss', '../../shared/styles/feature-dashboard.scss']
})
export class EquipmentComponent implements OnInit, OnDestroy {
  public selectedEquipmentId!: number;
  public displaySummary: boolean = true;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog, private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
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
      storageLocation: '',
      parameters: new Map<string, string>()
    }

    const dialogRef: MatDialogRef<AddEquipmentDialogComponent> = this.dialog.open(AddEquipmentDialogComponent, {
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
}
