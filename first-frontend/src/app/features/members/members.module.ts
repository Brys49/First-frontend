import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersListComponent } from './members-list/members-list.component';
import { MembersComponent } from './members.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';
import { AddTrainingDialogComponent } from './member-detail/add-training-dialog/add-training-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MemberDetailListComponent } from './member-detail/member-detail-list/member-detail-list.component';
import { MemberTrainingsComponent } from './member-detail/member-trainings/member-trainings.component';


@NgModule({
  declarations: [
    MembersComponent,
    MembersListComponent,
    MemberDetailComponent,
    AddMemberDialogComponent,
    AddTrainingDialogComponent,
    MemberDetailListComponent,
    MemberTrainingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class MembersModule {
}
