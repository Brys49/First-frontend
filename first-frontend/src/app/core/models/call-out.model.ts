import { Member } from './member.model';
import { FireTruck } from './fire-truck.model';

export interface CallOut {
  start: Date;
  end: Date;
  type: CallOutType;
  location: string;
  details: string;
  fireTrucksInAction: FireTruck[];
  membersInAction: Member[];

}

export const enum CallOutType {
  FIRE,
  LOCAL_THREAT,
  TRAINING,
  FALSE_ALARM,
  SECURE_REGION
}
