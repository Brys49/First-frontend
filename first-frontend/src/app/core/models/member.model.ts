import { Training } from './training.model';

export interface Member {
  id: number;
  firstname: string;
  lastname: string;
  isDriver: boolean;
  joiningDate: Date;
  pesel: string;
  address: string;
  city: string;
  periodicExaminationsExpiryDate: Date;
  birthdate: Date;
  email: string;
  phoneNumber: string;
  trainings: Training[];

}

