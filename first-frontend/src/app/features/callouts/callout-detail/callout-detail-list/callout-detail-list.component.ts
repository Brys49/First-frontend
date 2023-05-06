import { Component, Input, OnInit } from '@angular/core';
import { Callout, CalloutType } from '../../../../core/models/callout.model';

@Component({
  selector: 'app-callout-detail-list',
  templateUrl: './callout-detail-list.component.html',
  styleUrls: ['./callout-detail-list.component.scss',
    '../../../../shared/styles/lists.scss']
})
export class CalloutDetailListComponent implements OnInit {
  @Input() public callout: Callout = {
    id: 0,
    alarmDate: new Date(),
    type: CalloutType.FIRE,
    location: '',
    details: '',
    sections: []
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
