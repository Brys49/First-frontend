import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Equipment } from '../../../core/models/equipment.model';
import { EquipmentService } from '../../../core/services/equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss', '../../../shared/styles/lists.scss']
})
export class EquipmentListComponent implements OnInit, OnDestroy {
  public equipment: Equipment[] = [];
  @Output() public equipmentIdToDisplayEvent = new EventEmitter<number>();

  private _destroy$ = new Subject<void>();

  constructor(private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.getEquipment();
  }

  public showDetails(id: number): void {
    this.equipmentIdToDisplayEvent.emit(id);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  private getEquipment(): void {
    this.equipmentService.getAllEquipment().pipe(
      takeUntil(this._destroy$)
    ).subscribe(equipment => this.equipment = equipment);
  }
}
