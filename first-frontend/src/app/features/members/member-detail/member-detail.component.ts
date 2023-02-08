import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MembersService } from '../../../core/services/members.service';
import { Member } from '../../../core/models/member.model';
import { TrainingType } from '../../../core/models/training.model';
import { AddTrainingDialogComponent } from '../add-training-dialog/add-training-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  private memberId: number = 0;
  public member!: Member;
  public listContent: Map<string, any> = new Map();
  public listContentKeys: string[] = [];
  public editMode: boolean = false;
  public maxDate!: Date;
  public formGroup!: FormGroup;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private membersService: MembersService,
    private fb: NonNullableFormBuilder,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.memberId = Number(this.route.snapshot.paramMap.get('id'));
    this.getMember();
  }

  private getMember(): void {
    this.membersService.getMember(this.memberId).subscribe(member => this.member = member);

    if (this.member) {
      this.generateContent();
    } else {
      this.goBack();
    }
  }

  private generateContent(): void {
    this.listContent.set("Birthdate: ", this.member.birthdate.toLocaleDateString());
    this.listContent.set("Birthplace: ", this.member.birthplace);
    this.listContent.set("ID Number: ", this.member.idNumber);
    this.listContent.set("Address: ", this.member.address);
    this.listContent.set("Joining date: ", this.member.joiningDate.toLocaleDateString());
    this.listContent.set("Role: ", this.member.role);
    this.listContent.set("Phone number: ", this.member.phoneNumber);
    this.listContent.set("Periodic Examinations Expiry Date: ", this.member.periodicExaminationsExpiryDate.toLocaleDateString());
    this.listContentKeys = Array.from(this.listContent.keys());
  }

  public goBack(): void {
    this.router.navigateByUrl('/home/members');
  }

  public deleteMember(id: number): void {
    this.membersService.deleteMember(id);
    this.goBack();
  }

  public openDialog(id: number): void {
    const dialogRef = this.dialog.open(AddTrainingDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-training-dialog-panel',
      autoFocus: true,
      disableClose: true,
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  public deleteTraining(type: TrainingType): void {
    this.membersService.deleteTraining(this.memberId, type);
  }

  public edit(): void {
    this.formGroup = this.fb.group({
      birthdate: [this.member.birthdate, Validators.required],
      birthplace: [this.member.birthplace, [Validators.required, Validators.maxLength(240)]],
      idNumber: [this.member.idNumber, [Validators.required, Validators.maxLength(120)]],
      address: [this.member.address, [Validators.required, Validators.maxLength(240)]],
      joiningDate: [this.member.joiningDate, Validators.required],
      role: [this.member.role, [Validators.required, Validators.maxLength(120)]],
      phoneNumber: [this.member.phoneNumber, [Validators.required, Validators.pattern('(?<!\\w)(\\(?(\\+|00)?48\\)?)?[ -]?\\d{3}[ -]?\\d{3}[ -]?\\d{3}(?!\\w)')]],
      periodicExaminationsExpiryDate: [this.member.periodicExaminationsExpiryDate, Validators.required],
      isDriver: [this.member.isDriver, Validators.required],
    });

    this.editMode = !this.editMode;
  }

  public save(): void {
    this.editMode = false;
    const updatedMember: Member = {
      id: this.memberId,
      firstname: this.member.firstname,
      lastname: this.member.lastname,
      birthdate: this.formGroup.getRawValue().birthdate,
      birthplace: this.formGroup.getRawValue().birthplace,
      idNumber: this.formGroup.getRawValue().idNumber,
      address: this.formGroup.getRawValue().address,
      joiningDate: this.formGroup.getRawValue().joiningDate,
      role: this.formGroup.getRawValue().role,
      phoneNumber: this.formGroup.getRawValue().phoneNumber,
      periodicExaminationsExpiryDate: this.formGroup.getRawValue().periodicExaminationsExpiryDate,
      isDriver: this.formGroup.getRawValue().isDriver,
      trainings: this.member.trainings
    };

    this.membersService.deleteMember(this.memberId);
    this.membersService.addMember(updatedMember);
    this.ngOnInit();
  }

  public close(): void {
    this.editMode = false;
  }
}
