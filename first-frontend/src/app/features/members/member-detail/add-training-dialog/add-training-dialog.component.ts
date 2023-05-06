import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Training, TrainingType } from '../../../../core/models/training.model';
import { MembersService } from '../../../../core/services/members.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-training-dialog',
  templateUrl: './add-training-dialog.component.html',
  styleUrls: ['./add-training-dialog.component.scss']
})
export class AddTrainingDialogComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup;
  public maxDate: Date = new Date();
  public remainingTrainingTypes: TrainingType[] = [];

  private memberId!: number;
  private allTrainingTypes: TrainingType[] = Object.values(TrainingType);
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<AddTrainingDialogComponent>,
              private fb: NonNullableFormBuilder,
              private membersService: MembersService,
              @Inject(MAT_DIALOG_DATA) private data: number) {
  }

  ngOnInit(): void {
    this.memberId = Number(Object.values(this.data));

    this.formGroup = this.fb.group({
      type: ['', Validators.required],
      id: ['', Validators.required],
      trainingDate: ['', Validators.required],
      expirationDate: ['']
    });

    this.loadRemainingTrainingTypes();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public save(): void {
    const training: Training = {
      type: this.formGroup.getRawValue().type,
      id: this.formGroup.getRawValue().id,
      trainingDate: this.formGroup.getRawValue().trainingDate,
      expirationDate: this.formGroup.getRawValue().expirationDate
    };

    this.membersService.addTraining(this.memberId, training);
    this.dialogRef.close();
  }

  public close(): void {
    this.dialogRef.close();
  }

  private loadRemainingTrainingTypes(): void {
    let memberTrainingTypes: TrainingType[] = [];
    this.membersService.getMember(this.memberId).pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      member => {
        for (let training of member.trainings) {
          memberTrainingTypes.push(training.type)
        }
      });

    this.remainingTrainingTypes = this.allTrainingTypes.filter((type) => !memberTrainingTypes.includes(type));
  }
}
