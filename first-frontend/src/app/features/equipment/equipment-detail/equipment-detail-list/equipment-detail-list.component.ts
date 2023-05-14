import { Component, Input, OnInit } from '@angular/core';
import { Equipment } from '../../../../core/models/equipment.model';

@Component({
  selector: 'app-equipment-detail-list',
  templateUrl: './equipment-detail-list.component.html',
  styleUrls: ['./equipment-detail-list.component.scss',
    '../../../../shared/styles/lists.scss']
})
export class EquipmentDetailListComponent implements OnInit {
  @Input() public equipment: Equipment = {
    id: 0,
    name: '',
    serialNumber: '',
    quantity: 0,
    category: '',
    storageLocation: {name: '', default: false, onFireTruck: false},
    parameters: new Map<string, string>()
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
