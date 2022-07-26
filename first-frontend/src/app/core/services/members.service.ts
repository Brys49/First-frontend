import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';
import { Observable, of } from 'rxjs';
import { MEMBERS } from './mock-members';
import { Training } from '../models/training.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] = [];

  constructor() {
    this.members.push(MEMBERS[0]);
    this.members.push(MEMBERS[1]);
  }

  getMembers(): Observable<Member[]> {
    return of(this.members);
  }

  getMember(id: number): Observable<Member> {
    const member = this.members.find(m => m.id === id)!;
    return of(member);
  }

  addMember(member: Member): void {
    this.members.push(member);
  }

  deleteMember(id: number): void {
    const index = this.members.map(x => {
      return x.id;
    }).indexOf(id);

    this.members.splice(index, 1);
  }

  addTraining(id: number, training: Training): void {
    this.getMember(id).subscribe(member => member.trainings.push(training));
  }
}
