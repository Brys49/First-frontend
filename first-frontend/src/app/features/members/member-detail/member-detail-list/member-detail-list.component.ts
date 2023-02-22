import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../../../core/models/member.model';

@Component({
  selector: 'app-member-detail-list',
  templateUrl: './member-detail-list.component.html',
  styleUrls: ['./member-detail-list.component.scss',
    '../../../../shared/styles/lists.scss']
})
export class MemberDetailListComponent implements OnInit {
  @Input() public member!: Member

  constructor() {
  }

  ngOnInit(): void {
  }

}
