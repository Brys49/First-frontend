import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GarageComponent } from '../garage/garage.component';
import { MembersComponent } from '../members/members.component';
import { EquipmentComponent } from '../equipment/equipment.component';
import { DocsComponent } from '../docs/docs.component';
import { CallOutsComponent } from '../call-outs/call-outs.component';
import { MemberDetailComponent } from '../members/member-detail/member-detail.component';
import { FireTruckDetailComponent } from '../garage/fire-truck-detail/fire-truck-detail.component';
import { EquipmentDetailComponent } from '../equipment/equipment-detail/equipment-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'members',
        component: MembersComponent
      },
      {
        path: 'garage',
        component: GarageComponent
      },
      {
        path: 'equipment',
        component: EquipmentComponent
      },
      {
        path: 'call-outs',
        component: CallOutsComponent
      },
      {
        path: 'docs',
        component: DocsComponent
      },
      {
        path: 'members/detail/:id',
        component: MemberDetailComponent,
      },
      {
        path: 'garage/detail/:id',
        component: FireTruckDetailComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'home/dashboard',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
