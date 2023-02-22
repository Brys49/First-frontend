import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StartScreenComponent } from '../start-screen/start-screen.component';
import { GarageComponent } from '../garage/garage.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CallOutsComponent } from '../call-outs/call-outs.component';
import { DocsComponent } from '../docs/docs.component';
import { SharedModule } from '../../shared/shared.module';
import { FireTruckDetailComponent } from '../garage/fire-truck-detail/fire-truck-detail.component';
import { AddFireTruckDialogComponent } from '../garage/add-fire-truck-dialog/add-fire-truck-dialog.component';
import {
  FireTruckEquipmentComponent
} from '../garage/fire-truck-detail/fire-truck-equipment/fire-truck-equipment.component';
import {
  AddEquipmentToFireTruckDialogComponent
} from '../garage/fire-truck-detail/add-equipment-to-fire-truck-dialog/add-equipment-to-fire-truck-dialog.component';
import { MembersModule } from '../members/members.module';
import { EquipmentModule } from '../equipment/equipment.module';

@NgModule({
  declarations: [
    HomeComponent,
    StartScreenComponent,
    DashboardComponent,
    GarageComponent,
    CallOutsComponent,
    DocsComponent,
    FireTruckDetailComponent,
    AddFireTruckDialogComponent,
    FireTruckEquipmentComponent,
    AddEquipmentToFireTruckDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MembersModule,
    EquipmentModule
  ]
})
export class HomeModule {
}
