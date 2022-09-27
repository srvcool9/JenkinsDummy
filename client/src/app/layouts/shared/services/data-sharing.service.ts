import { Injectable } from '@angular/core';
import { SystemUser } from '../../../views/pages/model/system-user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';
import { UrlFormationService } from './url-formation.service';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  systemUserData: SystemUser;

  systemUser = new SystemUser();
  step = new BehaviorSubject<any>([]);
  res1 = new BehaviorSubject<any>([]);
  otp = new BehaviorSubject<any>([]);
  data = new BehaviorSubject<any>([]);
  batchCode = new BehaviorSubject<any>('');

  private globalEditData = new BehaviorSubject<any>([]);

  private systemUsers = new BehaviorSubject('');

  private loginFlag = new BehaviorSubject<any>([]);

  private navigableMenu = new BehaviorSubject<any>([]);

  private navigationMenuId = new BehaviorSubject<any>([]);

  private navItems = new BehaviorSubject<any>([]);

  private sectionName = new BehaviorSubject<any>('');

  constructor(
    private storageService: SessionStorageService,
    private http: HttpClient,
    private url: UrlFormationService
  ) {}

  setSectionName(param:any){
    this.sectionName.next(param);
  }

  getSectionName(){
    return this.sectionName.asObservable();
  }


  setStep(param: any) {
    this.otp.next(param);
  }

  getStep() {
    return this.otp.asObservable();
  }

  setBatchCode(param: any) {
    this.batchCode.next(param);
  }

  getBatchCode() {
    return this.batchCode.asObservable();
  }

  setNavItems(param: any) {
    this.navItems.next(param);
  }

  getNavItems() {
    return this.navItems.asObservable();
  }

  setNavigationMenuId(param: any) {
    this.navigableMenu.next(param);
  }

  getNavigationMenuId() {
    return this.navigableMenu.asObservable();
  }

  setGlobalEditData(param: any) {
    this.globalEditData.next(param);
  }

  getGlobalEditData() {
    return this.globalEditData.asObservable();
  }

  setOTP(param: any) {
    this.otp.next(param);
  }

  getOTP() {
    return this.otp.asObservable();
  }

  setSystemUser(systemUser: SystemUser) {}

  setMenuList(param: any): void {
    this.navigableMenu.next(param);
  }
  getMenuList(): Observable<any> {
    return this.navigableMenu.asObservable();
  }
  setToken(token: String) {
    this.data.next(token);
  }
  getToken(): Observable<any> {
    return this.data.asObservable();
  }

  getSystemUser(): Observable<any> {
    return this.systemUsers.asObservable();
  }

  setLoginFlag(value) {
    this.loginFlag.next(value);
  }

  getLoginFlag(): Observable<any> {
    return this.loginFlag.asObservable();
  }

  setNavPermissions(data: any) {
    this.res1 = data;
  }

  getNavPermission(): Observable<any> {
    return this.res1.asObservable();
  }

  fetchEntityById(id: any): Observable<any> {
    return this.http.get(this.url.fetchEntityById().concat(id));
  }
}
