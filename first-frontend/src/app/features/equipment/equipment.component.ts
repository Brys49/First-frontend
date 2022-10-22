import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Equipment } from 'src/app/core/models/equipment.model';
import { EquipmentService } from 'src/app/core/services/equipment.service';

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

  }

  private getEquipment(): void {
    this.equipmentService.getAllEquipment()
      .subscribe(equipment => this.equipment = equipment);
  }

}
