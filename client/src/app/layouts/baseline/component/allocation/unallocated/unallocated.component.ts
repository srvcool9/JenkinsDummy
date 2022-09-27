import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColumnApi, FirstDataRenderedEvent, GridApi, GridOptions } from 'ag-grid-community';
import * as moment from 'moment';
import { DetailComponent } from 'src/app/layouts/core/detail/detail.component';
import { CommonUtilService } from 'src/utils/common-util.service';
import { AllocationService } from '../../../service/allocation.service';
import { RegistrationService } from '../../../service/registration.service';
import {AllocateIconComponent} from 'src/app/layouts/core/allocate-icon/allocate-icon.component';


@Component({
  selector: 'app-unallocated',
  templateUrl: './unallocated.component.html',
  styleUrls: ['./unallocated.component.scss'],
})
export class UnallocatedComponent implements OnInit {
  frameworkComponents;
  recordCount: number;
  types = [20, 50, 100];
  value: any;
  gridApi: GridApi;
  columnApi: any;
  loanFilter;
  data = [];
  allocatedList = [];

  gridOptions = <GridOptions>{};
  paramsSelectRecord = {
    type: 'gridReady',
    api: GridApi,
    columnApi: ColumnApi,
  };
  unallocatedList = [];
  columnDefs: any;
  paginationPageSize = 20;
  constructor(
    private _commonUtilService: CommonUtilService,
    private registrationService: RegistrationService,
    private allocationService: AllocationService
  ) {
    this.frameworkComponents = {
      detailComponent: AllocateIconComponent,
    };
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
    this.gridApi.setQuickFilter(this.loanFilter);
  }

  clearSearch(e) {
    this.loanFilter = '';
    this.gridApi.setQuickFilter(this.loanFilter);
  }

  getAllocated() {
    this.allocationService.getAllocationList().subscribe((response) => {
      if (response && response.data !== null) {
        this.allocatedList = response.data;
        if (this.allocatedList) {
          this.getUnAllocatedLists();
        }
      }
    });
  }

  getUnAllocatedLists() {
    this.registrationService.getAllEnumerators().subscribe((res) => {
      if (res && res.data !== null) {
        res.data.forEach((d) => {
          if (d.dateOfBirth != null && d.createdOn != null) {
            d.dateOfBirth = this.dateFormatter(d.dateOfBirth);
            d.createdOn = this.dateFormatter(d.createdOn);
          }
        });
        this.data = res.data;

        this.unallocatedList = this.data;
        if (this.allocatedList) {
          this.allocatedList.forEach((e) => {
            this.unallocatedList = this.unallocatedList.filter(
              (ae) =>
                ae.verificationStatus === 47 &&
                ae.enumeratorId !== e.enumerator.enumeratorId
            );
            this.recordCount = this.unallocatedList.length;
          });
        }
      }
    });
  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }

  ngOnInit(): void {
    this.getAllocated();
    this.createColumnDefs();
  }

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader(
      'enumeratorId',
      'Registration Id'
    );
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('enumeratorName', 'Name');
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'createdOn',
      'Registration Date'
    );
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('mobile', 'Mobile Number');
    header.width = 180;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('email', 'Email');
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'verifiedBy.empCode.employeeName',
      'Verified By'
    );
    header.sortable = true;
    header.filter = true;
    header.width = 180;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('detail', 'Allocate');
    header.width = 180;
    header.cellRenderer = 'detailComponent';
    header.cellRendererParams = {
      inRouterLink: 'baseline/Allocation/allocation_detail',
      onAllocateClick: this.onAllocateBtnClicked.bind(this),
    };
    this.columnDefs.push(header);
  }

  dateFormatter(date: Date) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

  onAllocateBtnClicked(data: any) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }
}
