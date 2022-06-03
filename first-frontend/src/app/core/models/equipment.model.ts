export class Equipment {
  name: string;
  price: number;
  serialNumber: string;
  
  constructor(name: string, price: number, serialNumber: string) {
    this.name = name;
    this.price = price;
    this.serialNumber = serialNumber;
  }
}
