import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageLocation } from "../../../../core/models/storage-location.model";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { EquipmentService } from "../../../../core/services/equipment.service";

@Component({
  selector: 'app-storage-locations-dialog-item',
  templateUrl: './storage-locations-dialog-item.component.html',
  styleUrls: ['./storage-locations-dialog-item.component.scss']
})
export class StorageLocationsDialogItemComponent implements OnInit {
  @Input() public storageLocation: StorageLocation = {
    name: '',
    default: false,
    onFireTruck: false
  };
  @Output() public inEditModeEvent: EventEmitter<number> = new EventEmitter<number>();
  public formGroup!: FormGroup;
  public editMode: boolean = false;


  constructor(private fb: NonNullableFormBuilder,
              private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: [this.storageLocation.name, [Validators.required]]
    });

    if (this.storageLocation.name == '') {
      this.editMode = true;
    }
  }

  public toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.editMode ? this.inEditModeEvent.emit(1) : this.inEditModeEvent.emit(-1);
  }

  public save(): void {
    const newName = this.formGroup.getRawValue().name;
    this.equipmentService.editStorageLocation(this.storageLocation.name, newName);
    this.toggleEditMode();
  }

  public cancel(): void {
    this.toggleEditMode();
    this.ngOnInit();
  }

  public deleteStorageLocation(): void {
    this.equipmentService.deleteStorageLocation(this.storageLocation.name);
  }

  public setAsDefault(): void {
    this.equipmentService.changeDefaultStorageLocation(this.storageLocation);
  }

}
