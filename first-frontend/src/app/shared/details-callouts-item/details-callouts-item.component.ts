import { Component, Input, OnInit } from '@angular/core';
import { CalloutType } from '../../core/models/callout.model';
import { CalloutsService } from '../../core/services/callouts.service';

@Component({
  selector: 'app-details-callouts-item',
  templateUrl: './details-callouts-item.component.html',
  styleUrls: ['./details-callouts-item.component.scss',
    '../styles/lists.scss']
})
export class DetailsCalloutsItemComponent implements OnInit {
  @Input() public id: number = 0;
  @Input() public alarmDate: Date = new Date();
  @Input() public type: CalloutType = CalloutType.FALSE_ALARM;

  constructor(private calloutsService: CalloutsService) {
  }

  ngOnInit(): void {
  }

  public showDetails(): void {
    this.calloutsService.showDetails(this.id);
  }

}
