import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../shared/services/url-formation.service';
import { Assessment } from '../model/assessment model/assessment';

@Injectable({
  providedIn: 'root'
})
export class AssementService {

  constructor(private url : UrlFormationService, private http : HttpClient) { }

  addUpdateAssesment(assesment:any): Observable<any>{
    return this.http.post(this.url.saveUpdateAssesment(),assesment);
 }


  getAssessment():Observable<any>{
    return this.http.get(this.url.getAssessment());
  }

  getAllGroups():Observable<any>{
    return this.http.get(this.url.fetchAllAssessmentGroups());
  }

  getAssessmentByGroup(id:any):Observable<any>{
    return this.http.get(this.url.fetchAssessmentByGroup().concat(id));
  }
}
