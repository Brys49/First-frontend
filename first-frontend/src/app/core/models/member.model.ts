import { Training } from './training.model';

export class Member {
  id: number;
  firstname: string;
  lastname: string;
  joiningDate: Date;
  pesel: string;
  address: string;
  city: string;
  periodicExaminationsExpiryDate: Date;
  isDriver: boolean;
  birthdate: Date;
  bloodType: BloodType;
  email: string;
  phoneNumber: string;
  trainings: Training[];


  constructor(id: number, firstname: string, lastname: string, joiningDate: Date, pesel: string, address: string, city: string, periodicExaminationsExpiryDate: Date, isDriver: boolean, birthdate: Date, bloodType: BloodType, email: string, phoneNumber: string, trainings: Training[]) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.joiningDate = joiningDate;
    this.pesel = pesel;
    this.address = address;
    this.city = city;
    this.periodicExaminationsExpiryDate = periodicExaminationsExpiryDate;
    this.isDriver = isDriver;
    this.birthdate = birthdate;
    this.bloodType = bloodType;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.trainings = trainings;
  }
}

export enum BloodType {
  O_PLUS = "0+",
  O_MINUS = "0-",
  A_PLUS = "A+",
  A_MINUS = "A-",
  B_PLUS = "B+",
  B_MINUS = "B-",
  AB_PLUS = "AB+",
  AB_MINUS = "AB-",
}
