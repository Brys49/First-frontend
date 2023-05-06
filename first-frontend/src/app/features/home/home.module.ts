import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { StartScreenComponent } from '../start-screen/start-screen.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { MembersModule } from '../members/members.module';
import { EquipmentModule } from '../equipment/equipment.module';
import { GarageModule } from '../garage/garage.module';
import { CalloutsModule } from '../callouts/callouts.module';

@NgModule({
  declarations: [
    HomeComponent,
    StartScreenComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MembersModule,
    GarageModule,
    EquipmentModule,
    CalloutsModule
  ]
})
export class HomeModule {
}
