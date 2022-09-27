import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../shared/services/url-formation.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient, private url:UrlFormationService) { }

fetchReport(reportId,assmtId):Observable<any>{
  return this.http.get(this.url.getReport().concat(reportId+'/'+assmtId));
}
  
  fetchAssessmentByGroupId(id:any):Observable<any>{
    return this.http.get(this.url.getAssessmentsByGroupId().concat(id));
  }
}
