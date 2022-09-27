import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../../../layouts/shared/services/url-formation.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient, private url : UrlFormationService) { }

  getNavigationMenu(userId,roleId): Observable<any>{
    
      return this.http.get(this.url.fetchNavigationMenu().concat("/"+userId+"/"+roleId));
  }
  getAllNavigationMenu(): Observable<any>{
    
    return this.http.get(this.url.fetchNavigationMenu());
}

  loginUser(user:any) : Observable<any>{
  return this.http.post(this.url.fetchjwtToken(),user);
  }

  getRoleArea(userId,roleId):Observable<any>{
    return this.http.get(this.url.fetchRoleArea().concat(userId+'/'+roleId));
  }

  getJavaToken(userName:any):Observable<any> {
  return this.http.get(this.url.getJavaToken().concat(userName));
  //return this.http.get('http://localhost:9092/Token/GetToken/'+userName)
  }

}
