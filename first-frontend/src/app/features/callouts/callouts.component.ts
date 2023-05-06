import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CalloutsService } from '../../core/services/callouts.service';
import { Callout, CalloutType } from '../../core/models/callout.model';
import { AddCalloutDialogComponent } from './add-callout-dialog/add-callout-dialog.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-callouts',
  templateUrl: './callouts.component.html',
  styleUrls: ['./callouts.component.scss', '../../shared/styles/feature-dashboard.scss']
})
export class CalloutsComponent implements OnInit, OnDestroy {
  public selectedCalloutId!: number;
  public displaySummary: boolean = true;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog, private calloutsService: CalloutsService) {
  }

  ngOnInit(): void {
    this.calloutsService.toDisplayDetailsEvent.pipe(
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
    this.selectedCalloutId = id;
  }

  public displaySummaryToggle(displaySummaryFlag: boolean): void {
    this.displaySummary = displaySummaryFlag;
  }

  public openDialog(): void {
    const newCallout: Callout = {
      id: 0,
      alarmDate: new Date(),
      type: CalloutType.FIRE,
      location: '',
      details: '',
      sections: []
    }

    const dialogRef: MatDialogRef<AddCalloutDialogComponent> = this.dialog.open(AddCalloutDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-callout-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {callout: newCallout}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      callout => {
        if (callout) {
          this.calloutsService.addCallout(callout)
        }
      });
  }
}
