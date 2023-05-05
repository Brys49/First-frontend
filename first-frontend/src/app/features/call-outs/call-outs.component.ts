import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CallOutsService} from '../../core/services/call-outs.service';
import {CallOut, CallOutType} from '../../core/models/call-out.model';
import {AddCallOutDialogComponent} from './add-call-out-dialog/add-call-out-dialog.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-call-outs',
  templateUrl: './call-outs.component.html',
  styleUrls: ['./call-outs.component.scss', '../../shared/styles/feature-dashboard.scss']
})
export class CallOutsComponent implements OnInit, OnDestroy {
  public selectedCallOutId!: number;
  public displaySummary: boolean = true;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog, private callOutsService: CallOutsService) {
  }

  ngOnInit(): void {
    this.callOutsService.toDisplayDetailsEvent.pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      id => {
        if (id) {
          this.showDetails(id);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public showDetails(id: number): void {
    this.displaySummary = false;
    this.selectedCallOutId = id;
  }

  public displaySummaryToggle(displaySummaryFlag: boolean): void {
    this.displaySummary = displaySummaryFlag;
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

    const dialogRef: MatDialogRef<AddCallOutDialogComponent> = this.dialog.open(AddCallOutDialogComponent, {
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
}
