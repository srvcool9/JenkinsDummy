import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../shared/services/url-formation.service';

@Injectable({
  providedIn: 'root'
})
export class LaunchTrainingService {

  constructor(private url: UrlFormationService,private http:HttpClient) { }

  getTrainingBySubGroupId(subGrpId:any):Observable<any>{
    return this.http.get(this.url.getTrainingBySubGroupId()+"/"+subGrpId);
  }

}
