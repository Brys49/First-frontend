import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { Section } from "../../../../core/models/call-out.model";
import { FireTruck } from "../../../../core/models/fire-truck.model";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { FireTrucksService } from "../../../../core/services/fire-trucks.service";

@Component({
  selector: 'app-add-section-form',
  templateUrl: './add-section-form.component.html',
  styleUrls: ['./add-section-form.component.scss']
})
export class AddSectionFormComponent implements OnInit, OnDestroy {
  @Input() public formGroup: FormGroup = new FormGroup<any>([]);
  @Input() public sectionsData: Section[] = [];

  public maxDate: Date = new Date();
  public hours: number[] = Array.from(Array(24).keys());
  public minutes: number[] = Array.from(Array(60).keys());
  public remainingFireTrucks: FireTruck[][] = [];

  private fireTrucks: FireTruck[] = [];
  private _destroy$ = new Subject<void>();

  get sections() {
    return this.formGroup.get('sections') as FormArray;
  }

  constructor(private fb: NonNullableFormBuilder,
              private fireTrucksService: FireTrucksService) {
  }

  ngOnInit(): void {
    for (const s of this.sectionsData) {
      this.addSection(s.fireTruckId, s.departureDate, s.returnDate, s.crewIds)
    }

    this.getFireTrucks();
    this.updateRemainingFireTrucks();
  }

  public addSection(fireTruckId: number = 0,
                    departureDate: Date = new Date(),
                    returnDate: Date = new Date(),
                    crewIds: number[] = []): void {
    this.sections.push(
      this.fb.group({
        fireTruckId: [fireTruckId, [Validators.required]],
        departureDate: [departureDate, Validators.required],
        departureHour: [departureDate.getHours(), Validators.required],
        departureMinutes: [departureDate.getMinutes(), Validators.required],
        returnDate: [returnDate, Validators.required],
        returnHour: [returnDate.getHours(), Validators.required],
        returnMinutes: [returnDate.getMinutes(), Validators.required],
        crewIds: ["", [Validators.required]]
      })
    );

    const selectedFireTrucksId: number[] = [];
    for (let s of this.sections.controls) {
      selectedFireTrucksId.push(s.getRawValue().fireTruckId);
    }
    const fts = this.fireTrucks.filter(ft => !(selectedFireTrucksId.includes(ft.id)));

    this.remainingFireTrucks.push(fts);
  }

  public removeSection(i: number): void {
    this.sections.removeAt(i);
    this.remainingFireTrucks.splice(i, 1);
    this.updateRemainingFireTrucks();
  }

  public updateRemainingFireTrucks(): void {
    const selectedFireTrucksId: number[] = [];
    for (let s of this.sections.controls) {
      selectedFireTrucksId.push(s.getRawValue().fireTruckId);
    }

    for (let i = 0; i < this.remainingFireTrucks.length; i++) {
      this.remainingFireTrucks[i] = this.fireTrucks.filter(
        ft => !(selectedFireTrucksId.includes(ft.id))
          || ft.id == this.sections.controls[i].getRawValue().fireTruckId);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  private getFireTrucks(): void {
    this.fireTrucksService.getFireTrucks().pipe(
      takeUntil(this._destroy$)
    ).subscribe(fireTrucks => this.fireTrucks = fireTrucks);
  }

}
