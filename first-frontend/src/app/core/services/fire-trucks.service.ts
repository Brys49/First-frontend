import { Injectable } from '@angular/core';
import { FireTruck } from '../models/fire-truck.model';
import { Observable, of } from 'rxjs';
import { FIRE_TRUCKS } from './mock-fire-trucks';

@Injectable({
  providedIn: 'root'
})
export class FireTrucksService {
  fireTrucks: FireTruck[] = [];
  fireTrucksEquipment: [number, number][] = [];

  constructor() {
    this.fireTrucks.push(FIRE_TRUCKS[0]);
    this.fireTrucks.push(FIRE_TRUCKS[1]);
    this.fireTrucks.push(FIRE_TRUCKS[2]);
    this.fireTrucksEquipment.push([1, 1]);
  }

  getFireTrucks(): Observable<FireTruck[]> {
    return of(this.fireTrucks);
  }

  getFireTruck(id: number): Observable<FireTruck> {
    const fireTruck = this.fireTrucks.find(ft => ft.id === id)!;
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
    const index = this.fireTrucks.map(x => {
      return x.id;
    }).indexOf(id);

    this.fireTrucks.splice(index, 1);
  }

  getFireTruckEquipment(id: number): Observable<number[]> {
    const fireTruckEquipmentIds = []
    for (const [ftId, eId] of this.fireTrucksEquipment) {
      if (ftId == id) {
        fireTruckEquipmentIds.push(eId)
      }
    }
    return of(fireTruckEquipmentIds);
  }

  addEquipmentToFireTruck(fireTruckId: number, equipmentId: number): void {
    this.fireTrucksEquipment.push([fireTruckId, equipmentId])
  }

  removeEquipmentFromFireTruck(fireTruckId: number, equipmentId: number): void {
    this.fireTrucksEquipment = this.fireTrucksEquipment.filter(pair => (pair[0] !== fireTruckId || pair[1] !== equipmentId))
  }

}
