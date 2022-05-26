import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'start',
    component: StartScreenComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home/dashboard',
  },
  {
    path: '**',
    redirectTo: 'home/dashboard',
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
