import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FireTruck } from '../../../core/models/fire-truck.model';
import { FireTrucksService } from '../../../core/services/fire-trucks.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.scss']
})
export class GarageListComponent implements OnInit, OnDestroy {
  public fireTrucks: FireTruck[] = [];
  @Output() public fireTruckIdToDisplayEvent = new EventEmitter<number>();

  private _destroy$ = new Subject<void>();

  constructor(private fireTrucksService: FireTrucksService) {
  }

  ngOnInit(): void {
    this.getFireTrucks();
  }

  public showDetails(id: number): void {
    this.fireTruckIdToDisplayEvent.emit(id);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  private getFireTrucks(): void {
    this.fireTrucksService.getFireTrucks().pipe(
      takeUntil(this._destroy$)
    ).subscribe(fireTrucks => this.fireTrucks = fireTrucks);
  }

}
