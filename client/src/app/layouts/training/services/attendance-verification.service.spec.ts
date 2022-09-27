import { TestBed } from '@angular/core/testing';

import { AttendanceVerificationService } from './attendance-verification.service';

describe('AttendanceVerificationService', () => {
  let service: AttendanceVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
