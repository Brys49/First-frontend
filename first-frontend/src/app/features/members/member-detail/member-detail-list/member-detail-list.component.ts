import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../../../core/models/member.model';

@Component({
  selector: 'app-member-detail-list',
  templateUrl: './member-detail-list.component.html',
  styleUrls: ['./member-detail-list.component.scss',
    '../../../../shared/styles/lists.scss']
})
export class MemberDetailListComponent implements OnInit {
  @Input() public member: Member = {
    id: 0,
    firstname: '',
    lastname: '',
    birthdate: new Date(),
    birthplace: '',
    idNumber: '',
    address: '',
    joiningDate: new Date(),
    role: '',
    phoneNumber: '',
    periodicMedicalExaminationExpiryDate: new Date(),
    isDriver: false,
    trainings: []
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
