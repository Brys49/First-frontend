export interface FireTruck {
  id: number;
  name: string;
  image: File | null,
  vin: string;
  productionYear: number;
  licensePlate: string;
  operationalNumber: string;
  type: string;
  totalWeight: number;
  horsepower: number;
  numberOfSeats: number;
  mileage: number;
  vehicleInspectionExpiryDate: Date;
  insuranceExpiryDate: Date;
  parameters: Map<string, string>;
  imgUrl: string;
}
