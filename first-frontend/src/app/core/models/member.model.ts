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
  email: string;
  phoneNumber: string;
  trainings: Training[];


  constructor(id: number, firstname: string, lastname: string, joiningDate: Date, pesel: string, address: string, city: string, periodicExaminationsExpiryDate: Date, isDriver: boolean, birthdate: Date, email: string, phoneNumber: string, trainings: Training[]) {
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
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.trainings = trainings;
  }


}

