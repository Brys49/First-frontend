import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { Section } from "../../../../core/models/callout.model";
import { FireTruck } from "../../../../core/models/fire-truck.model";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { FireTrucksService } from "../../../../core/services/fire-trucks.service";
import { MembersService } from '../../../../core/services/members.service';
import { Member } from '../../../../core/models/member.model';

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
  public remainingMembers: Member[][] = [];

  private fireTrucks: FireTruck[] = [];
  private members: Member[] = [];
  private _destroy$: Subject<void> = new Subject<void>();

  get sections() {
    return this.formGroup.get('sections') as FormArray;
  }

  constructor(private fb: NonNullableFormBuilder,
              private fireTrucksService: FireTrucksService,
              private membersService: MembersService) {
  }

  ngOnInit(): void {
    this.sectionsData.forEach(section => {
      this.addSection(section.fireTruckId, section.departureDate, section.returnDate, section.crewIds)
    })

    this.getFireTrucks();
    this.updateRemainingFireTrucks();

    this.getMembers();
    this.updateRemainingMembers();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
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
        crewIds: [crewIds, [Validators.required]]
      }, {validators: checkIfReturnDateAfterDepartureDate})
    );

    const selectedFireTrucksId: number[] = [];
    const selectedMembersId: number[] = [];

    this.sections.controls.forEach(s => {
      selectedFireTrucksId.push(s.getRawValue().fireTruckId)
      selectedMembersId.push(...s.getRawValue().crewIds);
    });

    const freeFireTrucks: FireTruck[] = this.fireTrucks.filter(fireTruck => !(selectedFireTrucksId.includes(fireTruck.id)));
    const freeMembers: Member[] = this.members.filter(member => !(selectedMembersId.includes(member.id)));

    this.remainingFireTrucks.push(freeFireTrucks);
    this.remainingMembers.push(freeMembers);
  }

  public removeSection(i: number): void {
    this.sections.removeAt(i);
    this.remainingFireTrucks.splice(i, 1);
    this.remainingMembers.splice(i, 1);
    this.updateRemainingFireTrucks();
    this.updateRemainingMembers();
  }

  public updateRemainingFireTrucks(): void {
    const selectedFireTrucksId: number[] = [];
    this.sections.controls.forEach(s => {
      selectedFireTrucksId.push(s.getRawValue().fireTruckId);
    })

    for (let i: number = 0; i < this.remainingFireTrucks.length; i++) {
      this.remainingFireTrucks[i] = this.fireTrucks.filter(
        fireTruck => !(selectedFireTrucksId.includes(fireTruck.id))
          || fireTruck.id == this.sections.controls[i].getRawValue().fireTruckId);
    }
  }

  public updateRemainingMembers(): void {
    const selectedMembersId: number[] = [];
    this.sections.controls.forEach(s => {
      selectedMembersId.push(...s.getRawValue().crewIds);
    });

    for (let i = 0; i < this.remainingMembers.length; i++) {
      this.remainingMembers[i] = this.members.filter(
        member => !(selectedMembersId.includes(member.id))
          || this.sections.controls[i].getRawValue().crewIds.includes(member.id));
    }
  }

  private getFireTrucks(): void {
    this.fireTrucksService.getFireTrucks().pipe(
      takeUntil(this._destroy$)
    ).subscribe(fireTrucks => this.fireTrucks = fireTrucks);
  }

  private getMembers(): void {
    this.membersService.getMembers().pipe(
      takeUntil(this._destroy$)
    ).subscribe(members => this.members = members);
  }
}

export const checkIfReturnDateAfterDepartureDate: ValidatorFn = (control: AbstractControl):
  ValidationErrors | null => {
  const departureDate = control.getRawValue().departureDate;
  const departureHour = control.getRawValue().departureHour;
  const departureMinutes = control.getRawValue().departureMinutes;
  const returnDate = control.getRawValue().returnDate;
  const returnHour = control.getRawValue().returnHour;
  const returnMinutes = control.getRawValue().returnMinutes;

  departureDate.setHours(departureHour, departureMinutes);
  returnDate.setHours(returnHour, returnMinutes);

  return returnDate < departureDate ? {returnBeforeDeparture: true} : null;
}
