import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnApi, FirstDataRenderedEvent, GridApi, GridOptions } from 'ag-grid-community';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { EditIconComponent } from 'src/app/layouts/core/edit-icon/edit-icon.component';
import { SwitchComponent } from 'src/app/layouts/core/switch/switch.component';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { CommonUtilService } from 'src/utils/common-util.service';
import { SectionsService } from '../../service/sections.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {

  id: Number;
  parameterList = [];
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
  parameter: any;
  data: any;
  constructor(
    private _commonUtilService: CommonUtilService,
    private router: Router,
    private dataSharing: DataSharingService,
    private _sectionService: SectionsService
  ) {
    this.data = this.dataSharing.getGlobalEditData();
    this.parameter = this.data.source._value;
    this.dataSharing.setSectionName(this.parameter.section);
    this.frameworkComponents = {
      switchComponent: SwitchComponent,
      editIconComponent: EditIconComponent,
      deleteIconComponent: DeleteIconComponent,
    };
    this.getParameterList();
  }

  ngOnInit(): void {
    
    this.createColumnDefs();
  }

  addParameter() {
    this.router.navigate(['/monitoring/add_parameter']);
  }

  getParameterList() {
    // this.parameterList = sectionList;
    this._sectionService.getSectionById(this.parameter.sectionId).subscribe((response) => {
      if (response && response != null) {
        this.parameterList = response.data[0].parameterList;
        this.recordCount = this.parameterList.length;
      }
    })
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

  dataLoaded(child: string) {
    // this.getManagedRoles();
  }


  remove() {
    this.gridOptions.api.getRenderedNodes()
  }


  createColumnDefs() {
    this.columnDefs = [];
    let header: any;
    header = this._commonUtilService.getColumnHeader('parameterName', 'Parameter');
    header.width = 200;
    header.sortable = true;
    header.filter = true;
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
      inRouterLink: '/monitoring/sections',
      onEditIconClick: (params: any) => {
        this.onEditBtnClicked(params.rowData.sectionId);
      }
    };

    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Delete');
    header.width = 180;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      // type: 'group',
      onDeleteIconClick: this.onDeletBtnClicked.bind(this),
    };

    this.columnDefs.push(header);
  }

  onEditBtnClicked = (id: number) => {

  }

  onDeletBtnClicked() {
    // this.getGroup();

  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }

}

// const sectionList = [{
//   sectionId: 1,
//   parameter: 'Parameter 1',
//   updatedOn: '09-09-2022',
//   section: 'Abdhbjs',
//   description: 'jdhdushudhdus',
//   isActive: false,
//   type:'Common',
//   purpose: {
//     id: 1,
//     name: 'Self Assessment'
//   }

// },
// {
//   sectionId: 2,
//   parameter: 'Parameter 2',
//   updatedOn: '19-09-2022',
//   section: 'fjdifhiduh',
//   type:'Common',
//   description: 'rdsdsdsd',
//   isActive: true,
//   purpose: {
//     id: 1,
//     name: 'Self Assessment'
//   }
// }]