import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { CallOut } from '../../../core/models/call-out.model';
import { CallOutsService } from '../../../core/services/call-outs.service';
import { AddCallOutDialogComponent } from '../add-call-out-dialog/add-call-out-dialog.component';

@Component({
  selector: 'app-call-out-detail',
  templateUrl: './call-out-detail.component.html',
  styleUrls: ['./call-out-detail.component.scss', '../../../shared/styles/feature-details.scss',
    '../../../shared/styles/lists.scss']
})
export class CallOutDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public callOutId!: number;
  @Output() public displaySummaryEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  public callOut!: CallOut;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog,
              private callOutsService: CallOutsService) {
  }

  ngOnInit(): void {
    this.getCallOut();
  }

  ngOnChanges(): void {
    this.getCallOut()
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public goBack(): void {
    this.displaySummaryEvent.emit(true)
  }

  public deleteCallOut(id: number): void {
    this.callOutsService.deleteCallOut(id);
    this.goBack();
  }

  public edit(): void {
    const dialogRef: MatDialogRef<AddCallOutDialogComponent> = this.dialog.open(AddCallOutDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-call-out-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {callOut: this.callOut}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      callOut => {
        if (callOut) {
          this.callOutsService.updateCallOut(callOut);
          this.getCallOut()
        }
      });
  }

  private getCallOut(): void {
    this.callOutsService.getCallOut(this.callOutId).pipe(
      takeUntil(this._destroy$)
    ).subscribe(callOut => this.callOut = callOut)
  }

}
