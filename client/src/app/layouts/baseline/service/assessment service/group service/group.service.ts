import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlFormationService } from 'src/app/layouts/shared/services/url-formation.service';
import { Group } from '../../../model/assessment model/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
 
  constructor(private url : UrlFormationService, private http : HttpClient) { }

  getGroupList(): Observable<any>{
     return this.http.get(this.url.fetchGroupList());
  }

  
   postGroup(group: Group): Observable<any> {
    return this.http.post(this.url.saveGroup(), group);
  }
}
