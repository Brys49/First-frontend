import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Section } from '../../../../core/models/call-out.model';
import { FireTruck } from '../../../../core/models/fire-truck.model';
import { Member } from '../../../../core/models/member.model';
import { MembersService } from '../../../../core/services/members.service';
import { FireTrucksService } from '../../../../core/services/fire-trucks.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-call-out-detail-section',
  templateUrl: './call-out-detail-section.component.html',
  styleUrls: ['./call-out-detail-section.component.scss',
    '../../../../shared/styles/lists.scss']
})
export class CallOutDetailSectionComponent implements OnInit, OnDestroy {
  @Input() public section: Section = {
    fireTruckId: 0,
    departureDate: new Date(),
    returnDate: new Date(),
    crewIds: []
  }
  @Input() public sectionNumber: number = -1;

  public fireTruck!: FireTruck;
  public crew: Member[] = [];
  public isFirst: boolean = false;

  private _destroy$ = new Subject<void>();

  constructor(private fireTrucksService: FireTrucksService,
              private membersService: MembersService) {
  }

  ngOnInit(): void {
    this.isFirst = (this.sectionNumber === 0);
    this.getFireTruck();
    this.getCrew();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  private getFireTruck(): void {
    this.fireTrucksService.getFireTruck(this.section.fireTruckId).pipe(
      takeUntil(this._destroy$)
    ).subscribe(ft => this.fireTruck = ft)
  }

  private getCrew(): void {
    for (let mId of this.section.crewIds) {
      this.membersService.getMember(mId).pipe(
        takeUntil(this._destroy$)
      ).subscribe(m => this.crew.push(m))
    }
  }

}
