import { TestBed } from '@angular/core/testing';

import { LaunchTrainingService } from './launch-training.service';

describe('LaunchTrainingService', () => {
  let service: LaunchTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaunchTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
