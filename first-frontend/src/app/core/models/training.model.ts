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
  BASIC,
  QUALIFIED_FIRST_AID,
  TECHNICAL_RESCUE,
  ANTI_FLOOD_AND_WATER_RESCUE,
  MAINTENANCE_DRIVER_RESCUE_EQUIPMENT,
  LEADERS,
  HEADERS,
  COMMUNE_COMMANDER,
  LIFT,
  CHEM_ECO_RESCUE,
  SEARCH_AND_RESCUE,
  HIGH_ALTITUDE_RESCUE,
  LADDER,
  HELMSMAN,
  SAWMAN
}
