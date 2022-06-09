import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MembersService } from '../../../core/services/members.service';
import { Member } from '../../../core/models/member.model';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;

  constructor(
    private route: ActivatedRoute,
    private membersService: MembersService,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
    this.getMember();
  }

  private getMember(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.membersService.getMember(id).subscribe(member => this.member = member);
  }

  goBack(): void {
    this.location.back();
  }
}
