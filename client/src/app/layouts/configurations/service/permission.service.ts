import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../shared/services/url-formation.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private url : UrlFormationService, private http : HttpClient) { }


  getRolesPermissionByMenu(id:any):Observable<any>{
    return this.http.get(this.url.fetchRolesPermissionByMenu().concat(id));
  }


  saveRolesPermissionsByMenu(permission:any):Observable<any>{
    return this.http.post(this.url.saveRolesPermissionByMenu(),permission);
  }
  

  
}
