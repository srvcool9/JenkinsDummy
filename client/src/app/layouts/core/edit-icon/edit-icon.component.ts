import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ICellEditorAngularComp,
  ICellRendererAngularComp,
} from 'ag-grid-angular';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GroupService } from '../../baseline/service/assessment service/group service/group.service';
import { Permission } from '../../configurations/model/manage role model/permission';
import { UserRoleService } from '../../configurations/service/manage role service/user-role.service';
import { DataSharingService } from '../../shared/services/data-sharing.service';
@Component({
  selector: 'app-edit-icon',
  templateUrl: './edit-icon.component.html',
  styleUrls: ['./edit-icon.component.scss'],
})
export class EditIconComponent implements ICellRendererAngularComp {
  params: any;
  edit: boolean = false;
  data: any;
  enableEdit: Boolean = false;
  loggedInUserPermissionData: any;
  type: string;
  id:number;
  allRolesFromParent;
  
  constructor(
    private router: Router,
    private userRoleService: UserRoleService,
    private ngZone: NgZone,
    private groupService: GroupService,
    private dataSharingService: DataSharingService,
  ) {
    this.data = this.dataSharingService.getNavItems();
    this.loggedInUserPermissionData = this.data.source._value;
  }
  agInit(params: any): void {
    this.params = params;
    this.checkPermission(params.type);
  }

  refresh(params?: any): boolean {
    return true;
  }

  onEditIconClick($event, link, type) {
    this.ngZone.run(() => {
      this.router.navigate([link]);
    });
    if (this.params.onEditIconClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.dataSharingService.setGlobalEditData(this.params.node.data);
      this.userRoleService.setAddRoleId(1);
      this.params.onEditIconClick(params);
    }
  }

  navigate(link) {
    this.ngZone.run(() => {
      this.router.navigate([link, this.params.value]);
    });
  }

  checkPermission(type) {
   let permissions = new Permission();
    if (type === 'role') {
      permissions =
        this.loggedInUserPermissionData[0].children[1].permission;
      if (permissions.edit === true) {
        this.enableEdit = true;
      }
    }
    else if(type=== 'userrole'){
      permissions =
      this.loggedInUserPermissionData[0].children[0].permission;
      if (permissions.edit === true) {
        this.enableEdit = true;
      }
    }
    else if(type==='group'){
      permissions =
      this.loggedInUserPermissionData[1].children[0].children[0].permission;
      if (permissions.edit === true) {
        this.enableEdit = true;
      }
    }
  }

 
}
