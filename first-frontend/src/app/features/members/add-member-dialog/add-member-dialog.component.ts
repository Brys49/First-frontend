import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Member } from '../../../core/models/member.model';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss']
})
export class AddMemberDialogComponent implements OnInit {
  public formGroup!: FormGroup;
  public maxDate: Date = new Date();
  public editMode: boolean = false;
  public title!: string;

  constructor(public dialogRef: MatDialogRef<AddMemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { member: Member },
              private fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {
    this.editMode = this.data.member.id !== 0;
    this.title = this.editMode ? "Edit member" : "Add member";

    this.formGroup = this.fb.group({
      firstname: [this.data.member.firstname, [Validators.required, Validators.maxLength(120)]],
      lastname: [this.data.member.lastname, [Validators.required, Validators.maxLength(120)]],
      birthdate: [this.data.member.birthdate, Validators.required],
      birthplace: [this.data.member.birthplace, [Validators.required, Validators.maxLength(120)]],
      idNumber: [this.data.member.idNumber, [Validators.required, Validators.maxLength(120)]],
      address: [this.data.member.address, [Validators.required, Validators.maxLength(240)]],
      joiningDate: [this.data.member.joiningDate, Validators.required],
      role: [this.data.member.role, [Validators.required, Validators.maxLength(120)]],
      phoneNumber: [this.data.member.phoneNumber, [Validators.required, Validators.pattern('(?<!\\w)(\\(?(\\+|00)?48\\)?)?[ -]?\\d{3}[ -]?\\d{3}[ -]?\\d{3}(?!\\w)')]],
      periodicExaminationsExpiryDate: [this.data.member.periodicExaminationsExpiryDate, Validators.required],
      isDriver: [this.data.member.isDriver, Validators.required],
    })
  }

  public save(): void {
    const member: Member = {
      id: this.data.member.id,
      firstname: this.formGroup.getRawValue().firstname,
      lastname: this.formGroup.getRawValue().lastname,
      birthdate: this.formGroup.getRawValue().birthdate,
      birthplace: this.formGroup.getRawValue().birthplace,
      idNumber: this.formGroup.getRawValue().idNumber,
      address: this.formGroup.getRawValue().address,
      joiningDate: this.formGroup.getRawValue().joiningDate,
      role: this.formGroup.getRawValue().role,
      phoneNumber: this.formGroup.getRawValue().phoneNumber,
      periodicExaminationsExpiryDate: this.formGroup.getRawValue().periodicExaminationsExpiryDate,
      isDriver: this.formGroup.getRawValue().isDriver,
      trainings: this.data.member.trainings
    };
    this.dialogRef.close(member);
  }

  public close(): void {
    this.dialogRef.close(null);
  }
}
