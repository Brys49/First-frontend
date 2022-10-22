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
      joiningDate: ['', Validators.required],
      pesel: ['', [Validators.required, Validators.pattern('^\\d{11}$')]],
      address: ['', [Validators.required, Validators.maxLength(240)]],
      city: ['', [Validators.required, Validators.maxLength(120)]],
      periodicExaminationsExpiryDate: ['', Validators.required],
      isDriver: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('(?<!\\w)(\\(?(\\+|00)?48\\)?)?[ -]?\\d{3}[ -]?\\d{3}[ -]?\\d{3}(?!\\w)')]]
    })
  }


  public save(): void {
    const member: Member = {
      id: 0,
      firstname: this.formGroup.getRawValue().firstname,
      lastname: this.formGroup.getRawValue().lastname,
      isDriver: this.formGroup.getRawValue().isDriver,
      joiningDate: this.formGroup.getRawValue().joiningDate,
      pesel: this.formGroup.getRawValue().pesel,
      address: this.formGroup.getRawValue().address,
      city: this.formGroup.getRawValue().city,
      periodicExaminationsExpiryDate: this.formGroup.getRawValue().periodicExaminationsExpiryDate,
      birthdate: this.formGroup.getRawValue().birthdate,
      email: this.formGroup.getRawValue().email,
      phoneNumber: this.formGroup.getRawValue().phoneNumber,
      trainings: []
    };

    this.membersService.addMember(member);
    this.dialogRef.close();
  }

  public close(): void {
    this.dialogRef.close();
  }

}
