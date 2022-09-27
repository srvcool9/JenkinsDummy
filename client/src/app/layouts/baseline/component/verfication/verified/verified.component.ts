import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridOptions, FirstDataRenderedEvent } from 'ag-grid-community';
import * as moment from 'moment';
import { UrlFormationService } from 'src/app/layouts/shared/services/url-formation.service';
import { CommonUtilService } from 'src/utils/common-util.service';
import { EyeIconComponent } from '../../../../core/eye-icon/eye-icon.component';
import { RegistrationService } from '../../../service/registration.service';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.scss']
})
export class VerifiedComponent implements OnInit {

  verifiedList = [];
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
  constructor(private _commonUtilService: CommonUtilService,
    private _registration: RegistrationService) {
    this.frameworkComponents = {
      eyeIconComponent: EyeIconComponent
    }
    this.getVerifiedList();
  }  

  clearSearch (e) {    
    this.groupFilter = "";
    this.gridApi.setQuickFilter(this.groupFilter);
  }

  ngOnInit(): void {
    this.createColumnDefs();
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
    header.width = 130;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('enumeratorName', 'Name');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('createdOn', 'Registration Date');
    header.width = 150;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('mobile', 'Mobile Number');
    header.width = 150;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('email', 'Email');
    header.width = 200;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);


    header = this._commonUtilService.getColumnHeader('verifiedBy.empCode.employeeName', 'Verified By');
    header.width = 130;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);


    header = this._commonUtilService.getColumnHeader('updatedOn', 'Verification Date');
    header.width = 150;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('detail', 'Details');
    header.width = 150;
    header.cellRenderer = 'eyeIconComponent';
    header.cellRendererParams = {
      inRouterLink: 'baseline/verified/details',
      onIconClick: this.onEyeIconClicked.bind(this),
    };
    this.columnDefs.push(header);

  }

  onEyeIconClicked(data: any) {
  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.groupFilter);
  }

  getVerifiedList() {
    this._registration.getAllEnumerators().subscribe((response) => {
      if (response && response.data != null) {
        response.data.forEach((data) => {
          if(data.dateOfBirth!=null &&  data.createdOn!=null){
          data.dateOfBirth=this.dateFormatter(data.dateOfBirth);
          data.createdOn= this.dateFormatter(data.createdOn);
          data.updatedOn=this.dateFormatter(data.updatedOn);
          }
          this.verifiedList = response.data.filter((e) => e.verificationStatus === 47);
          this.recordCount = this.verifiedList.length;
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



// const verifiedList = [{
//   "id" : '1111',
//   "name" : "ABC",
//   "date" : "07-06-2022",
//   "number" : "9876544331",
//   "email" : "sshb@gmail.com",
//   "verifiedBy" : "BDH",
// "verificationDate" : "07-06-2022"
// }]



// const verifiedList = [{
//   "id" : '1112',
//   "name" : "QWERTY",
//   "registrationDate" : "2022-07-10",
//   "mobile" : "9876544331",
//   "email" : "agajpal@gmail.com",
//   "DOB":"2022-07-08",
//   "verifiedBy":"Neena",
//   "verificationDate" : "2022-07-10",
//   "fatherName" :"ABC",
//   "qualification" : "BE",
//   "institutionDistrict": "Bhopal",
//   "institutionName" : "NIDs",
//   "grade" : "2",
//   "address" : "near pustak bhawan",
//   'district': {
//     'value' : 1,
//     'text' :'Bhopal',
//   },
//   "block" : {
//     'value' : 1,
//     'text' :'Berasia',
//   },
//   "document" : "abc.pdf",
//   "accountHolderName" : "ABCD",
//   "bankName" : "HDFC",
//   "IFSC" : "473284y782",
//   "accountNumber" : "473284y782"
// }]