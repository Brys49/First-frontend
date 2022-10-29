import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Equipment } from 'src/app/core/models/equipment.model';
import { EquipmentService } from 'src/app/core/services/equipment.service';

@Component({
  selector: 'app-add-equipment-dialog',
  templateUrl: './add-equipment-dialog.component.html',
  styleUrls: ['./add-equipment-dialog.component.scss']
})
export class AddEquipmentDialogComponent implements OnInit {
  public formGroup!: FormGroup;
  public paramInputs: Map<string, string> = new Map;
  public paramInputsKeys: string[] = [];
  private parametersCounter: number = 0;

  constructor(public dialogRef: MatDialogRef<AddEquipmentDialogComponent>,
              private fb: NonNullableFormBuilder,
              private equipmentService: EquipmentService) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(120)]],
      price: [0, [Validators.required, Validators.min(0)]],
      serialNumber: ['', [Validators.required, Validators.maxLength(120)]]
    })
  }

  public save(): void {
    const parameters = new Map<string, string>();
    for (let i = 0; i < this.parametersCounter; i++) {
      const keyName = "paramKey" + i;
      const parameter = this.formGroup.get(keyName)?.value;
      const valueName = "paramValue" + i;
      const value = this.formGroup.get(valueName)?.value;

      parameters.set(parameter, value);
    }

    const equipment: Equipment = {
      id: 0,
      name: this.formGroup.getRawValue().name,
      price: this.formGroup.getRawValue().price,
      serialNumber: this.formGroup.getRawValue().serialNumber,
      parameters: parameters
    };

    this.equipmentService.addEquipment(equipment);
    this.dialogRef.close();
  }

  public close(): void {
    this.dialogRef.close();
  }

  public addParameter(): void {
    const keyName = "paramKey" + this.parametersCounter;
    const valueName = "paramValue" + this.parametersCounter;
    this.parametersCounter += 1;
    this.formGroup.addControl(
      keyName, new FormControl('', [Validators.required, Validators.minLength(3)])
    );
    this.formGroup.addControl(
      valueName, new FormControl('', [Validators.required, Validators.minLength(1)])
    );

    this.paramInputs.set(keyName, valueName);
    this.paramInputsKeys = Array.from(this.paramInputs.keys());
  }

}
