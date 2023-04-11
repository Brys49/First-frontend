import { Member } from './member.model';
import { FireTruck } from './fire-truck.model';

export interface CallOut {
  id: number;
  alarmDate: Date;
  departureDate: Date;
  returnDate: Date;
  type: CallOutType;
  location: string;
  details: string;
  fireTrucksInAction: FireTruck[];
  membersInAction: Member[];

}

export enum CallOutType {
  FIRE = "Fire",
  LOCAL_THREAT = "Local threat",
  TRAINING = "Training",
  FALSE_ALARM= "False alarm",
  SECURE_REGION = "Secure region",
  PRACTICE = "Practice"
}
