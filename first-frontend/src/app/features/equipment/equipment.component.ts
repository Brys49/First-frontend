import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Equipment } from 'src/app/core/models/equipment.model';
import { EquipmentService } from 'src/app/core/services/equipment.service';
import { AddEquipmentDialogComponent } from './add-equipment-dialog/add-equipment-dialog.component';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  public equipment: Equipment[] = [];

  constructor(public equipmentService: EquipmentService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getEquipment();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddEquipmentDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-equipment-dialog-panel',
      autoFocus: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe();
  }

  private getEquipment(): void {
    this.equipmentService.getAllEquipment()
      .subscribe(equipment => this.equipment = equipment);
  }

}
