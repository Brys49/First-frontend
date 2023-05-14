import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { EquipmentComponent } from './equipment.component';
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';
import { AddEquipmentDialogComponent } from './add-equipment-dialog/add-equipment-dialog.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentDetailListComponent } from './equipment-detail/equipment-detail-list/equipment-detail-list.component';
import { StorageLocationsDialogComponent } from './storage-locations-dialog/storage-locations-dialog.component';
import { StorageLocationsDialogItemComponent } from './storage-locations-dialog/storage-locations-dialog-item/storage-locations-dialog-item.component';


@NgModule({
  declarations: [
    EquipmentComponent,
    EquipmentDetailComponent,
    AddEquipmentDialogComponent,
    EquipmentListComponent,
    EquipmentDetailListComponent,
    StorageLocationsDialogComponent,
    StorageLocationsDialogItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class EquipmentModule {
}
