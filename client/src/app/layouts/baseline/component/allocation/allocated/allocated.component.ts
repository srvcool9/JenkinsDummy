import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColumnApi, FirstDataRenderedEvent, GridApi, GridOptions } from 'ag-grid-community';
import { DetailComponent } from 'src/app/layouts/core/detail/detail.component';
import { EditIconComponent } from 'src/app/layouts/core/edit-icon/edit-icon.component';
import { CommonUtilService } from 'src/utils/common-util.service';
import { AllocationService } from '../../../service/allocation.service';
import { RegistrationService } from '../../../service/registration.service';

@Component({
  selector: 'app-allocated',
  templateUrl: './allocated.component.html',
  styleUrls: ['./allocated.component.scss'],
})
export class AllocatedComponent implements OnInit {
  frameworkComponents;
  gridApi: GridApi;
  columnApi: any;
  loanFilter : any;
  value:any;
  types = [20, 50, 100];
  recordCount : number;
  gridOptions = <GridOptions>{};
  paramsSelectRecord = {
    type: 'gridReady',
    api: GridApi,
    columnApi: ColumnApi,
  };
  allocatedList=[];
  columnDefs: any;
  paginationPageSize = 20;
  constructor(private _commonUtilService: CommonUtilService,
    private allocationService:AllocationService,
     private registrationService:RegistrationService) {
    this.getAllocatedLists();
    this.frameworkComponents = {
      detailComponent : DetailComponent,
      editIconComponent : EditIconComponent,
    }
  }

  ngOnInit(): void {
    this.createColumnDefs();
  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }

  quickSearch(){
    this.gridApi.setQuickFilter(this.loanFilter);
  }  

  clearSearch (e) {    
    this.loanFilter = "";
    this.gridApi.setQuickFilter(this.loanFilter);
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

    header = this._commonUtilService.getColumnHeader('enumerator.enumeratorName', 'Name');
    header.width = 200;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('assessment.assessmentName', 'Assessment');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('classes', 'Class');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('district.districtName', 'District');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('school.schoolName', 'School');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('createdBy.empCode.employeeName', 'Allocated By');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);


    header = this._commonUtilService.getColumnHeader('createdOn', 'Allocated On');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);


    header = this._commonUtilService.getColumnHeader('', 'Edit');
    header.resizable = true;
    header.cellRenderer = 'editIconComponent';
    header.cellRendererParams = {
      inRouterLink: 'baseline/Allocation/allocation_detail',
      onEditIconClick: this.onEditBtnClicked.bind(this),
    };
    this.columnDefs.push(header);

  }

  getAllocatedLists(){
   this.allocationService.getAllocationList().subscribe(res=>{
    if(res && res.data && res.data !== null) {
    res.data.forEach(d=>{
      if(d.createdOn!=null && d.enumerator.dateOfBirth!=null){
        d.createdOn=this.dateFormatter(d.createdOn);
        d.enumerator.dateOfBirth=this.dateFormatter(d.enumerator.dateOfBirth);
        }
    });
      this.allocatedList=res.data
      this.recordCount = res.data.length;
  }
   });
  }

  onDetailBtnClicked(data: any) {}

  onEditBtnClicked(){}

  dateFormatter(date:Date){
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
   return formatDate(date, format, locale);
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }


}

