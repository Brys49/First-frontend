import { Member } from './member.model';
import { FireTruck } from './fire-truck.model';

export class CallOut {
  start: Date;
  end: Date;
  type: CallOutType;
  location: string;
  details: string;
  fireTrucksInAction: FireTruck[];
  membersInAction: Member[];


  constructor(start: Date, end: Date, type: CallOutType, location: string, details: string, fireTrucksInAction: FireTruck[], membersInAction: Member[]) {
    this.start = start;
    this.end = end;
    this.type = type;
    this.location = location;
    this.details = details;
    this.fireTrucksInAction = fireTrucksInAction;
    this.membersInAction = membersInAction;
  }
}

export enum CallOutType {
  FIRE,
  LOCAL_THREAT,
  TRAINING,
  FALSE_ALARM,
  SECURE_REGION
}
