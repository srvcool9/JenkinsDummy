import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../shared/services/url-formation.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceVerificationService {

  constructor(private http: HttpClient, private url : UrlFormationService) { }

  saveTrainerAttendanceVerification(trainerAttendance: any): Observable<any> {
    return this.http.post(this.url.saveTrainerAttendanceVerification(), trainerAttendance);
  }

  getTraineeAttendanceListByBatchId(id:any):Observable<any>{
    return this.http.get(this.url.getTraineeAttendaceListByBatchId()+"/"+id);
  }

  saveTraineeAttendanceVerification(traineeAttendance: any): Observable<any> {
    return this.http.post(this.url.saveTraineeAttendanceVerification(), traineeAttendance);
  }

  getTrainerAttendanceByBatchId(id:any):Observable<any>{
    return this.http.get(this.url.getTrainerAttendanceByBatchId()+"/"+id);
  }

  saveRedFlag(redFlag:any): Observable<any> {
    return this.http.post(this.url.saveRedFlag(), redFlag);
  }
}
