import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StartScreenComponent } from '../start-screen/start-screen.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CallOutsComponent } from '../call-outs/call-outs.component';
import { DocsComponent } from '../docs/docs.component';
import { SharedModule } from '../../shared/shared.module';
import { MembersModule } from '../members/members.module';
import { EquipmentModule } from '../equipment/equipment.module';
import { GarageModule } from '../garage/garage.module';

@NgModule({
  declarations: [
    HomeComponent,
    StartScreenComponent,
    DashboardComponent,
    CallOutsComponent,
    DocsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MembersModule,
    GarageModule,
    EquipmentModule
  ]
})
export class HomeModule {
}
