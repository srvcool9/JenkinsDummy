import { TestBed } from '@angular/core/testing';

import { NotificationAlertService } from './notification-alert.service';

describe('NotificationAlertService', () => {
  let service: NotificationAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationAlertService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
