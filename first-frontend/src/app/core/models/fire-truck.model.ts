export class FireTruck {
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


  constructor(name: string, price: number, vin: string, productionYear: number, operationalNumber: string, type: string, horsepower: number, numberOfSeats: number, mileage: number, parameters: Map<string, string>) {
    this.name = name;
    this.price = price;
    this.vin = vin;
    this.productionYear = productionYear;
    this.operationalNumber = operationalNumber;
    this.type = type;
    this.horsepower = horsepower;
    this.numberOfSeats = numberOfSeats;
    this.mileage = mileage;
    this.parameters = parameters;
  }
}
