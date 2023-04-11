import { CallOut, CallOutType } from '../models/call-out.model';

export const CALL_OUTS: CallOut[] = [
  {
    id: 1,
    alarmDate: new Date(2023, 2, 12, 11, 54),
    departureDate: new Date(2023, 2, 12, 11, 57),
    returnDate: new Date(2023, 2, 12, 13, 22),
    type: CallOutType.FIRE,
    location: "Poznan, Polna 2137a",
    details: "Structure fire, no injured",
    fireTrucksInAction: [],
    membersInAction: [],
  },
  {
    id: 2,
    alarmDate:  new Date(2023, 2, 23, 19, 16),
    departureDate: new Date(2023, 2, 23, 19, 17),
    returnDate:  new Date(2023, 2, 23, 22, 11),
    type: CallOutType.LOCAL_THREAT,
    location: "Poznan, Szkolna 11c",
    details: "3 cars, 1 dead, 1 injured",
    fireTrucksInAction: [],
    membersInAction: [],
  },
  {
    id: 3,
    alarmDate: new Date(2023, 3, 1, 2, 44),
    departureDate: new Date(2023, 3, 1, 2, 49),
    returnDate: new Date(2023, 3, 1, 3, 20),
    type: CallOutType.FALSE_ALARM,
    location: "Poznan, Nowina",
    details: "Reported smoke and fire - false alarm",
    fireTrucksInAction: [],
    membersInAction: [],
  }
]
