import { Component, OnInit } from '@angular/core';
import { ColumnApi, FirstDataRenderedEvent, GridApi, GridOptions } from 'ag-grid-community';
import { EyeIconComponent } from 'src/app/layouts/core/eye-icon/eye-icon.component';
import { CommonUtilService } from 'src/utils/common-util.service';

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.scss']
})
export class SelfAssessmentComponent implements OnInit {
  sectionList = [];
  allGroupFromParent;
  id: Number;
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
  userId: number;
  constructor(private _commonUtilService: CommonUtilService) {
    this.frameworkComponents = {
      eyeIconComponent : EyeIconComponent
    }
   }

  ngOnInit(): void {
  }

  clearSearch(e) {
    this.groupFilter = "";
    this.gridApi.setQuickFilter(this.groupFilter);
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
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
  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('section', 'Assessment ID');
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);



    header = this._commonUtilService.getColumnHeader('updatedOn', 'Performed Date');
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Overall Rating');
    header.width = 180;
    header.cellRenderer = 'parameterIconComponent';
    header.cellRendererParams = {
      inRouterLink: '/monitoring/parameters',
      // onIconClick: (params: any) => {
      //   this.onIconClicked(params.rowData.sectionId);
      // }
    }
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('status', 'Status');
    header.width = 180;
    header.cellRenderer = 'switchComponent';
    header.cellRendererParams = {
      type: 'group',
    };
    this.columnDefs.push(header);

  }

  
  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }

  onEyeIconClicked(){

  }

}
