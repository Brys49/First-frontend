import { Equipment } from '../models/equipment.model';

export const EQUIPMENT: Equipment[] = [
  {
    id: 1,
    name: "Halligan",
    serialNumber: "SN/2137ABCD123",
    quantity: 1,
    category: "Tool",
    storageLocation: {id: 1, name: 'Garage', default: true, onFireTruck: false},
    parameters: new Map<string, string>([["Weight", "3KG"], ["Color", "Yellow"]]),
  },
  {
    id: 2,
    name: "Chainsaw",
    serialNumber: "ST/P5/2100",
    quantity: 1,
    category: "Tool",
    storageLocation: {id: 1, name: 'Garage', default: true, onFireTruck: false},
    parameters: new Map<string, string>([["Chain length", "2m"], ["Horsepower", "2hp"]]),
  },
  {
    id: 3,
    name: "Turbo nozzle",
    serialNumber: "ROS/33312T",
    quantity: 1,
    category: "Water tools",
    storageLocation: {id: 1, name: 'Garage', default: true, onFireTruck: false},
    parameters: new Map<string, string>([["Max. pressure", "8"]]),
  }
]
