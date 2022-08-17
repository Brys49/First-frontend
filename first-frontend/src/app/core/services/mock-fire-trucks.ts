import { FireTruck } from '../models/fire-truck.model';

export const FIRE_TRUCKS: FireTruck[] = [
  {
    id: 1,
    name: "Iveco Daily",
    price: 60000,
    vin: "https://www.psszczesniak.pl/wp-content/uploads/2021/01/lekki-samochod-ratowniczo-gasniczy-iveco-daily-65c17-1.jpg?v=1612114630",
    productionYear: 1999,
    operationalNumber: "597P07",
    type: "GLBARt",
    horsepower: 160,
    numberOfSeats: 6,
    mileage: 25978,
    parameters: new Map<string, string>(),
    equipment: []

  },
  {
    id: 2,
    name: "Jelcz 442",
    price: 30000,
    vin: "https://img.czerwonesamochody.com/data/media/141/369c73_2.jpg",
    productionYear: 1998,
    operationalNumber: "597P11",
    type: "GCBA",
    horsepower: 240,
    numberOfSeats: 6,
    mileage: 15663,
    parameters: new Map<string, string>(),
    equipment: []

  },
  {
    id: 3,
    name: "Iveco Magirus",
    price: 45000,
    vin: "https://straz.lomianki.pl/dokumenty/zalaczniki/7/7-22322.jpg",
    productionYear: 1997,
    operationalNumber: "597P13",
    type: "SD30",
    horsepower: 190,
    numberOfSeats: 3,
    mileage: 8700,
    parameters: new Map<string, string>(),
    equipment: []

  }
]
