import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CallOut } from '../../../core/models/call-out.model';
import { Subject } from 'rxjs';
import { CallOutsService } from '../../../core/services/call-outs.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-call-outs-list',
  templateUrl: './call-outs-list.component.html',
  styleUrls: ['./call-outs-list.component.scss', '../../../shared/styles/lists.scss']
})
export class CallOutsListComponent implements OnInit, OnDestroy {
  public callOuts: CallOut[] = [];
  @Output() public callOutIdToDisplayEvent = new EventEmitter<number>();

  private _destroy$ = new Subject<void>();

  constructor(private callOutsService: CallOutsService) {
  }

  ngOnInit(): void {
    this.getCallOuts();
  }

  public showDetails(id: number): void {
    this.callOutIdToDisplayEvent.emit(id);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  private getCallOuts(): void {
    this.callOutsService.getCallOuts().pipe(
      takeUntil(this._destroy$)
    ).subscribe(callOuts => this.callOuts = callOuts);
  }
}
