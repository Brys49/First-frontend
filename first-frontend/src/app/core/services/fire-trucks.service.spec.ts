import { TestBed } from '@angular/core/testing';

import { FireTrucksService } from './fire-trucks.service';

describe('FireTrucksService', () => {
  let service: FireTrucksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireTrucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
