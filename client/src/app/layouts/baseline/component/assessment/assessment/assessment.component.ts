import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnApi, GridApi, GridOptions, FirstDataRenderedEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { EditIconComponent } from 'src/app/layouts/core/edit-icon/edit-icon.component';
import { SwitchComponent } from 'src/app/layouts/core/switch/switch.component';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { CommonUtilService } from 'src/utils/common-util.service';
import {AssementService} from '../../../service/assement.service';


@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss'],
})
export class AssessmentComponent implements OnInit {
  loanFilter: any;
  recordCount;
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
  rowDataAssessment: any = [];

  constructor(
    private _commonUtilService: CommonUtilService,
    private router: Router,
    private dataSharing: DataSharingService,
    private assessmentService: AssementService
  ) {
    this.getAssessment();
    this.frameworkComponents = {
      switchComponent: SwitchComponent,
      editIconComponent: EditIconComponent,
      deleteIconComponent: DeleteIconComponent,
    };
  }

  clearSearch(e) {
    this.loanFilter = '';
    this.gridApi.setQuickFilter(this.loanFilter);
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

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('assessmentName', 'Name');
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'group.groupName',
      'Group'
    );
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('startDate', 'Start Date');
    header.width = 140;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'criteria.entityName',
      'Criteria'
    );
    header.width = 100;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'typeId.entityName',
      'Type'
    );
    header.width = 100;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'roleTypeId.entityName',
      'Level'
    );
    header.width = 100;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'modeId.entityName',
      'Mode'
    );
    header.width = 100;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('isActive', 'Status');
    header.width = 100;
    header.cellRenderer = 'switchComponent';
    header.cellRendererParams = {
      type: 'assessment',
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Edit');
    header.width = 100;
    header.cellRenderer = 'editIconComponent';
    header.cellRendererParams = {
      type: 'assessment',
      inRouterLink: '/baseline/Assessment/edit_assessment',
      onEditIconClick: this.onEditBtnClicked.bind(this),
    };

    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Delete');
    header.width = 100;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'assessment',
      onDeleteIconClick: this.onDeletBtnClicked.bind(this),
    };

    this.columnDefs.push(header);
  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.loanFilter);
  }

  addAssessment() {
    this.dataSharing.setGlobalEditData(null);
    this.router.navigate(['/baseline/Assessment/add_assessment']);
  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }

  onEditBtnClicked() {}
  onDeletBtnClicked() {
    this.getAssessment();
  }

  getAssessment() {
    this.assessmentService.getAssessment().subscribe((resp) => {
      if (resp && resp.data != null) {
        resp.data.forEach((assement) => {
          assement.startDate = this.dateFormattergrid(assement.startDate);
          assement.endDate = this.dateFormattergrid(assement.endDate);
          this.rowDataAssessment = resp.data;
          this.recordCount = this.rowDataAssessment.length;
        });
      }
    });
  }

  dateFormattergrid(date: Date) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }
}

