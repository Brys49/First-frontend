import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { MembersService } from '../../../core/services/members.service';
import { Member } from '../../../core/models/member.model';
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss', '../../../shared/styles/feature-details.scss']
})
export class MemberDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public memberId: number = 0;
  @Output() public displaySummaryEvent = new EventEmitter<boolean>();
  public member!: Member;

  private _destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog,
              private membersService: MembersService) {
  }

  ngOnInit(): void {
    this.getMember();
  }

  ngOnChanges(): void {
    this.getMember();
  }

  public goBack(): void {
    this.displaySummaryEvent.emit(true)
  }

  public deleteMember(id: number): void {
    this.membersService.deleteMember(id);
    this.goBack();
  }

  public edit(): void {
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-member-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {member: this.member}
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      member => {
        if (member) {
          this.membersService.updateMember(member);
          this.getMember();
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  private getMember(): void {
    this.membersService.getMember(this.memberId).pipe(
      takeUntil(this._destroy$)
    ).subscribe(member => this.member = member)
  }
}
