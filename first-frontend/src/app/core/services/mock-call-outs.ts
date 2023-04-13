import { CallOut, CallOutType } from '../models/call-out.model';

export const CALL_OUTS: CallOut[] = [
  {
    id: 1,
    alarmDate: new Date(2023, 2, 12, 11, 54),
    type: CallOutType.FIRE,
    location: "Poznan, Polna 2137a",
    details: "Structure fire, no injured",
    sections: [
      {
        fireTruckId: 1,
        departureDate: new Date(2023, 2, 12, 11, 56),
        returnDate: new Date(2023, 2, 12, 13, 0),
        crewIds: [1, 2]
      }
    ]
  },
  {
    id: 2,
    alarmDate:  new Date(2023, 2, 23, 19, 16),
    type: CallOutType.LOCAL_THREAT,
    location: "Poznan, Szkolna 11c",
    details: "3 cars, 1 dead, 1 injured",
    sections: [
      {
        fireTruckId: 2,
        departureDate: new Date(2023, 2, 23, 19, 18),
        returnDate: new Date(2023, 2, 23, 21, 21),
        crewIds: [1]
      }
    ]
  },
  {
    id: 3,
    alarmDate: new Date(2023, 3, 1, 2, 44),
    type: CallOutType.FALSE_ALARM,
    location: "Poznan, Nowina",
    details: "Reported smoke and fire - false alarm",
    sections: [
      {
        fireTruckId: 1,
        departureDate: new Date(2023, 3, 1, 2, 46),
        returnDate: new Date(2023, 3, 1, 5, 13),
        crewIds: [1]
      },
      {
        fireTruckId: 2,
        departureDate: new Date(2023, 3, 1, 2, 48),
        returnDate: new Date(2023, 3, 1, 5, 10),
        crewIds: [2]
      }
    ]
  }
]
