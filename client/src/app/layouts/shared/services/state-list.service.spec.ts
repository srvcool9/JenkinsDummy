import { TestBed } from '@angular/core/testing';

import { StateListService } from './state-list.service';

describe('StateListService', () => {
  let service: StateListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
