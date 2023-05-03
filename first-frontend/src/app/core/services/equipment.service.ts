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
    const equipment: Equipment = this.equipment.find(equipment => equipment.id === id)!;
    return of(equipment);
  }

  addEquipment(equipment: Equipment): void {
    equipment.id = (this.equipment.length + 2) * 2;
    this.equipment.push(equipment);
  }

  updateEquipment(equipment: Equipment): void {
    this.deleteEquipment(equipment.id);
    this.equipment.push(equipment);
  }

  deleteEquipment(id: number): void {
    const index: number = this.equipment.map(equipment => {
      return equipment.id;
    }).indexOf(id);

    this.equipment.splice(index, 1);
  }
}
