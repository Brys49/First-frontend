import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CallOut, CallOutType } from '../../../core/models/call-out.model';

@Component({
  selector: 'app-add-call-out-dialog',
  templateUrl: './add-call-out-dialog.component.html',
  styleUrls: ['./add-call-out-dialog.component.scss']
})
export class AddCallOutDialogComponent implements OnInit {
  public formGroup!: FormGroup;
  public maxDate: Date = new Date();
  public editMode = false;
  public title!: string;
  public callOutTypes = Object.values(CallOutType);

  constructor(public dialogRef: MatDialogRef<AddCallOutDialogComponent>,
              private fb: NonNullableFormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: { callOut: CallOut }) {
  }

  ngOnInit(): void {
    this.editMode = this.data.callOut.id !== 0;
    this.title = this.editMode ? "Edit call out" : "Add call out";

    this.formGroup = this.fb.group({
      alarmDate: [this.data.callOut.alarmDate, Validators.required],
      departureDate: [this.data.callOut.departureDate, Validators.required],
      returnDate: [this.data.callOut.returnDate, Validators.required],
      type: [this.data.callOut.type, Validators.required],
      location: [this.data.callOut.location, [Validators.required, Validators.maxLength(120)]],
      details: [this.data.callOut.details, [Validators.required, Validators.maxLength(120)]],
    })
  }

  public save(): void {
    const callOut: CallOut = {
      id: this.data.callOut.id,
      alarmDate: this.formGroup.getRawValue().alarmDate,
      departureDate: this.formGroup.getRawValue().departureDate,
      returnDate: this.formGroup.getRawValue().returnDate,
      type: this.formGroup.getRawValue().type,
      location: this.formGroup.getRawValue().location,
      details: this.formGroup.getRawValue().details,
      fireTrucksInAction: [],
      membersInAction: [],
    };
    this.dialogRef.close(callOut);
  }

  public close(): void {
    this.dialogRef.close(null);
  }

}
