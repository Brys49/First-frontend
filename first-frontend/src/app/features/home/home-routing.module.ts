import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GarageComponent } from '../garage/garage.component';
import { MembersComponent } from '../members/members.component';
import { EquipmentComponent } from '../equipment/equipment.component';
import { CalloutsComponent } from '../callouts/callouts.component';

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
        path: 'callouts',
        component: CalloutsComponent
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
