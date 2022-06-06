import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../core/services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor(public membersService: MembersService) { }

  ngOnInit(): void {
  }

}
