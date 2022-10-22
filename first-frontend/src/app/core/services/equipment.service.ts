import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Equipment } from '../models/equipment.model';
import { EQUIPMENT } from './mock-equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  equipment: Equipment[] = [];

  constructor() {
    this.equipment.push(EQUIPMENT[0]);
    this.equipment.push(EQUIPMENT[1]);
    this.equipment.push(EQUIPMENT[2]);
  }

  getAllEquipment(): Observable<Equipment[]> {
    return of(this.equipment);
  }

  getEquipment(id: number): Observable<Equipment> {
    const equipment = this.equipment.find(e => e.id === id)!;
    return of(equipment);
  }

  addEquipment(equipment: Equipment): void {
    this.equipment.push(equipment);
  }

  deleteEquipment(id: number): void {
    const index = this.equipment.map(x => {
      return x.id;
    }).indexOf(id);

    this.equipment.splice(index, 1);
  }
}
