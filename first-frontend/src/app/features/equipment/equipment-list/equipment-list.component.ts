import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Equipment } from '../../../core/models/equipment.model';
import { EquipmentService } from '../../../core/services/equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss', '../../../shared/styles/lists.scss']
})
export class EquipmentListComponent implements OnInit {
  public equipment$: Observable<Equipment[]> = this.equipmentService.getAllEquipment();
  @Output() public equipmentIdToDisplayEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
  }

  public showDetails(id: number): void {
    this.equipmentIdToDisplayEvent.emit(id);
  }
}
