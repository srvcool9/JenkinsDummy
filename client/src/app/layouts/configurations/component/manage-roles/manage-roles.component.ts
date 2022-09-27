import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnApi, GridApi, GridOptions, FirstDataRenderedEvent } from 'ag-grid-community';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { EditIconComponent } from 'src/app/layouts/core/edit-icon/edit-icon.component';
import { SwitchComponent } from 'src/app/layouts/core/switch/switch.component';
import { CommonUtilService } from 'src/utils/common-util.service';
import { UserRoleService } from '../../service/manage role service/user-role.service';
import * as moment from 'moment';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { __values } from 'tslib';
import { Permission } from '../../model/manage role model/permission';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.scss'],
})
export class ManageRolesComponent implements OnInit {
  rowDataUserRole= [];
  menu=[];
  permission=new Permission();
  paginationPageSize = 20;
  frameworkComponents;
  columnDefs: any;
  loanFilter;
  gridOptions = <GridOptions>{};
  types = [20, 50, 100];
  recordCount;
  value: any;
  gridApi: GridApi;
  columnApi: any;
  paramsSelectRecord = {
    type: 'gridReady',
    api: GridApi,
    columnApi: ColumnApi,
  };
  constructor(
    private _commonUtilService: CommonUtilService,
    private router: Router,
    private _userRole: UserRoleService,
    private dataSharing: DataSharingService
  ) {
    this.frameworkComponents = {
      switchComponent: SwitchComponent,
      editIconComponent: EditIconComponent,
      deleteIconComponent: DeleteIconComponent,
    };
    //this.fetchPermission();
  }  
     
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  clearSearch (e) {    
    this.loanFilter = "";
    this.gridApi.setQuickFilter(this.loanFilter);
  }
 
  ngOnInit(): void {
    this.createColumnDefs();
    this.getAllRolesData();
  }

  // fetchPermission(){
  //   this.dataSharing.getMenuList().subscribe((value) => {
  //     this.menu=value;
  //   });

  //   this.menu.forEach((mg)=>{
  //     mg.children.forEach((m)=>{
  //       if(m.itemName === 'Role Management'){
  //         this.permission=m.permission;
  //       }
  //     })
  //   })
  // }

  addRole() {
    this._userRole.setAddRoleId(0);
    this.router.navigate(['/Config/RoleMgmt/add_role']);
  }

  onGridReady(params: any, value: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    if (value != null && value != undefined) {
      this.paginationPageSize = value;
      this.ngOnInit();
    } else {
      this.paginationPageSize = 20;
    }
  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }

  onPaginationChanged(event) {}
  quickSearch() {
    this.gridApi.setQuickFilter(this.loanFilter);
  }

  onSwitchBtnClicked(data) {
    this._userRole.switchRoleData(data);
    this._userRole.verify = true;
  }

  onEditBtnClicked(data: any) {
    this._userRole.editRoleData(data);
    this._userRole.verify = true;
  }

  onDeletBtnClicked() {
    this.getAllRolesData();
  }

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('roleName', 'Role Name');
    // header.width = 200;
    header.minWidth= 150; 
    header.sortable=true;
    header.filter=true;
    header.resizable = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('updatedBy', 'Updated By');
    header.sortable=true;
    header.filter=true;
    header.resizable = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('updatedOn', 'Updated On');
    header.sortable=true;
    header.filter=true;
    header.resizable = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('isActive', 'Status');
    // header.width = 180;
    header.resizable = true;
    header.cellRenderer = 'switchComponent';
    header.cellRendererParams = {
      type:'role'
    }
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Edit');
    // header.width = 180;
    header.resizable = true;
    header.cellRenderer = 'editIconComponent';
    header.cellRendererParams = {
      type:'role',
      inRouterLink: '/Config/RoleMgmt/edit_role',
      onEditIconClick: this.onEditBtnClicked.bind(this),
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Delete');
    // header.width = 180;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type:'role',
      onDeleteIconClick: this.onDeletBtnClicked.bind(this),
    };
    // header. cellRendererSelector = (params: ICellRendererParams) => {
    //   const perm={
    //     component:DeleteIconComponent,
    //     params:{values:this.permission}
    //   };
    //  return perm;
    // }
    this.columnDefs.push(header);
  }

  getAllRolesData() {
    this._userRole.getAllRoleData().subscribe((response) => {
      if (response && response != null) {
        response.data.forEach((role) => {
          if (role) {
            let parsedDate = moment(role.updatedOn, 'YYYY-MM-DD');
            role.updatedOn = parsedDate.format('DD-MM-YYYY');
          } else {
            let parsedDate = moment(role.updatedOn, 'YYYY-MM-DD');
            role.updatedOn = parsedDate.format('DD-MM-YYYY');
          }
        });
       this.rowDataUserRole = response.data;
        this.recordCount = this.rowDataUserRole.length;
      }
    });
  }
}
