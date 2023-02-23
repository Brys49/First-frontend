import { Component, Input, OnInit } from '@angular/core';
import { FireTruck } from '../../../../core/models/fire-truck.model';

@Component({
  selector: 'app-fire-truck-detail-list',
  templateUrl: './fire-truck-detail-list.component.html',
  styleUrls: ['./fire-truck-detail-list.component.scss',
    '../../../../shared/styles/lists.scss']
})
export class FireTruckDetailListComponent implements OnInit {
  @Input() public fireTruck: FireTruck = {
    id: 0,
    name: '',
    image: null,
    vin: '',
    productionYear: 0,
    licensePlate: '',
    operationalNumber: '',
    type: '',
    totalWeight: 0,
    horsepower: 0,
    numberOfSeats: 0,
    mileage: 0,
    technicalReviewExpiryDate: new Date(),
    insuranceExpiryDate: new Date(),
    parameters: new Map<string, string>(),
    equipment: [],
    imgUrl: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
