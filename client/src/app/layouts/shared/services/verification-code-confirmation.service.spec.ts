import { TestBed } from '@angular/core/testing';

import { VerificationCodeConfirmationService } from './verification-code-confirmation.service';

describe('VerificationCodeConfirmationService', () => {
  let service: VerificationCodeConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificationCodeConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
