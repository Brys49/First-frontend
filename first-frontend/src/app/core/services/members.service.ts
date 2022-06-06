import { Injectable } from '@angular/core';
import { BloodType, Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  public members: Member[];

  constructor() {
    this.members = [];
    this.members.push(
      new Member(
        1,
        'John',
        'Smith',
        new Date('12/11/2000'),
        '12233445566',
        'Main St. 12',
        'London',
        new Date('10/05/2023'),
        true,
        new Date('04/09/1984'),
        BloodType.A_PLUS,
        'example@email.com',
        '666 333 111',
        []),
      new Member(
        2,
        'Adam',
        'White',
        new Date('12/11/2004'),
        '92871029311',
        'Second St. 1',
        'New York',
        new Date('03/01/2024'),
        false,
        new Date('01/02/1980'),
        BloodType.B_MINUS,
        'test@email.com',
        '222 111 333',
        []));
    this.members.sort((a, b) => a.lastname.localeCompare(b.lastname))
  }
}
