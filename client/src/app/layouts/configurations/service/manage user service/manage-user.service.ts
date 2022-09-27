import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlFormationService } from 'src/app/layouts/shared/services/url-formation.service';
@Injectable({
  providedIn: 'root',
})
export class ManageUserService {
  private userData = new BehaviorSubject<any>([]);
  private editUserData = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private url: UrlFormationService) {}

  setUserData(param: any): void {
    this.userData.next(param);
  }

  getUserData(): Observable<any> {
    return this.userData.asObservable();
  }

  setEditUserData(param: any): void {
    this.editUserData.next(param);
  }

  getEditUserData(): Observable<any> {
    return this.editUserData.asObservable();
  }

  getUserDataById(empCode): Observable<any> {
    return this.http.get(this.url.fetchEmpByEmpCode().concat(empCode));
  }

  getDivisionData(): Observable<any> {
    return this.http.get(this.url.fetchAllDivision());
  }

  getDistrictData(id): Observable<any> {
    return this.http.get(this.url.fetchDistrictByDivId().concat(id));
  }

  getBlockData(id): Observable<any> {
    return this.http.get(this.url.fetchBlockById().concat(id));
  }

  getSchoolByBlockId(id:any):Observable<any>{
    return this.http.get(this.url.fetchSchoolByBlockId().concat(id));
  }

  getClusterData(id): Observable<any> {
    return this.http.get(this.url.fetchClusterById().concat(id));
  }

  getSchoolData(id): Observable<any> {
    return this.http.get(this.url.fetchSchoolById().concat(id));
  }

  getRoleArea(userId, roleId): Observable<any> {
    return this.http.get(
      this.url
        .fetchNavByUserRoleId()
        .concat(userId)
        .concat('/' + roleId)
    );
  }

  addRoleAssociation(areaList: any): Observable<any> {
    return this.http.post(this.url.saveRoleAssosciation(), areaList);
  }

}

