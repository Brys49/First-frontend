export interface FireTruck {
  name: string;
  price: number;
  vin: string;
  productionYear: number;
  operationalNumber: string;
  type: string;
  horsepower: number;
  numberOfSeats: number;
  mileage: number;
  parameters: Map<string, string>;

}
