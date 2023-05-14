import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Equipment } from '../models/equipment.model';
import { EQUIPMENT } from './mock-equipment';
import { StorageLocation } from "../models/storage-location.model";

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  equipment: Equipment[] = [];
  storageLocations: StorageLocation[] = [];

  constructor() {
    this.equipment.push(EQUIPMENT[0]);
    this.equipment.push(EQUIPMENT[1]);
    this.equipment.push(EQUIPMENT[2]);

    this.storageLocations.push({id: 1, name: 'Garage', default: true, onFireTruck: false});
    this.storageLocations.push({id: 2, name: 'Iveco Daily - 597P07', default: false, onFireTruck: true});
    this.storageLocations.push({id: 3, name: 'Jelcz 442 - 597P11', default: false, onFireTruck: true});
    this.storageLocations.push({id: 4, name: 'Iveco Magirus - 597P13', default: false, onFireTruck: true});

    this.storageLocations.sort((x, y) => Number(x.default) - Number(y.default));
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
    const index: number = this.equipment
      .map(equipment => equipment.id)
      .indexOf(id);
    this.equipment.splice(index, 1);
  }

  getStorageLocations(): Observable<StorageLocation[]> {
    return of(this.storageLocations);
  }

  addStorageLocation(storageLocation: StorageLocation): void {
    this.storageLocations.push(storageLocation);
  }

  editStorageLocation(storageLocationId: number, storageLocationNewName: string): void {
    const index: number = this.storageLocations
      .map(storageLocation => storageLocation.id)
      .indexOf(storageLocationId);

    if (index) {
      this.storageLocations[index].name = storageLocationNewName;
    } else {
      const newStorageLocation: StorageLocation = {
        id: this.storageLocations.length + 1,
        name: storageLocationNewName,
        default: false,
        onFireTruck: false
      };
      this.addStorageLocation(newStorageLocation);
    }
  }

  deleteStorageLocation(storageLocationId: number): void {
    const index: number = this.storageLocations
      .map(storageLocation => storageLocation.id)
      .indexOf(storageLocationId);
    this.storageLocations.splice(index, 1);
  }

  getFireTruckEquipment(fireTruckName: string, fireTruckOperationalNumbers: string): Observable<Equipment[]> {
    const fireTruckEquipment: Equipment[] = this.equipment.filter(
      equipment => equipment.storageLocation.name == fireTruckName + " - " + fireTruckOperationalNumbers);
    return of(fireTruckEquipment);
  }

  getRemainingEquipment(fireTruckName: string, fireTruckOperationalNumbers: string): Observable<Equipment[]> {
    const remainingEquipment: Equipment[] = this.equipment.filter(
      equipment => equipment.storageLocation.name !== fireTruckName + " - " + fireTruckOperationalNumbers);
    return of(remainingEquipment);
  }

  removeEquipmentFromFireTruck(equipment: Equipment): void {
    equipment.storageLocation = this.storageLocations[0];
  }
}
