import { Injectable } from '@angular/core';
import { CallOut } from '../models/call-out.model';
import { Observable, of } from 'rxjs';
import { CALL_OUTS } from './mock-call-outs';

@Injectable({
  providedIn: 'root'
})
export class CallOutsService {
  callOuts: CallOut[] = [];

  constructor() {
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
    const index = this.callOuts.map(x => {
      return x.id;
    }).indexOf(id);

    this.callOuts.splice(index, 1);
  }
}
