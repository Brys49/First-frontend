import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallOutsComponent } from './call-outs.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CallOutsListComponent } from './call-outs-list/call-outs-list.component';
import { AddCallOutDialogComponent } from './add-call-out-dialog/add-call-out-dialog.component';
import { CallOutDetailComponent } from './call-out-detail/call-out-detail.component';
import { CallOutDetailListComponent } from './call-out-detail/call-out-detail-list/call-out-detail-list.component';
import { AddSectionFormComponent } from './add-call-out-dialog/add-section-form/add-section-form.component';
import { CallOutDetailSectionComponent } from './call-out-detail/call-out-detail-section/call-out-detail-section.component';



@NgModule({
  declarations: [
    CallOutsComponent,
    CallOutsListComponent,
    AddCallOutDialogComponent,
    CallOutDetailComponent,
    CallOutDetailListComponent,
    AddSectionFormComponent,
    CallOutDetailSectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class CallOutsModule { }
