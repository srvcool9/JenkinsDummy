import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnApi, GridApi, GridOptions, FirstDataRenderedEvent } from 'ag-grid-community';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { EditIconComponent } from 'src/app/layouts/core/edit-icon/edit-icon.component';
import { SwitchComponent } from 'src/app/layouts/core/switch/switch.component';
import { CommonUtilService } from 'src/utils/common-util.service';
import { GroupService } from '../../../service/assessment service/group service/group.service';
import { Group } from '../../../model/assessment model/group';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import * as moment from 'moment';
import { formatDate } from '@angular/common';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  groupList = [];
  allGroupFromParent;
  id : Number;
  groupFilter: any;
  recordCount: number;
  columnDefs: any;
  frameworkComponents;
  types = [20, 50, 100];
  value: any;
  gridApi: GridApi;
  columnApi: any;
  gridOptions = <GridOptions>{};
  paramsSelectRecord = {
    type: 'gridReady',
    api: GridApi,
    columnApi: ColumnApi,
  };
  paginationPageSize = 20;
  userId:number;
  @ViewChild("primaryModal", { static: false })
  public primaryModal: ModalDirective;

  constructor(
    private _commonUtilService: CommonUtilService,
    private router: Router,
    private dataSharing: DataSharingService,
    private groupService: GroupService,public modalService: NgbModal
  ) {
   
    this.getGroup();
    this.frameworkComponents = {
      switchComponent: SwitchComponent,
      editIconComponent: EditIconComponent,
      deleteIconComponent: DeleteIconComponent,
    };
  }
  
  
  clearSearch (e) {    
    this.groupFilter = "";
    this.gridApi.setQuickFilter(this.groupFilter);
  }
     
  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit(): void {
    this.createColumnDefs();
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

  quickSearch() {
    this.gridApi.setQuickFilter(this.groupFilter);
   
  }

  dataLoaded(child: string) {
    // this.getManagedRoles();
  }


remove(){
  this.gridOptions.api.getRenderedNodes()
}

  addGroup() {
      this.id = 0;
      this.primaryModal.show();  
    this.dataSharing.setGlobalEditData(null);
    // this.router.navigate(['/baseline/Assessment/add_group']);
  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('groupName', 'Group Name');
    header.width = 200;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('updatedBy.empCode.employeeName', 'Updated By');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('updatedOn', 'Updated On');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('isActive', 'Status');
    header.width = 180;
    header.cellRenderer = 'switchComponent';
    header.cellRendererParams = {
      type: 'group',
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Edit');
    header.width = 180;
    header.cellRenderer = 'editIconComponent';
    header.cellRendererParams = {
      inRouterLink: '/baseline/Assessment',
      onEditIconClick: (params : any )=> {
        this.onEditBtnClicked(params.rowData.groupId);
        }
    };

    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Delete');
    header.width = 180;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'group',
      onDeleteIconClick: this.onDeletBtnClicked.bind(this),
    };

    this.columnDefs.push(header);
  }

  onEditBtnClicked=(id:number)=> {
    this.id = id;
    this.primaryModal.show();
  }

  onDeletBtnClicked() {
    this.getGroup();
  }

  getGroup() {
    this.groupService.getGroupList().subscribe((response) => {
      if (response && response.data != null) {
        response.data.forEach((group) => {
          group.updatedOn= this.dateFormattergrid(group.updatedOn);
          this.groupList = response.data;
          this.allGroupFromParent = this.groupList;
          this.recordCount = this.groupList.length;
        });
      }
    });
  }

  changeIndicator = (callAddRole) => {
    this.id = 0;
    if (callAddRole == "cancel") {
      this.primaryModal.hide();
    } else {
      this.primaryModal.hide();
      //this.getUserRolesByCompanyId();
    }
  };

  dateFormatter(date:Date){
    const format = 'MM-dd-yyyy';
    const locale = 'en-US';
   return formatDate(date, format, locale);
  }
  dateFormattergrid(date:Date){
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
   return formatDate(date, format, locale);
  }
}
