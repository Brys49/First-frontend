import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../core/services/members.service';
import { Member } from '../../core/models/member.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  public members: Member[] = [];

  constructor(public membersService: MembersService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  private getMembers(): void{
    this.membersService.getMembers()
      .subscribe(members => this.members = members);
  }

}
