import { Component, Input, OnInit } from '@angular/core';
import { FireTrucksService } from '../../../../core/services/fire-trucks.service';
import { Equipment } from '../../../../core/models/equipment.model';
import { EquipmentService } from '../../../../core/services/equipment.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTrainingDialogComponent } from '../../../members/member-detail/add-training-dialog/add-training-dialog.component';
import {
  AddEquipmentToFireTruckDialogComponent
} from '../add-equipment-to-fire-truck-dialog/add-equipment-to-fire-truck-dialog.component';

@Component({
  selector: 'app-fire-truck-equipment',
  templateUrl: './fire-truck-equipment.component.html',
  styleUrls: ['./fire-truck-equipment.component.scss']
})
export class FireTruckEquipmentComponent implements OnInit {
  private fireTruckEquipmentIds: number[] = []
  private remainingEquipment: Equipment[] = []
  @Input() public fireTruckId: number = 1;
  public equipment: Equipment[] = []
  public fireTruckEquipment: Equipment[] = []

  constructor(private fireTruckService: FireTrucksService,
              private equipmentService: EquipmentService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getEquipment();
    this.getFireTruckEquipment();
  }

  private getEquipment(): void {
    this.equipmentService.getAllEquipment()
      .subscribe(equipment => this.equipment = equipment);
  }

  private getFireTruckEquipment(): void {
    this.fireTruckService.getFireTruckEquipment(this.fireTruckId)
      .subscribe(fireTruckEquipmentIds => this.fireTruckEquipmentIds = fireTruckEquipmentIds)

    this.fireTruckEquipment = this.equipment.filter(e => this.fireTruckEquipmentIds.includes(e.id))
    this.remainingEquipment = this.equipment.filter(e => !this.fireTruckEquipmentIds.includes(e.id))
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddEquipmentToFireTruckDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-equipment-to-fire-truck-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {
        remainingEquipment: this.remainingEquipment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      for (let eId of result) {
        this.fireTruckService.addEquipmentToFireTruck(this.fireTruckId, eId)
      }
      this.getFireTruckEquipment()
    });
  }

  public removeEquipment(eid: number): void {
    this.fireTruckService.removeEquipmentFromFireTruck(this.fireTruckId, eid)
    this.ngOnInit()
  }

}
