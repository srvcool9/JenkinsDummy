import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../../views/pages/login/services/login.service';
import { navItems } from './_nav';
import { DataSharingService } from '../../layouts/shared/services/data-sharing.service';
import * as _ from 'lodash';
import { LoggedinUserData } from '../../views/pages/login/model/loggedin-user-data.model';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  loggedinUserData = new LoggedinUserData();
  userData: any;
  roleArea: any;
  roleList = [];
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  @Input() sidebarId: string = 'sidebar';
  chooseLanguage = 'Choose Language';
  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor(
    private _loginService: LoginService,
    private dataSharing: DataSharingService,
    private translateService: TranslateService,
    private clientStorage: ClientSideStorageService,
    private router: Router
  ) {
    this.userData = JSON.parse(this.clientStorage.get('loggedInUser'));
    this.roleList = this.userData.user.roles;
    this.roleList.sort((a, b) => a.roleTypeId - b.roleTypeId);
    this.userId = this.userData.user.userId;
    this.userData = JSON.parse(this.clientStorage.get('loggedInUser'));
    const roleId = this.clientStorage.get('roleId');
    const batchCode = this.clientStorage.get('batchCode');
    const userId = this.clientStorage.get('userId');
    this.getNavigableMenu(Number(userId), this.roleList[0].roleId);
  }

  id: number;
  userId: number;
  selectedAttributes: any;
  ngOnInit(): void {
    this.selectedAttributes = this.roleList[0].roleId;
  }

  onSelectedRole(e) {
    this.getNavigableMenu(Number(this.userId), Number(e.roleId));
    this.router.navigate(['/dashboard']);
  }

  // public selectedRole(event:any){
  //   console.log(event.target.value);
  //   this.dataSharing.setNavigationMenuId(parseInt(event.target.value));

  // }

  logout() {
    this.clientStorage.delete('user');
    this.clientStorage.delete('JavaToken');
    this.router.navigate(['/']);
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }

  getNavigableMenu(userId?, roleId?) {
    this._loginService.getNavigationMenu(userId, roleId).subscribe((data) => {
      if (data && data !== null) {
      let child = [];
      this.navItems = data.navigableMenu;
      this.dataSharing.setNavItems(this.navItems);
      this.dataSharing.setMenuList(data.employeeRoleArea);
      this.navItems = _.orderBy(this.navItems, 'displayOrder', 'asc');
      setTimeout(() => {}, 10);
      }
    });
  }
}
