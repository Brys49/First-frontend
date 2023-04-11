import { Component, Input, OnInit } from '@angular/core';
import { CallOut, CallOutType } from '../../../../core/models/call-out.model';

@Component({
  selector: 'app-call-out-detail-list',
  templateUrl: './call-out-detail-list.component.html',
  styleUrls: ['./call-out-detail-list.component.scss',
    '../../../../shared/styles/lists.scss']
})
export class CallOutDetailListComponent implements OnInit {
  @Input() public callOut: CallOut = {
    id: 0,
    alarmDate: new Date(),
    departureDate: new Date(),
    returnDate: new Date(),
    type: CallOutType.FIRE,
    location: '',
    details: '',
    fireTrucksInAction: [],
    membersInAction: []
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
