export interface Equipment {
  id: number;
  name: string;
  serialNumber: string;
  storageLocation: string;
  parameters: Map<string, string>;
}
