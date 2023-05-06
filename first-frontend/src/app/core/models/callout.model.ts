export interface Callout {
  id: number;
  alarmDate: Date;
  type: CalloutType;
  location: string;
  details: string;
  sections: Section[];
}

export interface Section {
  fireTruckId: number;
  departureDate: Date;
  returnDate: Date;
  crewIds: number[];
}

export enum CalloutType {
  FIRE = "Fire",
  RESCUE = "Rescue",
  TRAINING = "Training",
  FALSE_ALARM = "False alarm",
  REGION_COVER = "Region cover",
}
