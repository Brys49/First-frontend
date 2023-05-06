import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Member } from '../../../core/models/member.model';
import { Training, TrainingType } from '../../../core/models/training.model';
import { MembersService } from '../../../core/services/members.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss', '../../../shared/styles/lists.scss']
})
export class MembersListComponent implements OnInit {
  public members$: Observable<Member[]> = this.membersService.getMembers();
  public trainingTypes: TrainingType[] = Object.values(TrainingType)
  @Output() public memberIdToDisplayEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor(private membersService: MembersService) {
  }

  ngOnInit(): void {
  }

  public checkTrainingIcon(trainings: Training[], type: string): boolean {
    return trainings.some(training => training.type === type)
  }

  public showDetails(id: number): void {
    this.memberIdToDisplayEvent.emit(id);
  }

}
