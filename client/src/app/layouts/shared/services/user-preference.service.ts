
import { Injectable } from '@angular/core';
import { ClientSideStorageService } from './client-side-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {

  constructor(private storageService: ClientSideStorageService) { }

  
  setUserPreferenceEffectiveDate(date: string) {
    if (this.storageService.checkLocalStorageSupport()) {
      this.storageService.set('effectiveDate', date);
    }
  }
  getUserPreferenceEffectiveDate() {
    const effectiveDate = this.storageService.get('effectiveDate');
    if (!effectiveDate) {
   
      this.storageService.set('effectiveDate', new Date());
    }
    return effectiveDate;
  }


}
