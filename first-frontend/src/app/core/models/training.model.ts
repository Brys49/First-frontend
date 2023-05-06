export interface Training {
  type: TrainingType;
  id: string;
  trainingDate: Date;
  expirationDate: Date;
}

export enum TrainingType {
  BASIC = "Basic",
  QUALIFIED_FIRST_AID = "Qualified first aid",
  OFFICER = "Officer",
  CHIEF = "Chief",
  MUNICIPAL_CHIEF= "Municipal fire chief",
}
