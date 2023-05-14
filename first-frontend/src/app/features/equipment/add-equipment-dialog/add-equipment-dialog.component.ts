import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Equipment } from 'src/app/core/models/equipment.model';
import { StorageLocation } from "../../../core/models/storage-location.model";


@Component({
  selector: 'app-add-equipment-dialog',
  templateUrl: './add-equipment-dialog.component.html',
  styleUrls: ['./add-equipment-dialog.component.scss']
})
export class AddEquipmentDialogComponent implements OnInit {
  public formGroup!: FormGroup;
  public editMode: boolean = false;
  public title!: string;
  public storageLocations: StorageLocation[] = this.data.storageLocations;

  get parametersData() {
    return this.data.equipment.parameters;
  }

  constructor(public dialogRef: MatDialogRef<AddEquipmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { equipment: Equipment, storageLocations: StorageLocation[] },
              private fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {
    this.editMode = this.data.equipment.id !== 0;
    this.title = this.editMode ? "Edit equipment" : "Add equipment";

    this.formGroup = this.fb.group({
      name: [this.data.equipment.name, [Validators.required, Validators.maxLength(120)]],
      serialNumber: [this.data.equipment.serialNumber, [Validators.maxLength(120)]],
      quantity: [this.data.equipment.quantity, [Validators.required]],
      category: [this.data.equipment.category, [Validators.required, Validators.maxLength(120)]],
      storageLocation: [this.data.equipment.storageLocation.id, [Validators.required, Validators.maxLength(120)]],
      parameters: this.fb.array([])
    })
  }

  public save(): void {
    const parameters: Map<string, string> = new Map<string, string>(
      this.formGroup.getRawValue().parameters
        .map((i: { pName: string; pValue: string; }) => [i.pName, i.pValue]))

    const storageLocation: StorageLocation | undefined = this.storageLocations.find(storageLocation =>
      storageLocation.id == this.formGroup.getRawValue().storageLocation);

    const equipment: Equipment = {
      id: this.data.equipment.id,
      name: this.formGroup.getRawValue().name,
      serialNumber: this.formGroup.getRawValue().serialNumber,
      quantity: this.formGroup.getRawValue().quantity,
      category: this.formGroup.getRawValue().category,
      storageLocation: storageLocation ? storageLocation : this.storageLocations[0],
      parameters: parameters
    };

    this.dialogRef.close(equipment);
  }

  public close(): void {
    this.dialogRef.close(null);
  }

}
