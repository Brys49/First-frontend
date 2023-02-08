import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Member } from '../../../core/models/member.model';
import { MembersService } from '../../../core/services/members.service';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss']
})
export class AddMemberDialogComponent implements OnInit {
  public formGroup!: FormGroup;
  public maxDate!: Date;

  constructor(public dialogRef: MatDialogRef<AddMemberDialogComponent>,
              private fb: NonNullableFormBuilder,
              private membersService: MembersService) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();

    this.formGroup = this.fb.group({
      firstname: ['', [Validators.required, Validators.maxLength(120)]],
      lastname: ['', [Validators.required, Validators.maxLength(120)]],
      birthdate: ['', Validators.required],
      birthplace: ['', [Validators.required, Validators.maxLength(120)]],
      idNumber: ['', [Validators.required, Validators.maxLength(120)]],
      address: ['', [Validators.required, Validators.maxLength(240)]],
      joiningDate: ['', Validators.required],
      role: ['', [Validators.required, Validators.maxLength(120)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('(?<!\\w)(\\(?(\\+|00)?48\\)?)?[ -]?\\d{3}[ -]?\\d{3}[ -]?\\d{3}(?!\\w)')]],
      periodicExaminationsExpiryDate: ['', Validators.required],
      isDriver: ['', Validators.required],
    })
  }


  public save(): void {
    const member: Member = {
      id: 0,
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
      trainings: []
    };

    this.membersService.addMember(member);
    this.dialogRef.close();
  }

  public close(): void {
    this.dialogRef.close();
  }

}
