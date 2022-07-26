export class Training {
  trainingDate: Date;
  expirationDate: Date;
  type: TrainingType;


  constructor(trainingDate: Date, expirationDate: Date, type: TrainingType) {
    this.trainingDate = trainingDate;
    this.expirationDate = expirationDate;
    this.type = type;
  }
}

export enum TrainingType {
  BASIC= "Basic",
  QUALIFIED_FIRST_AID = "Qualified first aid",
  TECHNICAL_RESCUE = "Technical rescue",
  WATER_RESCUE = "Water rescue",
  DRIVER_RESCUE_EQUIPMENT_KEEPER = "Driver rescue equipment keeper",
  LEADER = "Leader",
  HEADER = "Header",
  COMMUNE_COMMANDER = "Commune commander",
  LIFT = "Lift",
  CHEM_ECO_RESCUE = "Chem and eco rescue",
  SEARCH_AND_RESCUE = "Search and rescue",
  HIGH_ALTITUDE_RESCUE = "High altitude rescue",
  LADDER = "Ladder"
}
