import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
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
  public editMode: boolean = false;
  public title!: string;
  public callOutTypes: CallOutType[] = Object.values(CallOutType);
  public hours: number[] = Array.from(Array(24).keys());
  public minutes: number[] = Array.from(Array(60).keys());

  constructor(public dialogRef: MatDialogRef<AddCallOutDialogComponent>,
              private fb: NonNullableFormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: { callOut: CallOut }) {
  }

  ngOnInit(): void {
    this.editMode = this.data.callOut.id !== 0;
    this.title = this.editMode ? "Edit call out" : "Add call out";

    this.formGroup = this.fb.group({
      alarmDate: [this.data.callOut.alarmDate, Validators.required],
      alarmHour: [this.data.callOut.alarmDate.getHours(), Validators.required],
      alarmMinutes: [this.data.callOut.alarmDate.getMinutes(), Validators.required],
      departureDate: [this.data.callOut.departureDate, Validators.required],
      departureHour: [this.data.callOut.departureDate.getHours(), Validators.required],
      departureMinutes: [this.data.callOut.departureDate.getMinutes(), Validators.required],
      returnDate: [this.data.callOut.returnDate, Validators.required],
      returnHour: [this.data.callOut.returnDate.getHours(), Validators.required],
      returnMinutes: [this.data.callOut.returnDate.getMinutes(), Validators.required],
      type: [this.data.callOut.type, Validators.required],
      location: [this.data.callOut.location, [Validators.required, Validators.maxLength(120)]],
      details: [this.data.callOut.details, [Validators.required, Validators.maxLength(120)]],
    })
  }

  public save(): void {
    const alarmDate = this.formGroup.getRawValue().alarmDate;
    alarmDate.setHours(this.formGroup.getRawValue().alarmHour,
      this.formGroup.getRawValue().alarmMinutes);

    const departureDate = this.formGroup.getRawValue().departureDate;
    departureDate.setHours(this.formGroup.getRawValue().departureHour,
      this.formGroup.getRawValue().departureMinutes);

    const returnDate = this.formGroup.getRawValue().returnDate;
    returnDate.setHours(this.formGroup.getRawValue().returnHour,
      this.formGroup.getRawValue().returnMinutes);

    const newAlarmDate = new Date(alarmDate);
    const newDepartureDate = new Date(departureDate);
    const newReturnDate = new Date(returnDate);

    const callOut: CallOut = {
      id: this.data.callOut.id,
      alarmDate: newAlarmDate,
      departureDate: newDepartureDate,
      returnDate: newReturnDate,
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
