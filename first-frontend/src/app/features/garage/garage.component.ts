import { Component, OnInit } from '@angular/core';
import { FireTruck } from '../../core/models/fire-truck.model';
import { FireTrucksService } from '../../core/services/fire-trucks.service';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {
  public fireTrucks: FireTruck[] = [];

  constructor(public fireTrucksService: FireTrucksService) {
  }

  ngOnInit(): void {
    this.getFireTrucks();
  }

  public openDialog(): void {

  }

  private getFireTrucks(): void {
    this.fireTrucksService.getFireTrucks()
      .subscribe(fireTrucks => this.fireTrucks = fireTrucks);
  }

}
