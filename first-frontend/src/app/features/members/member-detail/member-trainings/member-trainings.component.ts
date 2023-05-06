import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Member } from '../../../../core/models/member.model';
import { AddTrainingDialogComponent } from '../add-training-dialog/add-training-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { TrainingType } from '../../../../core/models/training.model';
import { MembersService } from '../../../../core/services/members.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-member-trainings',
  templateUrl: './member-trainings.component.html',
  styleUrls: ['./member-trainings.component.scss',
    '../../../../shared/styles/lists.scss']
})
export class MemberTrainingsComponent implements OnInit, OnDestroy {
  @Input() public member!: Member;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog,
              private membersService: MembersService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public openDialog(id: number): void {
    const dialogRef: MatDialogRef<AddTrainingDialogComponent> = this.dialog.open(AddTrainingDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-training-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe();
  }

  public deleteTraining(type: TrainingType): void {
    this.membersService.deleteTraining(this.member.id, type);
  }
}
