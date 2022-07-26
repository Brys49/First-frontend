import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss']
})
export class AddMemberDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddMemberDialogComponent>,
              private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      joiningDate: ['', Validators.required],
      pesel: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      periodicExaminationsExpiryDate: ['', Validators.required],
      isDriver: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],

    })
  }

  ngOnInit(): void {
  }


  public save() {
    this.dialogRef.close(this.formGroup.value);
  }

  public close() {
    this.dialogRef.close();
  }

}
