import { TestBed } from '@angular/core/testing';

import { ClientSideStorageService } from './client-side-storage.service';

describe('ClientSideStorageService', () => {
  let service: ClientSideStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSideStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
