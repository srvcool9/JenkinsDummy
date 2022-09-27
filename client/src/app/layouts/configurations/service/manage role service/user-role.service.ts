import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlFormationService } from 'src/app/layouts/shared/services/url-formation.service';
import { RoleModulePermission } from '../../model/manage role model/role-module-permission.model';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  private selectedRoledata = new BehaviorSubject<any>([]);
  role: any;
  roleIsActive: any;
  verify: boolean = false;
  private id = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient, private url: UrlFormationService) {}

  setRoleData(param: any): void {
    this.selectedRoledata.next(param);
  }

  getRoleData(): Observable<any> {
    return this.selectedRoledata.asObservable();
  }

  setAddRoleId(param: any): void {
    this.id.next(param);
  }

  getAddRoleId(): Observable<any> {
    return this.id.asObservable();
  }

  postUserRoleData(
    roleModulePermission: RoleModulePermission
  ): Observable<any> {
    return this.http.post(
      this.url.saveUserRolePermission(),
      roleModulePermission,
      { responseType: 'text' }
    );
  }

  getAllRoleData(): Observable<any> {
    return this.http.get(this.url.fetchAllRole());
  }

  getAllRoleType(): Observable<any> {
    return this.http.get(this.url.fetchAllRoleType());
  }

  getModuleSubModulePermission(): Observable<any> {
    return this.http.get(this.url.fetchAllRolePermission());
  }

  getUserRoleById(id): Observable<any> {
    return this.http.get(this.url.fetchAllRolePermission().concat('/' + id));
  }

  getRoleExists(roleName: string): Observable<any> {
    return this.http.get(this.url.testRoleExistence().concat(roleName));
  }

  //collect data from edit button
  editRoleData(data): Observable<any> {
    this.role = data.rowData;
    this.verify = true;
    return this.role;
  }

  switchRoleData(data): Observable<any> {
    this.roleIsActive = data.rowData.isActive;
    this.verify = true;
    return this.roleIsActive;
  }

  changeRoleStatus(type,status,roleId:number,userId:any):Observable<any>{
   return this.http.get(this.url.changeRoleStatus().concat(type+'/'+status+'/'+roleId+'/'+userId));
  }

  deleteUserRole(type,roleId,userId):Observable<any>{
     return this.http.get(this.url.deleteUserRole().concat(type+'/'+roleId+'/'+userId));
  }
}
