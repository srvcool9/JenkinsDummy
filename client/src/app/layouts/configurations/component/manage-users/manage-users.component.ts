import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions, GridApi, FirstDataRenderedEvent } from 'ag-grid-community';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { EditIconComponent } from 'src/app/layouts/core/edit-icon/edit-icon.component';
import { SwitchComponent } from 'src/app/layouts/core/switch/switch.component';
import { ViewAreaComponent } from 'src/app/layouts/core/view-area/view-area.component';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { CommonUtilService } from '../../../../../utils/common-util.service';
import { ManageUser } from '../../model/manage role model/manage-user.model';
import { Permission } from '../../model/manage role model/permission';
import { ManageUserService } from '../../service/manage user service/manage-user.service';

declare const $: any;

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  loanFilter;
  gridApi: GridApi;
  employeeDesignation;
  data: any = [];
  rowDataUser = null;
  value: any;
  gridOptions = <GridOptions>{};
  columnDefs;
  frameworkComponents;
  employeeName: string;
  employeeNumber: string;
  employeeExists: boolean;
  noEmployeeFound: boolean = false;
  users = new ManageUser();
  menu: any;
  userId;
  permission = new Permission();

  constructor(
    private _commonUtilService: CommonUtilService,
    private router: Router,
    private userService: ManageUserService,
    private dataSharing: DataSharingService
  ) {
    this.frameworkComponents = {
      switchComponent: SwitchComponent,
      editIconComponent: EditIconComponent,
      deleteIconComponent: DeleteIconComponent,
      viewAreaComponent: ViewAreaComponent,
    };
  }
  ngOnInit(): void {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(event: any, value: any) {}

  quickSearch(value) {}

  fetchPermission() {
    this.dataSharing.getMenuList().subscribe((value) => {
      if (value && value !== null) {
        this.menu = value;
      }
    });

    this.menu.forEach((mg) => {
      mg.children.forEach((m) => {
        if (m.itemName === 'Role Management') {
          this.permission = m.permission;
        }
      });
    });
  }

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('roleName', 'Role');
    header.width = 240;
    header.sortable = true;
    header.filter = true;
    header.resizable = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('roleTypeName', 'Level');
    header.width = 240;
    header.sortable = true;
    header.filter = true;
    header.resizable = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Area');
    header.width = 240;
    header.resizable = true;
    header.sortable = true;
    header.filter = true;
    header.cellRenderer = 'viewAreaComponent';
    header.valueGetter = function (params) {
      return params.data.roles;
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('status', 'Status');
    header.width = 240;
    header.resizable = true;
    header.cellRenderer = 'switchComponent';
    header.cellRendererParams = {
      type: 'userrole',
      userId: this.userId,
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Edit');
    header.width = 200;
    header.resizable = true;
    header.cellRenderer = 'editIconComponent';
    header.cellRendererParams = {
      type: 'userrole',
      inRouterLink: '/Config/UserMgmt/edit_user',
      onEditIconClick: this.onEditBtnClicked.bind(this),
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Remove');
    header.width = 200;
    header.resizable = true;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'userrole',
      userId: this.userId,
      onDeleteIconClick: this.onDeletBtnClicked.bind(this),
    };
    this.columnDefs.push(header);
  }

  onSwitchBtnClicked(data) {}

  onEditBtnClicked(data: any) {
    this.userService.setEditUserData(data.rowData);
  }

  addUser() {
    this.userService.setEditUserData(null);
    this.dataSharing.setGlobalEditData(null);
    this.router.navigate(['/Config/UserMgmt/add_user']);
  }

  onShow(event) {
    this.getRoleData(event.toUpperCase());
  }

  onDeletBtnClicked(data) {}

  getRoleData(employeeNumber) {
    this.userService.getUserDataById(employeeNumber).subscribe((response) => {
      if (response && response.data !== null) {
        this.data = response;
        let result = this.data.data.find(
          (d) => d.employeeCode === employeeNumber
        );
        if (result) {
          this.userService.setUserData(result);
          this.userId = result.userId;
          this.employeeName = result.employeeName;
          this.employeeDesignation = result.designation;
          this.rowDataUser = result.roles;
          this.employeeExists = true;
          this.noEmployeeFound = false;
          this.createColumnDefs();
        } else {
          this.employeeExists = false;
          this.noEmployeeFound = true;
          this.employeeName = '';
        }
      }
    });
  }

  clearSearch(e) {
    this.loanFilter = '';
    // this.gridApi.setQuickFilter(this.loanFilter);
    this.userId = null;
    this.employeeName = null;
    this.rowDataUser = null;
    this.noEmployeeFound = false;
    this.employeeExists = false;
    this.createColumnDefs();
  }
}


