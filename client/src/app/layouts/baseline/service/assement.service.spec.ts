import { TestBed } from '@angular/core/testing';

import { AssementService } from './assement.service';

describe('AssementService', () => {
  let service: AssementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
