import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageComponent } from './garage.component';
import { FireTruckDetailComponent } from './fire-truck-detail/fire-truck-detail.component';
import { AddFireTruckDialogComponent } from './add-fire-truck-dialog/add-fire-truck-dialog.component';
import { FireTruckEquipmentComponent } from './fire-truck-detail/fire-truck-equipment/fire-truck-equipment.component';
import {
  AddEquipmentToFireTruckDialogComponent
} from './fire-truck-detail/add-equipment-to-fire-truck-dialog/add-equipment-to-fire-truck-dialog.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { GarageListComponent } from './garage-list/garage-list.component';
import { FireTruckDetailListComponent } from './fire-truck-detail/fire-truck-detail-list/fire-truck-detail-list.component';


@NgModule({
  declarations: [
    GarageComponent,
    FireTruckDetailComponent,
    AddFireTruckDialogComponent,
    FireTruckEquipmentComponent,
    AddEquipmentToFireTruckDialogComponent,
    GarageListComponent,
    FireTruckDetailListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class GarageModule {
}
