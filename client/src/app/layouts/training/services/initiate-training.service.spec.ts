import { TestBed } from '@angular/core/testing';

import { InitiateTrainingService } from './initiate-training.service';

describe('InitiateTrainingService', () => {
  let service: InitiateTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitiateTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
