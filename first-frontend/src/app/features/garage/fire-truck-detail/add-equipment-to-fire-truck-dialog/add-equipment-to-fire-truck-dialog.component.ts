import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Equipment } from '../../../../core/models/equipment.model';

@Component({
  selector: 'app-add-equipment-to-fire-truck-dialog',
  templateUrl: './add-equipment-to-fire-truck-dialog.component.html',
  styleUrls: ['./add-equipment-to-fire-truck-dialog.component.scss']
})
export class AddEquipmentToFireTruckDialogComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddEquipmentToFireTruckDialogComponent>,
              private fb: NonNullableFormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: { remainingEquipment: Equipment[] }) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({})
    for (let e of this.data.remainingEquipment) {
      this.formGroup.addControl(
        String(e.id), new FormControl(false)
      )
    }
  }

  public save(): void {
    const result = [];
    for (let e of this.data.remainingEquipment) {
      if (this.formGroup.controls[e.id].value) {
        result.push(e.id)
      }
    }
    this.dialogRef.close(result);
  }

  public close(): void {
    this.dialogRef.close([]);
  }

}
