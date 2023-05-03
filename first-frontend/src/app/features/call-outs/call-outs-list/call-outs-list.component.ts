import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CallOut } from '../../../core/models/call-out.model';
import {Observable, Subject} from 'rxjs';
import { CallOutsService } from '../../../core/services/call-outs.service';

@Component({
  selector: 'app-call-outs-list',
  templateUrl: './call-outs-list.component.html',
  styleUrls: ['./call-outs-list.component.scss', '../../../shared/styles/lists.scss']
})
export class CallOutsListComponent implements OnInit {
  public callOuts$: Observable<CallOut[]> = this.callOutsService.getCallOuts();
  @Output() public callOutIdToDisplayEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private callOutsService: CallOutsService) {
  }

  ngOnInit(): void {
  }

  public showDetails(id: number): void {
    this.callOutIdToDisplayEvent.emit(id);
  }
}
