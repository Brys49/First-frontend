import { Component, OnInit } from '@angular/core';
import { MembersService } from '../../core/services/members.service';
import { Member } from '../../core/models/member.model';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  public members: Member[] = [];

  constructor(public membersService: MembersService, public dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.getMembers();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-member-dialog-panel',
      autoFocus: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(
      data => console.log("Dialog output:", data)
    );
  }

  private getMembers(): void {
    this.membersService.getMembers()
      .subscribe(members => this.members = members);
  }

}
