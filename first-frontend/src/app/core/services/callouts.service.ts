import { Injectable } from '@angular/core';
import { Callout } from '../models/callout.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CALLOUTS } from './mock-callouts';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CalloutsService {
  callouts: Callout[] = [];
  private toDisplayDetails: BehaviorSubject<number> = new BehaviorSubject(0);
  private toDisplayDetails$: Observable<number> = this.toDisplayDetails.asObservable();

  get toDisplayDetailsEvent(): Observable<number> {
    return this.toDisplayDetails$;
  }

  constructor(private router: Router) {
    this.callouts.push(CALLOUTS[0])
    this.callouts.push(CALLOUTS[1])
    this.callouts.push(CALLOUTS[2])
  }

  getCallouts(): Observable<Callout[]> {
    return of(this.callouts);
  }

  getCallout(id: number): Observable<Callout> {
    const callout: Callout = this.callouts.find(callout => callout.id === id)!;
    return of(callout);
  }

  addCallout(callout: Callout): void {
    callout.id = (this.callouts.length + 2) * 2;
    this.callouts.push(callout);
  }

  updateCallout(callout: Callout): void {
    this.deleteCallout(callout.id);
    this.callouts.push(callout);
  }

  deleteCallout(id: number): void {
    const index: number = this.callouts.map(callout => callout.id).indexOf(id);
    this.callouts.splice(index, 1);
  }

  getMemberCallouts(id: number): Observable<Callout[]> {
    const memberCallouts: Callout[] = this.callouts.filter(callout => callout.sections.some(
      section => section.crewIds.includes(id)
    ));
    return of(memberCallouts);
  }

  getFireTruckCallouts(id: number): Observable<Callout[]> {
    const fireTruckCallouts: Callout[] = this.callouts.filter(callout => callout.sections.some(
      section => section.fireTruckId == id
    ));
    return of(fireTruckCallouts);
  }

  showDetails(id: number): void {
    this.router.navigateByUrl("/home/callouts");
    this.toDisplayDetails.next(id);
  }

}
