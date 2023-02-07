import { Training } from './training.model';

export interface Member {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: Date;
  birthplace: string;
  idNumber: string;
  address: string;
  joiningDate: Date;
  role: string;
  phoneNumber: string;
  periodicExaminationsExpiryDate: Date;
  isDriver: boolean;
  trainings: Training[];

}

