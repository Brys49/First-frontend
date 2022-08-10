import { Injectable } from '@angular/core';
import { FireTruck } from '../models/fire-truck.model';
import { Observable, of } from 'rxjs';
import { FIRE_TRUCKS } from './mock-fire-trucks';

@Injectable({
  providedIn: 'root'
})
export class FireTrucksService {
  fireTrucks: FireTruck[] = [];

  constructor() {
    this.fireTrucks.push(FIRE_TRUCKS[0]);
    this.fireTrucks.push(FIRE_TRUCKS[1]);
  }

  getFireTrucks(): Observable<FireTruck[]> {
    return of(this.fireTrucks);
  }

  getFireTruck(id: number): Observable<FireTruck> {
    const fireTruck = this.fireTrucks.find(ft => ft.id === id)!;
    return of(fireTruck);
  }

  addFireTruck(fireTruck: FireTruck): void {
    this.fireTrucks.push(fireTruck);
  }

  deleteFireTruck(id: number): void {
    const index = this.fireTrucks.map(x => {
      return x.id;
    }).indexOf(id);

    this.fireTrucks.splice(index, 1);
  }

}
