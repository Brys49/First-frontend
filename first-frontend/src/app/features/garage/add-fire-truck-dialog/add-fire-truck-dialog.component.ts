import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {FireTruck} from 'src/app/core/models/fire-truck.model';
import {FireTrucksService} from 'src/app/core/services/fire-trucks.service';
import {requiredFileType} from 'src/app/shared/file-upload-input/file-upload-input.component';

@Component({
  selector: 'app-add-fire-truck-dialog',
  templateUrl: './add-fire-truck-dialog.component.html',
  styleUrls: ['./add-fire-truck-dialog.component.scss']
})
export class AddFireTruckDialogComponent implements OnInit {
  public formGroup!: FormGroup;
  public selectableYears: number[] = [];
  public maxDate!: Date;
  public maxYear!: number;
  public paramInputs: Map<string, string> = new Map;
  public paramInputsKeys: string[] = [];
  private parametersCounter: number = 0;

  constructor(public dialogRef: MatDialogRef<AddFireTruckDialogComponent>,
              private fb: NonNullableFormBuilder,
              private fireTrucksService: FireTrucksService) {
  }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxYear = this.maxDate.getFullYear();

    for (let i = 1900; i <= this.maxDate.getFullYear(); i++) {
      this.selectableYears.push(i);
    }

    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(120)]],
      image: [null, [Validators.required, requiredFileType('png')]],
      price: [0, [Validators.required, Validators.min(0)]],
      vin: ['', [Validators.required, Validators.pattern("^[A-HJ-NPR-Za-hj-npr-z\\d]{8}[\\dX][A-HJ-NPR-Za-hj-npr-z\\d]{2}\\d{6}$")]],
      productionYear: [this.maxYear, [Validators.required]],
      operationalNumber: ['', [Validators.required, Validators.pattern("^[0-9]{3}[A-GK-PRSTWZ]\\d{2}$")]],
      type: ['', [Validators.required, Validators.pattern("^[A-z\\d]{2,8}")]],
      horsepower: [0, [Validators.required, Validators.min(1)]],
      numberOfSeats: [0, [Validators.required, Validators.min(1)]],
      mileage: [0, [Validators.required, Validators.min(0)]]
    })
  }

  public save(): void {
    const parameters = new Map<string, string>();
    for (let i = 0; i < this.parametersCounter; i++) {
      const keyName = "paramKey" + i;
      const parameter = this.formGroup.get(keyName)?.value;
      const valueName = "paramValue" + i;
      const value = this.formGroup.get(valueName)?.value;

      parameters.set(parameter, value);
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.formGroup.getRawValue().image);
    reader.onload = (_event) => {
      const fireTruck: FireTruck = {
        id: 0,
        name: this.formGroup.getRawValue().name,
        image: this.formGroup.getRawValue().image,
        price: this.formGroup.getRawValue().price,
        vin: this.formGroup.getRawValue().vin,
        productionYear: this.formGroup.getRawValue().productionYear,
        operationalNumber: this.formGroup.getRawValue().operationalNumber,
        type: this.formGroup.getRawValue().type,
        horsepower: this.formGroup.getRawValue().horsepower,
        numberOfSeats: this.formGroup.getRawValue().numberOfSeats,
        mileage: this.formGroup.getRawValue().mileage,
        parameters: parameters,
        equipment: [],
        imgUrl: reader.result ? reader.result.toString() : ""
      };
      this.fireTrucksService.addFireTruck(fireTruck);
      this.dialogRef.close();
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public addParameter(): void {
    const keyName = "paramKey" + this.parametersCounter;
    const valueName = "paramValue" + this.parametersCounter;
    this.parametersCounter += 1;
    this.formGroup.addControl(
      keyName, new FormControl('', [Validators.required, Validators.minLength(3)])
    );
    this.formGroup.addControl(
      valueName, new FormControl('', [Validators.required, Validators.minLength(1)])
    );

    this.paramInputs.set(keyName, valueName);
    this.paramInputsKeys = Array.from(this.paramInputs.keys());
  }

}
