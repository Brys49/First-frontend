import { FireTruck } from '../models/fire-truck.model';

export const FIRE_TRUCKS: FireTruck[] = [
  {
    id: 1,
    name: "Iveco Daily",
    price: 60000,
    vin: "SAJWA6FC2F8K69611",
    productionYear: 1999,
    operationalNumber: "597P07",
    type: "GLBARt",
    horsepower: 160,
    numberOfSeats: 6,
    mileage: 25978,
    parameters: new Map<string, string>()

  },
  {
    id: 2,
    name: "Jelcz 442",
    price: 30000,
    vin: "JH4CU26639C081420",
    productionYear: 1998,
    operationalNumber: "597P11",
    type: "GCBA",
    horsepower: 240,
    numberOfSeats: 6,
    mileage: 15663,
    parameters: new Map<string, string>()

  }
]
