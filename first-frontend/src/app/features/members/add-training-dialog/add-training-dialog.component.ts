import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Training, TrainingType } from '../../../core/models/training.model';
import { MembersService } from '../../../core/services/members.service';

@Component({
  selector: 'app-add-training-dialog',
  templateUrl: './add-training-dialog.component.html',
  styleUrls: ['./add-training-dialog.component.scss']
})
export class AddTrainingDialogComponent implements OnInit {
  private memberId!: number;
  private allTrainingTypes = Object.values(TrainingType);
  public formGroup!: FormGroup;
  public maxDate!: Date;
  public remainingTrainingTypes: TrainingType[] = [];

  constructor(public dialogRef: MatDialogRef<AddTrainingDialogComponent>,
              private fb: NonNullableFormBuilder,
              private membersService: MembersService,
              @Inject(MAT_DIALOG_DATA) private data: number) {}

  ngOnInit(): void {
    this.maxDate = new Date();
    this.memberId = Number(Object.values(this.data));

    this.formGroup = this.fb.group({
      id: ['', Validators.required],
      trainingDate: ['', Validators.required],
      expirationDate: [''],
      type: ['', Validators.required]
    })
    this.loadRemainingTrainingTypes();
  }

  public save(): void {
    const training: Training = {
      id: this.formGroup.getRawValue().id,
      trainingDate: this.formGroup.getRawValue().trainingDate,
      expirationDate: this.formGroup.getRawValue().expirationDate,
      type: this.formGroup.getRawValue().type
    };

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
