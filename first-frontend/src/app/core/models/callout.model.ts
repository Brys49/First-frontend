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
  LOCAL_THREAT = "Local threat",
  TRAINING = "Training",
  FALSE_ALARM = "False alarm",
  SECURE_REGION = "Secure region",
  PRACTICE = "Practice"
}
