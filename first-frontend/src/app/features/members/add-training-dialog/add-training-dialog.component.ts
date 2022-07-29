import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Training, TrainingType } from '../../../core/models/training.model';
import { MembersService } from '../../../core/services/members.service';

@Component({
  selector: 'app-add-training-dialog',
  templateUrl: './add-training-dialog.component.html',
  styleUrls: ['./add-training-dialog.component.scss']
})
export class AddTrainingDialogComponent implements OnInit {
  formGroup: FormGroup;
  maxDate: Date;
  memberId: number;
  allTrainingTypes = Object.values(TrainingType);
  remainingTrainingTypes: TrainingType[] = [];

  constructor(public dialogRef: MatDialogRef<AddTrainingDialogComponent>,
              private fb: FormBuilder,
              private membersService: MembersService,
              @Inject(MAT_DIALOG_DATA) private data: number) {
    this.maxDate = new Date();
    this.memberId = Number(Object.values(this.data));

    this.formGroup = this.fb.group({
      trainingDate: ['', Validators.required],
      expirationDate: [''],
      type: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadRemainingTrainingTypes();
  }

  public save(): void {
    const training = new Training(
      this.formGroup.getRawValue().trainingDate,
      this.formGroup.getRawValue().expirationDate,
      this.formGroup.getRawValue().type,
    );

    this.membersService.addTraining(this.memberId, training);
    this.dialogRef.close();
  }

  public close(): void {
    this.dialogRef.close();
  }

  private loadRemainingTrainingTypes(): void {
    let memberTrainingTypes: TrainingType[] = [];
    this.membersService.getMember(this.memberId).subscribe(
      member => {
        for (let training of member.trainings) {
          memberTrainingTypes.push(training.type)
        }
      });

    this.remainingTrainingTypes = this.allTrainingTypes.filter((type) => !memberTrainingTypes.includes(type));
  }

}
