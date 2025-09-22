import { TestBed } from '@angular/core/testing';

import { DispensingService } from './dispensing.service';

describe('DispensingService', () => {
  let service: DispensingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispensingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
