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
  defaultStorageLocation: StorageLocation;

  constructor() {
    this.equipment.push(EQUIPMENT[0]);
    this.equipment.push(EQUIPMENT[1]);
    this.equipment.push(EQUIPMENT[2]);

    this.storageLocations.push({name: 'Garage', default: true, onFireTruck: false});
    this.storageLocations.push({name: 'Iveco Daily - 597P07', default: false, onFireTruck: true});
    this.storageLocations.push({name: 'Jelcz 442 - 597P11', default: false, onFireTruck: true});
    this.storageLocations.push({name: 'Iveco Magirus - 597P13', default: false, onFireTruck: true});

    this.storageLocations.sort((x, y) => Number(y.default) - Number(x.default));
    this.defaultStorageLocation = this.storageLocations[0];
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

  getDefaultStorageLocation(): StorageLocation {
    return this.defaultStorageLocation;
  }

  addStorageLocation(storageLocation: StorageLocation): void {
    this.storageLocations.push(storageLocation);
  }

  editStorageLocation(storageLocationOldName: string, storageLocationNewName: string): void {
    const index: number = this.storageLocations
      .map(storageLocation => storageLocation.name)
      .indexOf(storageLocationOldName);

    if (index !== undefined) {
      this.storageLocations[index].name = storageLocationNewName;
    } else {
      const newStorageLocation: StorageLocation = {
        name: storageLocationNewName,
        default: false,
        onFireTruck: false
      };
      this.addStorageLocation(newStorageLocation);
    }
  }

  deleteStorageLocation(storageLocationName: string): void {
    const index: number = this.storageLocations
      .map(storageLocation => storageLocation.name)
      .indexOf(storageLocationName);
    this.moveEquipmentToDefaultStorageLocation(storageLocationName);
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
    equipment.storageLocation = this.defaultStorageLocation;
  }

  changeEquipmentStorageLocation(equipment: Equipment, newStorageLocationName: string): void {
    const newStorageLocation: StorageLocation | undefined = this.storageLocations.find(storageLocation =>
      storageLocation.name == newStorageLocationName);
    if (newStorageLocation) {
      equipment.storageLocation = newStorageLocation
    }
  }

  moveEquipmentToDefaultStorageLocation(oldStorageLocationName: string): void {
    this.equipment.forEach(equipment => {
      if (equipment.storageLocation.name == oldStorageLocationName) {
        equipment.storageLocation = this.defaultStorageLocation;
      }
    });
  }

  changeDefaultStorageLocation(newDefaultStorageLocation: StorageLocation): void {
    this.defaultStorageLocation.default = false;
    newDefaultStorageLocation.default = true;
    this.storageLocations.sort((x, y) => Number(y.default) - Number(x.default));
    this.defaultStorageLocation = this.storageLocations[0];
  }
}
