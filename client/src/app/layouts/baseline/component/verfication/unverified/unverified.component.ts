import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridOptions,FirstDataRenderedEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { CommonUtilService } from 'src/utils/common-util.service';
import {DetailComponent} from '../../../../core/detail/detail.component';
import { RegistrationService } from '../../../service/registration.service';

@Component({
  selector: 'app-unverified',
  templateUrl: './unverified.component.html',
  styleUrls: ['./unverified.component.scss']
})
export class UnverifiedComponent implements OnInit {

  unverifiedList  = []; 
  groupFilter : any;
  recordCount : number;
  columnDefs: any;
  frameworkComponents;
  types = [20, 50, 100];
  value : any;
  gridApi: GridApi;
  columnApi: any;
  gridOptions = <GridOptions>{};
  paramsSelectRecord = {
    type: 'gridReady',
    api: GridApi,
    columnApi: ColumnApi,
  };
  paginationPageSize = 20;
  constructor(private _commonUtilService : CommonUtilService,
    private _registration: RegistrationService) {
    this.getUnVerifiedList();
    this.frameworkComponents = {
      detailComponent : DetailComponent
    }
   }

  ngOnInit(): void {
    this.createColumnDefs();
  }

  clearSearch (e) {    
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

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('enumeratorId', 'Registration ID');
    header.width = 200;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('enumeratorName', 'Name');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('createdOn', 'Registration Date');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('mobile', 'Mobile Number');
    header.width = 200;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('email', 'Email');
    header.width = 200;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('detail', 'Details');
    header.width = 200;
    header.sortable=true;
    header.filter=true;
    header.cellRenderer = 'detailComponent';
    header.cellRendererParams = {
      inRouterLink: 'baseline/Registration',
      onDetailClick: this.onDetailBtnClicked.bind(this),
    };
    this.columnDefs.push(header);

  }

  onDetailBtnClicked(data : any){
  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }

  quickSearch(){
    this.gridApi.setQuickFilter(this.groupFilter);
     }

  getUnVerifiedList(){
    this._registration.getAllEnumerators().subscribe((response)=>{
      if(response && response.data !=null){
        response.data.forEach((data)=>{
          if(data.dateOfBirth!=null &&  data.createdOn!=null){
            data.dateOfBirth=this.dateFormatter(data.dateOfBirth);
            data.createdOn= this.dateFormatter(data.createdOn);
            }
          this.unverifiedList = response.data.filter((e)=>e.verificationStatus===46);
         this.recordCount = this.unverifiedList.length;
        })
      }
     })
  }

  dateFormatter(date:Date){
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
   return formatDate(date, format, locale);
  }

}

// const unverifiedList = [{
//     "id" : '1111',
//     "registrationDate" : "2022-07-08",
//     "name" : "ABC",
//     "DOB":"2022-07-08",
//     "mobile" : "9876544331",
//     "email" : "sshb@gmail.com",
//     "fatherName" :"ABC",
//     "qualification" : "BE",   
//     "institutionDistrict": "Bhopal",
//     "institutionName" : "NIDs",
//     "grade" : "2",
//     "address" : "near pustak bhawan",
//     'district': {
//       'value' : 1,
//       'text' :'Bhopal',
//     },
//     "block" : {
//       'value' : 1,
//       'text' :'Berasia',
//     },
//     "document" : "abc.pdf",
//     "accountHolderName" : "ABCD",
//     "bankName" : "HDFC",
//     "IFSC" : "473284y782",
//     "accountNumber" : "473284y782"
// }]