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
    this.fireTrucks.push(FIRE_TRUCKS[2]);
  }

  getFireTrucks(): Observable<FireTruck[]> {
    return of(this.fireTrucks);
  }

  getFireTruck(id: number): Observable<FireTruck> {
    const fireTruck: FireTruck = this.fireTrucks.find(fireTruck => fireTruck.id === id)!;
    return of(fireTruck);
  }

  addFireTruck(fireTruck: FireTruck): void {
    fireTruck.id = (this.fireTrucks.length + 2) * 2;
    this.fireTrucks.push(fireTruck);
  }

  updateFireTruck(fireTruck: FireTruck): void {
    this.deleteFireTruck(fireTruck.id)
    this.fireTrucks.push(fireTruck);
  }

  deleteFireTruck(id: number): void {
    const index: number = this.fireTrucks.map(fireTruck => {
      return fireTruck.id;
    }).indexOf(id);

    this.fireTrucks.splice(index, 1);
  }

}
