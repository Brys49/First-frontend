import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Callout } from '../../../core/models/callout.model';
import { Observable } from 'rxjs';
import { CalloutsService } from '../../../core/services/callouts.service';

@Component({
  selector: 'app-callouts-list',
  templateUrl: './callouts-list.component.html',
  styleUrls: ['./callouts-list.component.scss', '../../../shared/styles/lists.scss']
})
export class CalloutsListComponent implements OnInit {
  public callouts$: Observable<Callout[]> = this.calloutsService.getCallouts();
  @Output() public calloutIdToDisplayEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private calloutsService: CalloutsService) {
  }

  ngOnInit(): void {
  }

  public showDetails(id: number): void {
    this.calloutIdToDisplayEvent.emit(id);
  }
}
