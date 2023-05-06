import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Callout } from '../../../core/models/callout.model';
import { CalloutsService } from '../../../core/services/callouts.service';
import { AddCalloutDialogComponent } from '../add-callout-dialog/add-callout-dialog.component';

@Component({
  selector: 'app-callout-detail',
  templateUrl: './callout-detail.component.html',
  styleUrls: ['./callout-detail.component.scss', '../../../shared/styles/feature-details.scss',
    '../../../shared/styles/lists.scss']
})
export class CalloutDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public calloutId!: number;
  @Output() public displaySummaryEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public callout!: Callout;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog,
              private calloutsService: CalloutsService) {
  }

  ngOnInit(): void {
    this.getCallout();
  }

  ngOnChanges(): void {
    this.getCallout()
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public goBack(): void {
    this.displaySummaryEvent.emit(true)
  }

  public deleteCallout(id: number): void {
    this.calloutsService.deleteCallout(id);
    this.goBack();
  }

  public edit(): void {
    const dialogRef: MatDialogRef<AddCalloutDialogComponent> = this.dialog.open(AddCalloutDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-callout-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {callout: this.callout}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      callout => {
        if (callout) {
          this.calloutsService.updateCallout(callout);
          this.getCallout()
        }
      });
  }

  private getCallout(): void {
    this.calloutsService.getCallout(this.calloutId).pipe(
      takeUntil(this._destroy$)
    ).subscribe(callout => this.callout = callout)
  }

}
