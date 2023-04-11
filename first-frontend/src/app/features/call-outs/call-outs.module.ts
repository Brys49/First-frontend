import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallOutsComponent } from './call-outs.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CallOutsListComponent } from './call-outs-list/call-outs-list.component';
import { AddCallOutDialogComponent } from './add-call-out-dialog/add-call-out-dialog.component';
import { CallOutDetailComponent } from './call-out-detail/call-out-detail.component';
import { CallOutDetailListComponent } from './call-out-detail/call-out-detail-list/call-out-detail-list.component';



@NgModule({
  declarations: [
    CallOutsComponent,
    CallOutsListComponent,
    AddCallOutDialogComponent,
    CallOutDetailComponent,
    CallOutDetailListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class CallOutsModule { }
