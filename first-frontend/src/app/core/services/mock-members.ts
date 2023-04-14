import { Member } from '../models/member.model';

export const MEMBERS: Member[] = [
  {
    id: 1,
    firstname: 'Johny',
    lastname: 'Smith',
    birthdate: new Date('04/09/1984'),
    birthplace: "Boston",
    idNumber: '12233445566',
    address: 'Boston Main St. 12',
    joiningDate: new Date('12/11/2000'),
    role: "Firefighter",
    phoneNumber: '666 333 111',
    periodicExaminationsExpiryDate: new Date('10/05/2023'),
    isDriver: true,
    trainings: []
  },
  {
    id: 2,
    firstname: 'Adam',
    lastname: 'Jones',
    birthdate: new Date('02/11/1994'),
    birthplace: "New York",
    idNumber: '12/M/21/2222',
    address: 'New York Long St. 11',
    joiningDate: new Date('08/12/2019'),
    role: "Firefighter",
    phoneNumber: '655 311 121',
    periodicExaminationsExpiryDate: new Date('10/05/2023'),
    isDriver: true,
    trainings: []
  },
  {
    id: 3,
    firstname: 'Walter',
    lastname: 'White',
    birthdate: new Date('22/10/1975'),
    birthplace: "Albuquerque",
    idNumber: '12/M/21/2222',
    address: 'Albuquerque Black St. 13',
    joiningDate: new Date('08/02/2012'),
    role: "Firefighter",
    phoneNumber: '655 111 121',
    periodicExaminationsExpiryDate: new Date('10/05/2023'),
    isDriver: true,
    trainings: []
  },
]
