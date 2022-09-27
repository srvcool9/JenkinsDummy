import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from './url-formation.service';
import { UserPreferenceService } from './user-preference.service';

@Injectable({
  providedIn: 'root',
})
export class CountryListService {
  constructor(
    private http: HttpClient,
    private url: UrlFormationService,
    private userPreferenceService: UserPreferenceService
  ) {}

  public getAllCountry(): Observable<any> {
   
    return this.http.get(this.url.getCountryList());
  }
}
