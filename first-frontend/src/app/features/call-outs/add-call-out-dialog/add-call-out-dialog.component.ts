import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {CallOut, CallOutType, Section} from '../../../core/models/call-out.model';

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

  get sectionsData() {
    return this.data.callOut.sections;
  }

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
      type: [this.data.callOut.type, Validators.required],
      location: [this.data.callOut.location, [Validators.required, Validators.maxLength(120)]],
      details: [this.data.callOut.details, [Validators.required, Validators.maxLength(120)]],
      sections: this.fb.array([])
    })
  }

  public save(): void {
    const newSections: Section[] = [];

    for (const s of this.formGroup.getRawValue().sections) {
      const fireTruckId = s.fireTruckId;
      const departureDate = s.departureDate;
      departureDate.setHours(s.departureHour, s.departureMinutes);

      const returnDate = s.returnDate;
      returnDate.setHours(s.returnHour, s.returnMinutes);

      const newDepartureDate = new Date(departureDate);
      const newReturnDate = new Date(returnDate);

      newSections.push(
        {
          fireTruckId: fireTruckId,
          departureDate: newDepartureDate,
          returnDate: newReturnDate,
          crewIds: []
        }
      )
    }

    const alarmDate = this.formGroup.getRawValue().alarmDate;
    alarmDate.setHours(this.formGroup.getRawValue().alarmHour,
      this.formGroup.getRawValue().alarmMinutes);

    const newAlarmDate = new Date(alarmDate);

    const callOut: CallOut = {
      id: this.data.callOut.id,
      alarmDate: newAlarmDate,
      type: this.formGroup.getRawValue().type,
      location: this.formGroup.getRawValue().location,
      details: this.formGroup.getRawValue().details,
      sections: newSections
    };
    this.dialogRef.close(callOut);
  }

  public close(): void {
    this.dialogRef.close(null);
  }

}
