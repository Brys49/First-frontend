import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';
import { Observable, of } from 'rxjs';
import { MEMBERS } from './mock-members';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor() {
  }

  getMembers(): Observable<Member[]> {
    return of(MEMBERS);
  }

  getMember(id: number): Observable<Member> {
    const member = MEMBERS.find(m => m.id === id)!;
    return of(member);
  }
}
