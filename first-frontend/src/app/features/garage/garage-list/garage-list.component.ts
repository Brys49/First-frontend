import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FireTruck } from '../../../core/models/fire-truck.model';
import { FireTrucksService } from '../../../core/services/fire-trucks.service';
import {Observable, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.scss']
})
export class GarageListComponent implements OnInit {
  public fireTrucks$: Observable<FireTruck[]> = this.fireTrucksService.getFireTrucks();
  @Output() public fireTruckIdToDisplayEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private fireTrucksService: FireTrucksService) {
  }

  ngOnInit(): void {
  }

  public showDetails(id: number): void {
    this.fireTruckIdToDisplayEvent.emit(id);
  }
}
