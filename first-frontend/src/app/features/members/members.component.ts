import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MembersService } from '../../core/services/members.service';
import { Member } from '../../core/models/member.model';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';
import { Training, TrainingType } from '../../core/models/training.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  public members: Member[] = [];
  public trainingTypes = Object.values(TrainingType)

  constructor(public membersService: MembersService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getMembers();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-member-dialog-panel',
      autoFocus: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe();
  }

  public checkTrainingIcon(trainings: Training[], type: string): boolean {
    return trainings.some(t => t.type === type)
  }

  private getMembers(): void {
    this.membersService.getMembers()
      .subscribe(members => this.members = members);
  }

}
