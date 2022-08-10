import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MembersService } from '../../../core/services/members.service';
import { Member } from '../../../core/models/member.model';
import { TrainingType } from '../../../core/models/training.model';
import { AddTrainingDialogComponent } from '../add-training-dialog/add-training-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public maxDate: Date;
  public formGroup!: FormGroup;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private membersService: MembersService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.maxDate = new Date();

  }

  ngOnInit(): void {
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
    this.listContent.set("Joining date: ", this.member.joiningDate.toLocaleDateString())
    this.listContent.set("PESEL: ", this.member.pesel)
    this.listContent.set("Address: ", this.member.address)
    this.listContent.set("City: ", this.member.city)
    this.listContent.set("Periodic examinations expiry date: ", this.member.periodicExaminationsExpiryDate.toLocaleDateString())
    this.listContent.set("Birthdate: ", this.member.birthdate.toLocaleDateString())
    this.listContent.set("E-mail: ", this.member.email)
    this.listContent.set("Phone number: ", this.member.phoneNumber)
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
      isDriver: [this.member.isDriver, Validators.required],
      joiningDate: [this.member.joiningDate, Validators.required],
      pesel: [this.member.pesel, [Validators.required, Validators.pattern('^\\d{11}$')]],
      address: [this.member.address, [Validators.required, Validators.maxLength(240)]],
      city: [this.member.city, [Validators.required, Validators.maxLength(120)]],
      periodicExaminationsExpiryDate: [this.member.periodicExaminationsExpiryDate, Validators.required],
      birthdate: [this.member.birthdate, Validators.required],
      email: [this.member.email, [Validators.required, Validators.email]],
      phoneNumber: [this.member.phoneNumber, [Validators.required, Validators.pattern('(?<!\\w)(\\(?(\\+|00)?48\\)?)?[ -]?\\d{3}[ -]?\\d{3}[ -]?\\d{3}(?!\\w)')]]
    })

    this.editMode = !this.editMode;
  }

  public save(): void {
    this.editMode = false;
    const updatedMember: Member = {
      id: this.memberId,
      firstname: this.member.firstname,
      lastname: this.member.lastname,
      isDriver: this.formGroup.getRawValue().isDriver,
      joiningDate: this.formGroup.getRawValue().joiningDate,
      pesel: this.formGroup.getRawValue().pesel,
      address: this.formGroup.getRawValue().address,
      city: this.formGroup.getRawValue().city,
      periodicExaminationsExpiryDate: this.formGroup.getRawValue().periodicExaminationsExpiryDate,
      birthdate: this.formGroup.getRawValue().birthdate,
      email: this.formGroup.getRawValue().email,
      phoneNumber: this.formGroup.getRawValue().phoneNumber,
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
