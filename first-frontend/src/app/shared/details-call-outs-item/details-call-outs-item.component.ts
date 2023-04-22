import { Component, Input, OnInit } from '@angular/core';
import { CallOutType } from '../../core/models/call-out.model';

@Component({
  selector: 'app-details-call-outs-item',
  templateUrl: './details-call-outs-item.component.html',
  styleUrls: ['./details-call-outs-item.component.scss',
    '../styles/lists.scss']
})
export class DetailsCallOutsItemComponent implements OnInit {
  @Input() public id: number = 0;
  @Input() public alarmDate: Date = new Date();
  @Input() public type: CallOutType = CallOutType.FALSE_ALARM;

  constructor() {
  }

  ngOnInit(): void {
  }

  public showDetails(): void {
    console.log(this.id);
  }

}
