import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';
import { Observable, of } from 'rxjs';
import { MEMBERS } from './mock-members';
import { Training, TrainingType } from '../models/training.model';

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
    member.id = (this.members.length + 2) * 2;
    this.members.push(member);
  }

  updateMember(member: Member): void {
    this.deleteMember(member.id)
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

  deleteTraining(id: number, type: TrainingType): void {
    this.getMember(id).subscribe(
      member => member.trainings.splice(member.trainings.findIndex(i => i.type === type), 1)
    )};
}
