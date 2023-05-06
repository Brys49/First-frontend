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
  periodicMedicalExaminationExpiryDate: Date;
  isDriver: boolean;
  trainings: Training[];

}

