import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../shared/services/url-formation.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingAssessmentService {

  constructor(private url: UrlFormationService, private http: HttpClient) { }

  getAllTrainingAssessment(): Observable<any> {
    return this.http.get(this.url.getAllTrainingAssessment());
  }


  saveTrainingAssessment(trainingAssmt:any):Observable<any>{
    return this.http.post(this.url.saveTrainingAssessment(),trainingAssmt);
  }

  getTraineeByEmpCode(empId:any):Observable<any>{
    return this.http.get(this.url.getTraineeByEmpCode()+"/"+empId);
  }


}
