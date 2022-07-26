import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MembersService } from '../../../core/services/members.service';
import { Member } from '../../../core/models/member.model';
import { Training } from '../../../core/models/training.model';
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';
import { AddTrainingDialogComponent } from '../add-training-dialog/add-training-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  public member: Member | undefined;
  public trainings: Training[] | undefined = [];
  public listContent: Map<string, any> = new Map();
  public listContentKeys: string[] = [];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private membersService: MembersService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getMember();
  }

  private getMember(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.membersService.getMember(id).subscribe(member => this.member = member);

    if (this.member) {
      this.generateContent();
    } else {
      this.goBack();
    }
  }

  private generateContent(): void {
    this.listContent.set("Joining date: ", this.member?.joiningDate.toLocaleDateString())
    this.listContent.set("PESEL: ", this.member?.pesel)
    this.listContent.set("Address: ", this.member?.address)
    this.listContent.set("City: ", this.member?.city)
    this.listContent.set("Periodic examinations expiry date: ", this.member?.periodicExaminationsExpiryDate.toLocaleDateString())
    this.listContent.set("Birthdate: ", this.member?.birthdate.toLocaleDateString())
    this.listContent.set("E-mail: ", this.member?.email)
    this.listContent.set("Phone number: ", this.member?.phoneNumber)
    this.listContentKeys = Array.from(this.listContent.keys());

    this.trainings = this.member?.trainings;
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

    dialogRef.afterClosed().subscribe(
      x => console.log("Dialog closed")
    );
  }
}
