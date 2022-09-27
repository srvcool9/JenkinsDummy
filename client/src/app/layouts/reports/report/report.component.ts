import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
} from 'ag-grid-community';
import * as moment from 'moment';
import { CommonUtilService } from 'src/utils/common-util.service';
import { GroupService } from '../../baseline/service/assessment service/group service/group.service';
import { ReportService } from '../../reports/service/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  loanFilter;
  reportGeneration = false;
  groups = [];
  reportList = [];
  reportType = [];
  reportTypeName: string;
  paginationPageSize = 20;
  gridApi: GridApi;
  assessments = [];
  columnDefs: any;
  frameworkComponents;
  gridOptions = <GridOptions>{};
  reportsForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _commonUtilService: CommonUtilService,
    private _reportService: ReportService,
    private groupService: GroupService
  ) {
    this.frameworkComponents = {};
    this.createForm();
  }

  ngOnInit(): void {
    this.getAllActiveGroups();
    this.getReportType();
  }

  createForm() {
    this.reportsForm = this.fb.group({
      id: [null],
      group: [null],
      assessment: [null],
      reportType: [null],
    });
  }

  getAllActiveGroups() {
    this.groupService.getGroupList().subscribe((res) => {
      if (res && res.data !== null) {
      const groupList = res.data;
      this.groups = groupList.filter((g) => g.isActive === true);
      }
    });
  }

  selectedGroup(event) {
    this._reportService
      .fetchAssessmentByGroupId(event.groupId)
      .subscribe((resp) => {
        if (resp && resp.data !== null) {
        this.assessments = resp.data;
        }
      });
      this.reportsForm.controls['assessment'].reset();
      this.reportsForm.controls['reportType'].reset();
      this.reportGeneration = false;
  }

  getReportType() {
    this.reportType = reportType;
  }

  generateReport() {
    if (this.reportsForm.value.reportType === null || this.reportsForm.value.reportType === null || this.reportsForm.value.assessment === null) {
      this.reportGeneration = false;
    }
    else {
      this.reportGeneration = true;
      this._reportService
        .fetchReport(
          this.reportsForm.value.reportType,
          this.reportsForm.value.assessment
        )
        .subscribe((res) => {
          if (res && res != null) {
            res.data.forEach((report) => {
              if(report.registrationDate!=undefined){
              report.registrationDate = this.dateFormatter(report.registrationDate);
              }
              this.reportList = res.data;
            })

            if (this.reportsForm.value.reportType === 1) {
              this.createColumnDefs();
              this.reportTypeName = "District-wise Enumerator Report"
            } else if (this.reportsForm.value.reportType === 2) {
              this.createColumnDefsForRegisteredEnumerator();
              this.reportTypeName = "Enumerator Registration Report"
            } else {
              this.reportTypeName = "Enumerator Allocation Report"
              this.createColumnDefsForEnumeratorAllocation();
            }
          }


        });
    }


  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(event?) {
    this.gridApi = event.api;
  }

  export() {
    // alert("Called");
    this.gridApi.exportDataAsCsv();
  }

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;
    header = this._commonUtilService.getColumnHeader(
      'districtName',
      'District'
    );
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);
    header = this._commonUtilService.getColumnHeader(
      'totalRegistered',
      'Total Registered'
    );
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('verified', 'Verified');
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'unVerified',
      'Unverified'
    );
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'verificationPer',
      'Verification %'
    );
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'enumeratorPer',
      'Enumerator %'
    );
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);
  }

  createColumnDefsForRegisteredEnumerator() {
    this.columnDefs = [];
    let header: any;
    header = this._commonUtilService.getColumnHeader(
      'enumeratorId',
      'Registration ID'
    );
    header.sortable=true;
    header.filter=true;
    header.width = 150;
    this.columnDefs.push(header);
    header = this._commonUtilService.getColumnHeader(
      'enumeratorName',
      'Enumerator'
    );
    header.sortable=true;
    header.filter=true;
    header.width = 180;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'fatherName',
      "Father's Name"
    );
    header.sortable=true;
    header.filter=true;
    header.width = 180;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'institutionName',
      'Institute'
    );
    header.sortable=true;
    header.filter=true;
    header.width = 200;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'districtName',
      'District'
    );
    header.sortable=true;
    header.filter=true;
    header.width = 180;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'registrationDate',
      'Registartion Date'
    );
    header.sortable=true;
    header.filter=true;
    header.width = 180;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('verificationStatus', 'Status');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'verifiedBy',
      'Verified By'
    );
    header.width = 200;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);
  }

  createColumnDefsForEnumeratorAllocation() {
    this.columnDefs = [];
    let header: any;
    header = this._commonUtilService.getColumnHeader(
      'enumeratorId',
      'Registration ID'
    );
    header.width = 150;
    this.columnDefs.push(header);
    header = this._commonUtilService.getColumnHeader(
      'enumeratorName',
      'Enumerator'
    );
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'fatherName',
      "Father's Name"
    );
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'institutionName',
      'Institute'
    );
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'districtName',
      'District'
    );
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'numberOfSchool',
      'Number of School'
    );
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Status');
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'allocatedBy',
      'Allocated By'
    );
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'allocatedOn',
      'Allocated On'
    );
    header.width = 180;
    header.sortable=true;
    header.filter=true;
    this.columnDefs.push(header);
  }

  dateFormatter(date: Date) {
    const format = 'dd/mm/yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }
}

const reportType = [
  {
    id: 1,
    name: 'District-wise Enumerator Report',
  },
  {
    id: 2,
    name: 'Enumerator Registration Report',
  },
  {
    id: 3,
    name: 'Enumerator Allocation Report',
  },
];
