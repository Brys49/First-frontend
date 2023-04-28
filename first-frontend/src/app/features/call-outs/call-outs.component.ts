import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CallOutsService } from '../../core/services/call-outs.service';
import { CallOut, CallOutType } from '../../core/models/call-out.model';
import { AddCallOutDialogComponent } from './add-call-out-dialog/add-call-out-dialog.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-call-outs',
  templateUrl: './call-outs.component.html',
  styleUrls: ['./call-outs.component.scss', '../../shared/styles/feature-dashboard.scss']
})
export class CallOutsComponent implements OnInit, OnDestroy {
  public selectedCallOutId!: number;
  public displaySummary: boolean = true;

  private _destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog, private callOutsService: CallOutsService) {
  }

  ngOnInit(): void {
    this.callOutsService.toDisplayDetailsEvent.pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      id => {
        this.showDetails(id);
      });
  }

  public showDetails(id: number): void {
    this.displaySummary = false;
    this.selectedCallOutId = id;
  }

  public displaySummaryToggle(v: boolean): void {
    this.displaySummary = v;
  }

  public openDialog(): void {
    const newCallOut: CallOut = {
      id: 0,
      alarmDate: new Date(),
      type: CallOutType.FIRE,
      location: '',
      details: '',
      sections: []
    }

    const dialogRef = this.dialog.open(AddCallOutDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-call-out-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {callOut: newCallOut}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      callOut => {
        if (callOut) {
          this.callOutsService.addCallOut(callOut)
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
