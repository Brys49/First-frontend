import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';
import { Member } from '../../core/models/member.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MembersService } from '../../core/services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss', '../../shared/styles/feature-dashboard.scss']
})
export class MembersComponent implements OnInit, OnDestroy {
  public selectedMemberId!: number;
  public displaySummary: boolean = true;

  private _destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog, private membersService: MembersService) {
  }

  ngOnInit(): void {
  }

  public showDetails(id: number): void {
    this.displaySummary = false;
    this.selectedMemberId = id;
  }

  public displaySummaryToggle(v: boolean): void {
    this.displaySummary = v;
  }

  public openDialog(): void {
    const newMember: Member = {
      id: 0,
      firstname: '',
      lastname: '',
      birthdate: new Date(),
      birthplace: '',
      idNumber: '',
      address: '',
      joiningDate: new Date(),
      role: '',
      phoneNumber: '',
      periodicExaminationsExpiryDate: new Date(),
      isDriver: false,
      trainings: []
    }

    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-member-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {member: newMember}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      member => {
        if (member) {
          this.membersService.addMember(member);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

}
