import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipment } from 'src/app/core/models/equipment.model';
import { EquipmentService } from 'src/app/core/services/equipment.service';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.scss']
})
export class EquipmentDetailComponent implements OnInit {
  private equipmentId: number = 0;
  public equipment!: Equipment;
  public listContent: Map<string, any> = new Map();
  public listContentKeys: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private equipmentService: EquipmentService
  ) { }

  ngOnInit(): void {
    this.equipmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.getEquipment();
  }

  private getEquipment(): void {
    this.equipmentService.getEquipment(this.equipmentId).subscribe(equipment => this.equipment = equipment);

    if (this.equipment) {
      this.generateContent();
    } else {
      this.goBack();
    }
  }

  private generateContent(): void {
    this.listContent.clear();
    this.listContent.set("Serial number", this.equipment.serialNumber);
    this.listContent.set("Storage location", this.equipment.storageLocation);
    for (let paramKey of this.equipment.parameters.keys()) {
      this.listContent.set(paramKey, this.equipment.parameters.get(paramKey));
    }
    this.listContentKeys = Array.from(this.listContent.keys());
  }

  public goBack(): void {
    this.router.navigateByUrl('/home/equipment');
  }

  public deleteEquipment(id: number): void {
    this.equipmentService.deleteEquipment(id);
    this.goBack();
  }

}
