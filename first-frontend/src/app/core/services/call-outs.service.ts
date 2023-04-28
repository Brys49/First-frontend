import { Injectable } from '@angular/core';
import { CallOut } from '../models/call-out.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CALL_OUTS } from './mock-call-outs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CallOutsService {
  callOuts: CallOut[] = [];
  private toDisplayDetails: BehaviorSubject<number> = new BehaviorSubject(0);
  private toDisplayDetails$: Observable<number> = this.toDisplayDetails.asObservable();

  get toDisplayDetailsEvent(): Observable<number> {
    return this.toDisplayDetails$;
  }

  constructor(private router: Router) {
    this.callOuts.push(CALL_OUTS[0])
    this.callOuts.push(CALL_OUTS[1])
    this.callOuts.push(CALL_OUTS[2])
  }

  getCallOuts(): Observable<CallOut[]> {
    return of(this.callOuts);
  }

  getCallOut(id: number): Observable<CallOut> {
    const callOut = this.callOuts.find(c => c.id === id)!;
    return of(callOut);
  }

  addCallOut(callOut: CallOut): void {
    callOut.id = (this.callOuts.length + 2) * 2;
    this.callOuts.push(callOut);
  }

  updateCallOut(callOut: CallOut): void {
    this.deleteCallOut(callOut.id);
    this.callOuts.push(callOut);
  }

  deleteCallOut(id: number): void {
    const index = this.callOuts.map(x => x.id).indexOf(id);

    this.callOuts.splice(index, 1);
  }

  getMemberCallOuts(id: number): Observable<CallOut[]> {
    const memberCallOuts = this.callOuts.filter(c => c.sections.some(
      s => s.crewIds.includes(id)
    ));
    return of(memberCallOuts);
  }

  getFireTruckCallOuts(id: number): Observable<CallOut[]> {
    const fireTruckCallOuts = this.callOuts.filter(c => c.sections.some(
      s => s.fireTruckId == id
    ));
    return of(fireTruckCallOuts);
  }

  showDetails(id: number): void {
    this.router.navigateByUrl("/home/call-outs");
    this.toDisplayDetails.next(id);
  }

}
