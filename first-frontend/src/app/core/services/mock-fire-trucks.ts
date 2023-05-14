import { FireTruck } from '../models/fire-truck.model';

export const FIRE_TRUCKS: FireTruck[] = [
  {
    id: 1,
    name: "Iveco Daily",
    image: null,
    vin: "4V4NC9GH37N429261",
    productionYear: 1999,
    licensePlate: "PSZ123123",
    operationalNumber: "597P07",
    type: "GLBARt",
    totalWeight: 5600,
    horsepower: 160,
    numberOfSeats: 6,
    mileage: 25978,
    vehicleInspectionExpiryDate: new Date('01/11/2001'),
    insuranceExpiryDate: new Date('12/12/1994'),
    parameters: new Map<string, string>([["Water tank: ", "800L"], ["Rapid intervention fire hose length:", "40m"]]),
    imgUrl: "assets/mock-images/iveco.jpg"
  },
  {
    id: 2,
    name: "Jelcz 442",
    image: null,
    vin: "1N4AA5AP2CC846794",
    productionYear: 1998,
    licensePlate: "PSZ00000",
    operationalNumber: "597P11",
    type: "GCBA",
    totalWeight: 15600,
    horsepower: 240,
    numberOfSeats: 6,
    mileage: 15663,
    vehicleInspectionExpiryDate: new Date('11/10/2012'),
    insuranceExpiryDate: new Date('12/15/2013'),
    parameters: new Map<string, string>(),
    imgUrl: "assets/mock-images/jelcz.jpg"
  },
  {
    id: 3,
    name: "Iveco Magirus",
    image: null,
    vin: "5NPEC4AC4DH717880",
    productionYear: 1997,
    licensePlate: "PSZ12213",
    operationalNumber: "597P13",
    type: "SD30",
    totalWeight: 8600,
    horsepower: 190,
    numberOfSeats: 3,
    mileage: 8700,
    vehicleInspectionExpiryDate: new Date('11/09/2022'),
    insuranceExpiryDate: new Date('12/05/2023'),
    parameters: new Map<string, string>(),
    imgUrl: "assets/mock-images/magirus.jpg"
  }
]
