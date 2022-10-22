import { FireTruck } from '../models/fire-truck.model';

export const FIRE_TRUCKS: FireTruck[] = [
  {
    id: 1,
    name: "Iveco Daily",
    image: null,
    price: 60000,
    vin: "4V4NC9GH37N429261",
    productionYear: 1999,
    operationalNumber: "597P07",
    type: "GLBARt",
    horsepower: 160,
    numberOfSeats: 6,
    mileage: 25978,
    parameters: new Map<string, string>([["Water tank: ", "800L"], ["Rapid intervention fire hose length:", "40m"]]),
    equipment: [],
    imgUrl: "assets/mock-images/iveco.jpg"
  },
  {
    id: 2,
    name: "Jelcz 442",
    image: null,
    price: 30000,
    vin: "1N4AA5AP2CC846794",
    productionYear: 1998,
    operationalNumber: "597P11",
    type: "GCBA",
    horsepower: 240,
    numberOfSeats: 6,
    mileage: 15663,
    parameters: new Map<string, string>(),
    equipment: [],
    imgUrl: "assets/mock-images/jelcz.jpg"
  },
  {
    id: 3,
    name: "Iveco Magirus",
    image: null,
    price: 45000,
    vin: "5NPEC4AC4DH717880",
    productionYear: 1997,
    operationalNumber: "597P13",
    type: "SD30",
    horsepower: 190,
    numberOfSeats: 3,
    mileage: 8700,
    parameters: new Map<string, string>(),
    equipment: [],
    imgUrl: "assets/mock-images/magirus.jpg"
  }
]
