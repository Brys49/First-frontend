import { BloodType, Member } from '../models/member.model';

export const MEMBERS: Member[] = [
  {
    id: 1,
    firstname: 'Johny',
    lastname: 'Smith',
    joiningDate: new Date('12/11/2000'),
    pesel: '12233445566',
    address: 'Main St. 12',
    city: 'London',
    periodicExaminationsExpiryDate: new Date('10/05/2023'),
    isDriver: true,
    birthdate: new Date('04/09/1984'),
    bloodType: BloodType.A_PLUS,
    email: 'example@email.com',
    phoneNumber: '666 333 111',
    trainings: []
  },
  {
    id: 2,
    firstname: 'Adam',
    lastname: 'White',
    joiningDate: new Date('12/11/2004'),
    pesel: '92871029311',
    address: 'Second St. 1',
    city: 'New York',
    periodicExaminationsExpiryDate: new Date('03/01/2024'),
    isDriver: false,
    birthdate: new Date('01/02/1980'),
    bloodType: BloodType.B_MINUS,
    email: 'test@email.com',
    phoneNumber: '222 111 333',
    trainings: []
  },
]
