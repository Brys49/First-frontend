import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Callout, CalloutType, Section } from '../../../core/models/callout.model';

@Component({
  selector: 'app-add-callout-dialog',
  templateUrl: './add-callout-dialog.component.html',
  styleUrls: ['./add-callout-dialog.component.scss']
})
export class AddCalloutDialogComponent implements OnInit {
  public formGroup!: FormGroup;
  public maxDate: Date = new Date();
  public editMode: boolean = false;
  public title!: string;
  public calloutTypes: CalloutType[] = Object.values(CalloutType);
  public hours: number[] = Array.from(Array(24).keys());
  public minutes: number[] = Array.from(Array(60).keys());

  get sectionsData(): Section[] {
    return this.data.callout.sections;
  }

  constructor(public dialogRef: MatDialogRef<AddCalloutDialogComponent>,
              private fb: NonNullableFormBuilder,
              @Inject(MAT_DIALOG_DATA) private data: { callout: Callout }) {
  }

  ngOnInit(): void {
    this.editMode = this.data.callout.id !== 0;
    this.title = this.editMode ? "Edit callout" : "Add callout";

    this.formGroup = this.fb.group({
      alarmDate: [this.data.callout.alarmDate, Validators.required],
      alarmHour: [this.data.callout.alarmDate.getHours(), Validators.required],
      alarmMinutes: [this.data.callout.alarmDate.getMinutes(), Validators.required],
      type: [this.data.callout.type, Validators.required],
      location: [this.data.callout.location, [Validators.required, Validators.maxLength(120)]],
      details: [this.data.callout.details, [Validators.required, Validators.maxLength(120)]],
      sections: this.fb.array([])
    })
  }

  public save(): void {
    const newSections: Section[] = [];

    for (const section of this.formGroup.getRawValue().sections) {
      section.departureDate.setHours(section.departureHour, section.departureMinutes);
      section.returnDate.setHours(section.returnHour, section.returnMinutes);

      const newDepartureDate: Date = new Date(section.departureDate);
      const newReturnDate: Date = new Date(section.returnDate);

      newSections.push(
        {
          fireTruckId: section.fireTruckId,
          departureDate: newDepartureDate,
          returnDate: newReturnDate,
          crewIds: section.crewIds
        });
    }

    this.formGroup.getRawValue().alarmDate.setHours(
      this.formGroup.getRawValue().alarmHour,
      this.formGroup.getRawValue().alarmMinutes);

    const newAlarmDate: Date = new Date(this.formGroup.getRawValue().alarmDate);

    const callout: Callout = {
      id: this.data.callout.id,
      alarmDate: newAlarmDate,
      type: this.formGroup.getRawValue().type,
      location: this.formGroup.getRawValue().location,
      details: this.formGroup.getRawValue().details,
      sections: newSections
    };
    this.dialogRef.close(callout);
  }

  public close(): void {
    this.dialogRef.close(null);
  }

}
