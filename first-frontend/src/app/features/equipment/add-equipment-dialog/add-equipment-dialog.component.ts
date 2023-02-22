import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Equipment } from 'src/app/core/models/equipment.model';


@Component({
  selector: 'app-add-equipment-dialog',
  templateUrl: './add-equipment-dialog.component.html',
  styleUrls: ['./add-equipment-dialog.component.scss']
})
export class AddEquipmentDialogComponent implements OnInit {
  public formGroup!: FormGroup;
  public editMode = false;
  public title!: string;

  get parameters() {
    return this.formGroup.get('parameters') as FormArray;
  }

  constructor(public dialogRef: MatDialogRef<AddEquipmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { equipment: Equipment },
              private fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {
    this.editMode = this.data.equipment.id !== 0;
    this.title = this.editMode ? "Edit equipment" : "Add equipment";

    this.formGroup = this.fb.group({
      name: [this.data.equipment.name, [Validators.required, Validators.maxLength(120)]],
      serialNumber: [this.data.equipment.serialNumber, [Validators.required, Validators.maxLength(120)]],
      storageLocation: [this.data.equipment.storageLocation, [Validators.required, Validators.maxLength(120)]],
      parameters: this.fb.array([])
    })

    for (const pName of this.data.equipment.parameters.keys()) {
      const pValue = this.data.equipment.parameters.get(pName);
      this.addParameter(pName, pValue)
    }
  }

  public save(): void {
    const parameters = new Map<string, string>(
      this.formGroup.getRawValue().parameters
        .map((i: { pName: string; pValue: string; }) => [i.pName, i.pValue]))

    const equipment: Equipment = {
      id: this.data.equipment.id,
      name: this.formGroup.getRawValue().name,
      serialNumber: this.formGroup.getRawValue().serialNumber,
      storageLocation: this.formGroup.getRawValue().storageLocation,
      parameters: parameters
    };

    this.dialogRef.close(equipment);
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  public addParameter(name = "", value = ""): void {
    this.parameters.push(
      this.fb.group({
        pName: [name, [Validators.required]],
        pValue: [value, [Validators.required]],
      })
    )
  }

}
