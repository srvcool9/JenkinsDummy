import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../shared/services/url-formation.service';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {

  constructor(private url: UrlFormationService, private http: HttpClient) { }

  getSectionList(): Observable<any> {
    return this.http.get(this.url.getSectionList());
  }

  saveSectionList(section:any):Observable<any>{
    return this.http.post(this.url.saveSectionMaster(),section);
  }

  getSectionById(id:any):Observable<any>{
    return this.http.get(this.url.getSectionById()+"/"+id);
  }

  getScoringWeightage():Observable<any>{
    return this.http.get(this.url.getScoringWeightage());
  }

  saveScoringWeightage(weightage:any):Observable<any>{
    return this.http.post(this.url.saveScoringWeightage(),weightage);
  }

}
