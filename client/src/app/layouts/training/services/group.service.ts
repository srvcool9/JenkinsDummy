import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../shared/services/url-formation.service';


@Injectable({
  providedIn: 'root'
})


export class GroupService {

  constructor(private url: UrlFormationService, private http: HttpClient) { }

  getTrainingGroups(): Observable<any> {
    return this.http.get(this.url.getTrainingGroup());
  }

  getTrainingSubGroups(): Observable<any> {
    return this.http.get(this.url.getTrainingSubGroup());
  }

  saveTrainingGroups(trainingGroup: any): Observable<any> {
    return this.http.post(this.url.saveTrainingGroup(), trainingGroup);
  }

  saveTrainingSubGroup(trainingSubGroup: any): Observable<any> {
    return this.http.post(this.url.saveTrainingSubGroup(), trainingSubGroup);
  }

  generateQRcode(batchCode:any):Observable<Blob>{
    return this.http.get(this.url.generateQRcode().concat(batchCode),{ responseType: 'blob' });
  }

  getSubGroupByGroupId(id:any):Observable<any>{
    return this.http.get(this.url.fetchSubGroupByGroupId()+id);
  }

  getAllTrainingList():Observable<any>{
    return this.http.get(this.url.fetchAllTrainingList());
  }
  getAllUserRespectiveTrainings(data: any):Observable<any>{
    return this.http.post(this.url.fetchAllUserRespectiveTraining(),data);
  }
  getTrainingIdDetails(id:any):Observable<any>{
    return this.http.get(this.url.fetchAllTrainingList().concat('/'+id));
  }
  
  saveTraining(training:any):Observable<any>{
    return this.http.post(this.url.saveTraining(),training);
  }

  fetchDistrictByDivisionId(id:any):Observable<any>{
    return this.http.get(this.url.fetchDistrictByDivId()+id);
  }

  fetchBlockByDistrictId(id:any):Observable<any>{
    return this.http.get(this.url.fetchBlockById()+id);
  }

  saveTrainingArea(trainingArea:any):Observable<any>{
    return this.http.post(this.url.saveTrainingArea(),trainingArea);
  }

  fetchStateList(id:any):Observable<any>{
    return this.http.get(this.url.fetchStateList()+id);
  }

  fetchTrainingAreas(id:any):Observable<any>{
    return this.http.get(this.url.fetchTrainingAreas().concat(id));
  }

  getTrainingByArea(area:any){
    return this.http.post(this.url.getTrainingByArea(),area);
  }

  getBatchesByTraining(trainingId:any):Observable<any>{
    return this.http.get(this.url.getBatchesByTraining().concat(trainingId));
  }
}
