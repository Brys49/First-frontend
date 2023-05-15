import { StorageLocation } from "./storage-location.model";

export interface Equipment {
  id: number;
  name: string;
  serialNumber: string;
  quantity: number;
  category: string;
  storageLocation: StorageLocation;
  parameters: Map<string, string>;
}
