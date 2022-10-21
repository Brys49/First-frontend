import { Component, OnInit } from '@angular/core';
import { FireTruck } from 'src/app/core/models/fire-truck.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FireTrucksService } from 'src/app/core/services/fire-trucks.service';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-fire-truck-detail',
  templateUrl: './fire-truck-detail.component.html',
  styleUrls: ['./fire-truck-detail.component.scss']
})
export class FireTruckDetailComponent implements OnInit {
  private fireTruckId: number = 0;
  private tempParamInputs: Map<string, string> = new Map;
  private tempParamInputsKeys: string[] = [];
  public fireTruck!: FireTruck;
  public listContent: Map<string, any> = new Map();
  public listContentKeys: string[] = [];
  public editMode: boolean = false;
  public formGroup!: FormGroup;
  public selectableYears: number[] = [];
  public maxDate!: Date;
  public maxYear!: number;
  public paramInputs: Map<string, string> = new Map;
  public paramInputsKeys: string[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fireTrucksService: FireTrucksService,
              private fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxYear = this.maxDate.getFullYear();

    for (let i = 1900; i <= this.maxDate.getFullYear(); i++) {
      this.selectableYears.push(i);
    }

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
    this.listContent.clear();
    this.listContent.set("Price", this.fireTruck.price);
    this.listContent.set("VIN", this.fireTruck.vin);
    this.listContent.set("Production year", this.fireTruck.productionYear);
    this.listContent.set("Operational number", this.fireTruck.operationalNumber);
    this.listContent.set("Type", this.fireTruck.type);
    this.listContent.set("Horsepower", this.fireTruck.horsepower);
    this.listContent.set("Number of seats", this.fireTruck.numberOfSeats);
    this.listContent.set("Mileage", this.fireTruck.mileage);
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
    if (this.editMode) {
      this.close();
      return;
    } else {
      this.editMode = true;
      this.tempParamInputs = new Map(this.paramInputs);
      this.tempParamInputsKeys = this.paramInputsKeys.slice();
    }

    this.formGroup = this.fb.group({
      price: [this.fireTruck.price, [Validators.required, Validators.min(0)]],
      vin: [this.fireTruck.vin, [Validators.required, Validators.pattern("^[A-HJ-NPR-Za-hj-npr-z\\d]{8}[\\dX][A-HJ-NPR-Za-hj-npr-z\\d]{2}\\d{6}$")]],
      productionYear: [this.fireTruck.productionYear, [Validators.required]],
      operationalNumber: [this.fireTruck.operationalNumber, [Validators.required, Validators.pattern("^[0-9]{3}[A-GK-PRSTWZ]\\d{2}$")]],
      type: [this.fireTruck.type, [Validators.required, Validators.pattern("^[A-z\\d]{2,8}")]],
      horsepower: [this.fireTruck.horsepower, [Validators.required, Validators.min(1)]],
      numberOfSeats: [this.fireTruck.numberOfSeats, [Validators.required, Validators.min(1)]],
      mileage: [this.fireTruck.mileage, [Validators.required, Validators.min(0)]]
    });

    let parametersCounter = 0;
    this.paramInputs.clear();
    for (let paramKey of this.fireTruck.parameters.keys()) {
      const keyName = "paramKey" + parametersCounter;
      const valueName = "paramValue" + parametersCounter;
      parametersCounter += 1;
      this.formGroup.addControl(
        keyName, new FormControl(paramKey, [Validators.required, Validators.minLength(3)])
      );
      this.formGroup.addControl(
        valueName, new FormControl(this.fireTruck.parameters.get(paramKey), [Validators.required, Validators.minLength(1)])
      );

      this.paramInputs.set(keyName, valueName);
      this.paramInputsKeys = Array.from(this.paramInputs.keys());
    }

  }

  public addParameter(): void {
    let parametersCounter = this.paramInputsKeys.length;

    const keyName = "paramKey" + parametersCounter;
    const valueName = "paramValue" + parametersCounter;

    this.formGroup.addControl(
      keyName, new FormControl('', [Validators.required, Validators.minLength(3)])
    );
    this.formGroup.addControl(
      valueName, new FormControl('', [Validators.required, Validators.minLength(1)])
    );

    this.paramInputs.set(keyName, valueName);
    this.paramInputsKeys = Array.from(this.paramInputs.keys());
  }

  public save(): void {
    this.editMode = false;

    const parameters = new Map<string, string>();
    for (let i = 0; i < this.paramInputsKeys.length; i++) {
      const keyName = "paramKey" + i;
      const parameter = this.formGroup.get(keyName)?.value;
      const valueName = "paramValue" + i;
      const value = this.formGroup.get(valueName)?.value;

      parameters.set(parameter, value);
    }

    const updatedFireTruck: FireTruck = {
      id: this.fireTruckId,
      name: this.fireTruck.name,
      image: this.fireTruck.image,
      price: this.formGroup.getRawValue().price,
      vin: this.formGroup.getRawValue().vin,
      productionYear: this.formGroup.getRawValue().productionYear,
      operationalNumber: this.formGroup.getRawValue().operationalNumber,
      type: this.formGroup.getRawValue().type,
      horsepower: this.formGroup.getRawValue().horsepower,
      numberOfSeats: this.formGroup.getRawValue().numberOfSeats,
      mileage: this.formGroup.getRawValue().mileage,
      parameters: parameters,
      equipment: this.fireTruck.equipment,
      imgUrl: this.fireTruck.imgUrl
    };

    this.fireTrucksService.deleteFireTruck(this.fireTruckId);
    this.fireTrucksService.addFireTruck(updatedFireTruck);
    this.ngOnInit();
  }

  public close(): void {
    this.editMode = false;
    this.paramInputs = new Map(this.tempParamInputs);
    this.paramInputsKeys = this.tempParamInputsKeys.slice();
  }
}
