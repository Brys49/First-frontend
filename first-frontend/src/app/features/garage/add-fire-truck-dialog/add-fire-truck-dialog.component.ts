import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FireTruck } from 'src/app/core/models/fire-truck.model';
import { requiredFileType } from 'src/app/shared/file-upload-input/file-upload-input.component';

@Component({
  selector: 'app-add-fire-truck-dialog',
  templateUrl: './add-fire-truck-dialog.component.html',
  styleUrls: ['./add-fire-truck-dialog.component.scss']
})
export class AddFireTruckDialogComponent implements OnInit {
  public formGroup!: FormGroup;
  public editMode = false;
  public title!: string;
  public selectableYears: number[] = [];
  public maxDate!: Date;
  public maxYear!: number;

  get parametersData() {
    return this.data.fireTruck.parameters;
  }

  constructor(public dialogRef: MatDialogRef<AddFireTruckDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { fireTruck: FireTruck },
              private fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {
    this.editMode = this.data.fireTruck.id !== 0;
    this.title = this.editMode ? "Edit fire truck" : "Add fire truck";

    this.maxDate = new Date();
    this.maxYear = this.maxDate.getFullYear();

    for (let i = this.maxDate.getFullYear(); i >= 1900; i--) {
      this.selectableYears.push(i);
    }

    this.formGroup = this.fb.group({
      name: [this.data.fireTruck.name, [Validators.required, Validators.maxLength(120)]],
      image: [this.data.fireTruck.image, [requiredFileType('png')]],
      vin: [this.data.fireTruck.vin, [Validators.required, Validators.pattern("^[A-HJ-NPR-Za-hj-npr-z\\d]{8}[\\dX][A-HJ-NPR-Za-hj-npr-z\\d]{2}\\d{6}$")]],
      productionYear: [this.data.fireTruck.productionYear, [Validators.required]],
      licensePlate: [this.data.fireTruck.licensePlate, Validators.required],
      operationalNumber: [this.data.fireTruck.operationalNumber, [Validators.required, Validators.pattern("^[0-9]{3}[A-GK-PRSTWZ]\\d{2}$")]],
      type: [this.data.fireTruck.type, [Validators.required, Validators.pattern("^[A-z\\d]{2,8}")]],
      totalWeight: [this.data.fireTruck.totalWeight, [Validators.required, Validators.min(1)]],
      horsepower: [this.data.fireTruck.horsepower, [Validators.required, Validators.min(1)]],
      numberOfSeats: [this.data.fireTruck.numberOfSeats, [Validators.required, Validators.min(1)]],
      mileage: [this.data.fireTruck.mileage, [Validators.required, Validators.min(0)]],
      technicalReviewExpiryDate: [this.data.fireTruck.technicalReviewExpiryDate, Validators.required],
      insuranceExpiryDate: [this.data.fireTruck.insuranceExpiryDate, Validators.required],
      parameters: this.fb.array([])
    })
  }

  public save(): void {
    const parameters = new Map<string, string>(
      this.formGroup.getRawValue().parameters
        .map((i: { pName: string; pValue: string; }) => [i.pName, i.pValue]))

    const fireTruck: FireTruck = {
      id: this.data.fireTruck.id,
      name: this.formGroup.getRawValue().name,
      image: this.data.fireTruck.image,
      vin: this.formGroup.getRawValue().vin,
      productionYear: this.formGroup.getRawValue().productionYear,
      licensePlate: this.formGroup.getRawValue().licensePlate,
      operationalNumber: this.formGroup.getRawValue().operationalNumber,
      type: this.formGroup.getRawValue().type,
      totalWeight: this.formGroup.getRawValue().totalWeight,
      horsepower: this.formGroup.getRawValue().horsepower,
      numberOfSeats: this.formGroup.getRawValue().numberOfSeats,
      mileage: this.formGroup.getRawValue().mileage,
      technicalReviewExpiryDate: this.formGroup.getRawValue().technicalReviewExpiryDate,
      insuranceExpiryDate: this.formGroup.getRawValue().insuranceExpiryDate,
      parameters: parameters,
      equipment: this.data.fireTruck.equipment,
      imgUrl: this.data.fireTruck.imgUrl
    };

    if (this.formGroup.getRawValue().image) {
      const reader = new FileReader();
      reader.readAsDataURL(this.formGroup.getRawValue().image);
      reader.onload = (_event) => {
        fireTruck.image = this.formGroup.getRawValue().image;
        fireTruck.imgUrl = reader.result ? reader.result.toString() : '';

        this.dialogRef.close(fireTruck);
      }
    } else {
      this.dialogRef.close(fireTruck);
    }
  }

  public close(): void {
    this.dialogRef.close(null);
  }

}
