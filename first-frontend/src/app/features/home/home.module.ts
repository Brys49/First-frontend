import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StartScreenComponent } from '../start-screen/start-screen.component';
import { GarageComponent } from '../garage/garage.component';
import { MembersComponent } from '../members/members.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CallOutsComponent } from '../call-outs/call-outs.component';
import { EquipmentComponent } from '../equipment/equipment.component';
import { DocsComponent } from '../docs/docs.component';
import { SharedModule } from '../../shared/shared.module';
import { MemberDetailComponent } from '../members/member-detail/member-detail.component';
import { AddMemberDialogComponent } from '../members/add-member-dialog/add-member-dialog.component';
import { AddTrainingDialogComponent } from '../members/add-training-dialog/add-training-dialog.component';
import { FireTruckDetailComponent } from '../garage/fire-truck-detail/fire-truck-detail.component';


@NgModule({
  declarations: [
    HomeComponent,
    StartScreenComponent,
    DashboardComponent,
    MembersComponent,
    GarageComponent,
    EquipmentComponent,
    CallOutsComponent,
    DocsComponent,
    MemberDetailComponent,
    AddMemberDialogComponent,
    AddTrainingDialogComponent,
    FireTruckDetailComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
