import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ColumnApi,
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
} from 'ag-grid-community';
import { StartTestIconComponent } from 'src/app/layouts/core/start-test-icon/start-test-icon.component';
import { TrainingTestStatusComponent } from 'src/app/layouts/core/training-test-status/training-test-status.component';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { CommonUtilService } from 'src/utils/common-util.service';
import { TrainingAssessmentService } from '../../services/training-assessment.service';

@Component({
  selector: 'app-training-assessment',
  templateUrl: './training-assessment.component.html',
  styleUrls: ['./training-assessment.component.scss'],
})
export class TrainingAssessmentComponent implements OnInit {
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
  empCode: any;
  userData: any;
  paginationPageSize = 20;
  rowDataAssessment: any;
  constructor(
    private clientStorage: ClientSideStorageService,
    private _commonUtilService: CommonUtilService,
    private router: Router,
    private dataSharing: DataSharingService,
    private _trainingAssmtService: TrainingAssessmentService
  ) {
    this.frameworkComponents = {
      startTestIcon: StartTestIconComponent,
      trainingTestStatus: TrainingTestStatusComponent,
    };
    this.userData = JSON.parse(this.clientStorage.get('loggedInUser'));
    this.empCode = this.userData.user.userName;
  }

  ngOnInit(): void {
    this.createColumnDefs();
    this.getAllTrainingAssessment();
  }

  clearSearch(e) {
    this.loanFilter = '';
    this.gridApi.setQuickFilter(this.loanFilter);
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

    header = this._commonUtilService.getColumnHeader(
      'training.trainingName',
      'Training Associated'
    );
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'testType.name',
      'Test Type'
    );
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'scheduledDate',
      'Scheduled Date'
    );
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('status', 'Status');
    header.width = 180;
    header.cellRenderer = 'trainingTestStatus';
    header.cellRendererParams = {};
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'Start Test',
      'Start Test'
    );
    header.width = 180;
    header.cellRenderer = 'startTestIcon';
    header.cellRendererParams = {
      inRouterLink: '/training/TestAssessment/edit_assessment',
      onClick: (params: any) => {
        this.dataSharing.setGlobalEditData(params.rowData);
      },
    };

    this.columnDefs.push(header);
  }

  getAllTrainingAssessment() {
    this._trainingAssmtService
      .getTraineeByEmpCode(this.empCode)
      .subscribe((response) => {
        if (response && response != null) {
          let data;
          response.data.forEach((assessment) => {
            assessment.scheduledDate = this.dateFormattergrid(
              assessment.scheduledDate
            );
          });
          data = response.data;
          let assessmentRes = [];
          data.forEach((res) => {
            if (res && res.assessmentQuestions) {
              if (
                res.assessmentQuestions.preQuestionList.length > 0 ||
                res.assessmentQuestions.postQuestionList.length > 0
              ) {
                if (res.assessmentQuestions.preQuestionList.length > 0) {
                  let item = JSON.parse(JSON.stringify(res));
                  item.assessmentQuestions =
                    res.assessmentQuestions.preQuestionList;
                  item.testType.name = 'Pre';
                  assessmentRes.push(item);
                }

                if (res.assessmentQuestions.postQuestionList.length > 0) {
                  let item = JSON.parse(JSON.stringify(res));
                  item.assessmentQuestions =
                    res.assessmentQuestions.postQuestionList;
                  item.testType.name = 'Post';
                  assessmentRes.push(item);
                }
              } else if (
                res.assessmentQuestions.dailyQuestionDTO.dailyQuestion
              ) {
                let data =
                  res.assessmentQuestions.dailyQuestionDTO.dailyQuestion;
                for (let key in data) {
                  let name = key;
                  let item = JSON.parse(JSON.stringify(res));
                  item.testType.name = key;
                  item.assessmentQuestions = data[name];
                  assessmentRes.push(item);
                }
              }
            }
          });
          this.rowDataAssessment = assessmentRes;
          this.recordCount = this.rowDataAssessment.length;
        }
      });
  }

  dateFormattergrid(date: Date) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

  onBtnClicked() {}

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.loanFilter);
  }
}
