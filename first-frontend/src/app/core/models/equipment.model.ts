export interface Equipment {
  id: number;
  name: string;
  price: number;
  serialNumber: string;
  parameters: Map<string, string>;
}
