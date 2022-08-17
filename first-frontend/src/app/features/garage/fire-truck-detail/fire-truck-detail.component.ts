import { Component, OnInit } from '@angular/core';
import { FireTruck } from 'src/app/core/models/fire-truck.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FireTrucksService } from 'src/app/core/services/fire-trucks.service';

@Component({
  selector: 'app-fire-truck-detail',
  templateUrl: './fire-truck-detail.component.html',
  styleUrls: ['./fire-truck-detail.component.scss']
})
export class FireTruckDetailComponent implements OnInit {
  private fireTruckId: number = 0;
  public fireTruck!: FireTruck;
  public listContent: Map<string, any> = new Map();
  public listContentKeys: string[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fireTrucksService: FireTrucksService) {
  }

  ngOnInit(): void {
    this.fireTruckId = Number(this.route.snapshot.paramMap.get('id'));
    this.getFireTruck();
  }

  private getFireTruck(): void {
    this.fireTrucksService.getFireTruck(this.fireTruckId).subscribe(
      fireTruck => this.fireTruck = fireTruck
    );

    if (this.fireTruck) {
      this.generateContent();
    } else {
      this.goBack();
    }
  }

  private generateContent(): void {
    this.listContent.set("Price: ", this.fireTruck.price);
    this.listContent.set("VIN: ", this.fireTruck.vin);
    this.listContent.set("Production year: ", this.fireTruck.productionYear);
    this.listContent.set("Operational number: ", this.fireTruck.operationalNumber);
    this.listContent.set("Type: ", this.fireTruck.type);
    this.listContent.set("Horsepower: ", this.fireTruck.horsepower);
    this.listContent.set("Number of seats: ", this.fireTruck.numberOfSeats);
    this.listContent.set("Mileage: ", this.fireTruck.mileage);
    for (let paramKey of this.fireTruck.parameters.keys()) {
      this.listContent.set(paramKey, this.fireTruck.parameters.get(paramKey));
    }
    this.listContentKeys = Array.from(this.listContent.keys());
  }

  public goBack(): void {
    this.router.navigateByUrl('/home/garage');
  }

  public deleteFireTruck(id: number): void {
    this.fireTrucksService.deleteFireTruck(id);
    this.goBack();
  }

  public edit(): void {

  }
}
