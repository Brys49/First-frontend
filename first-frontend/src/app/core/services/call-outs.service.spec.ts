import { TestBed } from '@angular/core/testing';

import { CallOutsService } from './call-outs.service';

describe('CallOutsService', () => {
  let service: CallOutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallOutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
