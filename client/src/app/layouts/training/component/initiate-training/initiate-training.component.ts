import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ColumnApi,
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
} from 'ag-grid-community';
import { LinkStatusComponent } from 'src/app/layouts/core/link-status/link-status.component';
import { LinkComponent } from 'src/app/layouts/core/link/link.component';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { CommonUtilService } from 'src/utils/common-util.service';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initiate-training',
  templateUrl: './initiate-training.component.html',
  styleUrls: ['./initiate-training.component.scss'],
})
export class InitiateTrainingComponent implements OnInit {
  initiateTrainingFilter: any;
  gridApi: GridApi;
  columnApi: any;
  initiateTrainingList: any = [];
  gridOptions = <GridOptions>{};
  paginationPageSize = 20;
  paramsSelectRecord = {
    type: 'gridReady',
    api: GridApi,
    columnApi: ColumnApi,
  };
  frameworkComponents;
  types = [20, 50, 100];
  recordCount: number;
  value: any;
  columnDefs: any;
  roleTypeId : any;
  loggedinUserArea:any
  data:any
  roleArea: any;
  constructor(
    private _commonUtilService: CommonUtilService,
    private _groupService: GroupService,
    private clientStorage : ClientSideStorageService,
    private dataSharing:DataSharingService,
  ) {
    this.data = this.dataSharing.getMenuList();
    this.loggedinUserArea = this.data.source._value;
    console.log(this.loggedinUserArea);
    
    this.roleArea = this.loggedinUserArea.roleArea
    this.frameworkComponents = {
      linkComponent: LinkStatusComponent,
    };
    this.roleTypeId = this.clientStorage.get('roleTypeId');
  }

  ngOnInit(): void {
    this.createColumnDefs();
    this.getInitiateTrainingListing();
  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.initiateTrainingFilter);
  }

  clearSearch($event) {
    this.initiateTrainingFilter = '';
    this.gridApi.setQuickFilter(this.initiateTrainingFilter);
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
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

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader(
      'trainingName',
      'Training'
    );
    header.width = 200;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'groupName',
      'Training Group'
    );
    header.width = 180;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'subGroupName',
      'Sub-Group'
    );
    header.width = 180;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('startDate', 'Start Date');
    header.width = 180;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('endDate', 'End Date');
    header.width = 180;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('initiateTrainingStatus', 'Status');
    header.width = 180;
    header.cellRenderer = 'linkComponent';
    header.cellRendererParams = {
      inRouterLink: '/training/initiateTrainingForm',
      onLinkClick: (params: any) => {
      },
    };
    this.columnDefs.push(header);
  }

  getInitiateTrainingListing() {
    this._groupService.getAllUserRespectiveTrainings(this.roleArea).subscribe((response) => {
      if (response && response.data != null) {
        response.data.forEach((training) => {
          if(training.initiateTrainingStatus===null){
            training.initiateTrainingStatus = 'Pending';
          }
          training.startDate = this.dateFormatGrid(training.startDate);
          training.endDate = this.dateFormatGrid(training.endDate);
          //this.initiateTrainingList = response.data.filter((t)=>t.trainingLevelId.id == this.roleTypeId);
        });
        this.initiateTrainingList=response.data;
        
        this.recordCount = this.initiateTrainingList.length;
      }
    });
  }

  dateFormatGrid(date: Date) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }
}

