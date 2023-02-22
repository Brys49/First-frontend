import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Member } from '../../../core/models/member.model';
import { Training, TrainingType } from '../../../core/models/training.model';
import { MembersService } from '../../../core/services/members.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss', '../../../shared/styles/lists.scss']
})
export class MembersListComponent implements OnInit, OnDestroy {
  public members: Member[] = [];
  public trainingTypes = Object.values(TrainingType)
  @Output() public memberIdToDisplayEvent = new EventEmitter<number>();

  private _destroy$ = new Subject<void>();

  constructor(private membersService: MembersService) {
  }

  ngOnInit(): void {
    this.getMembers();
  }

  public checkTrainingIcon(trainings: Training[], type: string): boolean {
    return trainings.some(t => t.type === type)
  }

  public showDetails(id: number): void {
    this.memberIdToDisplayEvent.emit(id);
  }

  private getMembers(): void {
    this.membersService.getMembers().pipe(
      takeUntil(this._destroy$)
    ).subscribe(members => this.members = members);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }
}
