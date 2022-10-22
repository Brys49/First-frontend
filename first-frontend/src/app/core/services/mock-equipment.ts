import { Equipment } from '../models/equipment.model';

export const EQUIPMENT: Equipment[] = [
  {
    id: 1,
    name: "Halligan",
    price: 2000,
    serialNumber: "SN/2137ABCD123",
    parameters: new Map<string, string>([["Weight", "3KG"], ["Color", "Yellow"]]),
  },
  {
    id: 2,
    name: "Chainsaw",
    price: 3500,
    serialNumber: "ST/P5/2100",
    parameters: new Map<string, string>([["Chain length", "2m"], ["Horsepower", "2hp"]]),
  },
  {
    id: 3,
    name: "Turbo nozzle",
    price: 1350,
    serialNumber: "ROS/33312T",
    parameters: new Map<string, string>([["Max. pressure", "8"]]),
  }
]
