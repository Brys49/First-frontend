import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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

  get sectionsData(): Section[] {
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
