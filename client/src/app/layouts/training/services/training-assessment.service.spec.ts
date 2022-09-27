import { TestBed } from '@angular/core/testing';

import { TrainingAssessmentService } from './training-assessment.service';

describe('TrainingAssessmentService', () => {
  let service: TrainingAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
