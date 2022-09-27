import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnApi, FirstDataRenderedEvent, GridApi, GridOptions } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { EditIconComponent } from 'src/app/layouts/core/edit-icon/edit-icon.component';
import { SwitchComponent } from 'src/app/layouts/core/switch/switch.component';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { CommonUtilService } from 'src/utils/common-util.service';
import { AddSectionsComponent } from './add-sections/add-sections.component';
import { SectionsService } from '../../service/sections.service';
import { ParameterIconComponent } from 'src/app/layouts/core/parameter-icon/parameter-icon.component';
@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {
  @ViewChild("primaryModal", { static: false })
  public primaryModal: ModalDirective;
  addChild: AddSectionsComponent;
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

  constructor(
    private _commonUtilService: CommonUtilService,
    private router: Router,
    private dataSharing: DataSharingService,
    public modalService: NgbModal,
    private _sectionService: SectionsService
  ) {
    this.getSections();
    this.frameworkComponents = {
      switchComponent: SwitchComponent,
      editIconComponent: EditIconComponent,
      deleteIconComponent: DeleteIconComponent,
      parameterIconComponent: ParameterIconComponent
    };
  }

  ngOnInit(): void {
    this.createColumnDefs();

  }

  getSections() {
    this._sectionService.getSectionList().subscribe((response)=>{
      if(response && response.length!=0){
        response.data.forEach((data)=>{
          data.updatedOn = this.dateFormattergrid(data.updatedOn);
        })
        this.sectionList = response.data;
        this.recordCount = this.sectionList.length;
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

  changeIndicator = (callAddRole) => {
    this.id = 0;
    if (callAddRole == "cancel") {
      this.primaryModal.hide();
    } else {
      this.primaryModal.hide();
      //this.getUserRolesByCompanyId();
    }
  };

  dateFormatter(date: Date) {
    const format = 'MM-dd-yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }
  dateFormattergrid(date: Date) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('section', 'Section');
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);



    header = this._commonUtilService.getColumnHeader('updatedOn', 'Updated On');
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Parameter');
    header.width = 180;
    header.cellRenderer = 'parameterIconComponent';
    header.cellRendererParams = {
      inRouterLink: '/monitoring/parameters',
      onIconClick: (params: any) => {
        this.onIconClicked(params.rowData.sectionId);
      }
    }
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('status', 'Status');
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
    this.id = id;
    this.primaryModal.show();
  }

  onIconClicked(id: number) {

  }

  onDeletBtnClicked() {
    // this.getGroup();
  }

  addSection() {
    this.id = 0;
    this.primaryModal.show();
    this.dataSharing.setGlobalEditData(null);
  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }
}


// const sectionList = [{
//   sectionId: 1,
//   updatedOn: '09-09-2022',
//   section: 'Abdhbjs',
//   description: 'jdhdushudhdus',
//   isActive: false,
//   purpose: {
//     id: 1,
//     name: 'Self Assessment'
//   }

// },
// {
//   sectionId: 2,
//   updatedOn: '19-09-2022',
//   section: 'fjdifhiduh',
//   description: 'rdsdsdsd',
//   isActive: true,
//   purpose: {
//     id: 1,
//     name: 'Self Assessment'
//   }
// }]