import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalloutsComponent } from './callouts.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CalloutsListComponent } from './callouts-list/callouts-list.component';
import { AddCalloutDialogComponent } from './add-callout-dialog/add-callout-dialog.component';
import { CalloutDetailComponent } from './callout-detail/callout-detail.component';
import { CalloutDetailListComponent } from './callout-detail/callout-detail-list/callout-detail-list.component';
import { AddSectionFormComponent } from './add-callout-dialog/add-section-form/add-section-form.component';
import {
  CalloutDetailSectionComponent
} from './callout-detail/callout-detail-section/callout-detail-section.component';


@NgModule({
  declarations: [
    CalloutsComponent,
    CalloutsListComponent,
    AddCalloutDialogComponent,
    CalloutDetailComponent,
    CalloutDetailListComponent,
    AddSectionFormComponent,
    CalloutDetailSectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class CalloutsModule {
}
