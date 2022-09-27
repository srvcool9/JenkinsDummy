import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../shared/services/url-formation.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient, private url : UrlFormationService) { }

  getTrainersByBatchId(Id:any):Observable<any>{
    return this.http.get(this.url.getTrainersByBatchId()+"/"+Id);
  }


  getTraineesByBatchId(id:any):Observable<any>{
    return this.http.get(this.url.getTraineesByBatchId()+"/"+id);
  }

  getTrainersByBatchForAttendance(batchId:any):Observable<any>{
    return this.http.get(this.url.getTrainersByBatchForAttendance()+"/"+batchId);
  }
  saveTraineeAttendance(traineeAttendance: any): Observable<any> {
    return this.http.post(this.url.saveTraineeAttendance(), traineeAttendance);
  }


  saveTrainerAttendance(trainerAttendance: any): Observable<any> {
    return this.http.post(this.url.saveTrainerAttendance(), trainerAttendance);
  }
}
