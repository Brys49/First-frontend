import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../../core/models/member.model';
import { MembersService } from '../../../core/services/members.service';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss']
})
export class AddMemberDialogComponent implements OnInit {
  formGroup: FormGroup;
  maxDate: Date;

  constructor(public dialogRef: MatDialogRef<AddMemberDialogComponent>,
              private fb: FormBuilder,
              private membersService: MembersService) {
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

  ngOnInit(): void {
  }


  public save(): void {
    const member = new Member(
      0,
      this.formGroup.getRawValue().firstname,
      this.formGroup.getRawValue().lastname,
      this.formGroup.getRawValue().joiningDate,
      this.formGroup.getRawValue().pesel,
      this.formGroup.getRawValue().address,
      this.formGroup.getRawValue().city,
      this.formGroup.getRawValue().periodicExaminationsExpiryDate,
      this.formGroup.getRawValue().isDriver,
      this.formGroup.getRawValue().birthdate,
      this.formGroup.getRawValue().email,
      this.formGroup.getRawValue().phoneNumber,
      []
    );
    this.membersService.addMember(member);
    this.dialogRef.close();
  }

  public close(): void {
    this.dialogRef.close();
  }

}
