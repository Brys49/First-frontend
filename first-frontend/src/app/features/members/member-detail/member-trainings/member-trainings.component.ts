import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Member } from '../../../../core/models/member.model';
import { AddTrainingDialogComponent } from '../add-training-dialog/add-training-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { TrainingType } from '../../../../core/models/training.model';
import { MembersService } from '../../../../core/services/members.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-member-trainings',
  templateUrl: './member-trainings.component.html',
  styleUrls: ['./member-trainings.component.scss',
    '../../../../shared/styles/lists.scss']
})
export class MemberTrainingsComponent implements OnInit, OnDestroy {
  @Input() public member!: Member;

  private _destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog,
              private membersService: MembersService) { }

  ngOnInit(): void {
  }

  public openDialog(id: number): void {
    const dialogRef = this.dialog.open(AddTrainingDialogComponent, {
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

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
