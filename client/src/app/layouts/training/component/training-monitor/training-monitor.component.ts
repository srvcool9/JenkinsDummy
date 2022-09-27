import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ColumnApi,
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
} from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RatingIconComponent } from 'src/app/layouts/core/rating-icon/rating-icon.component';
import { RemarkTextBoxComponent } from 'src/app/layouts/core/remark-text-box/remark-text-box.component';
import { CommonUtilService } from 'src/utils/common-util.service';
import { AttendanceService } from '../../services/attendance.service';
import { RemarkPopUpComponent } from '../attendance/remark-pop-up/remark-pop-up.component';
import { TrainerAttendanceVerification } from '../../model/trainer-attendance-verification';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { TrainerAttendance } from '../../model/trainer-attendance';
import { User } from 'src/app/views/pages/login/model/user.model';
import { AttendanceVerificationService } from '../../services/attendance-verification.service';
import { NgToastService } from 'ng-angular-popup';
import { formatDate } from '@angular/common';
import { TrainingService } from '../../services/training.service';
import { CheckboxDisabledComponent } from 'src/app/layouts/core/checkbox-disabled/checkbox-disabled.component';
import { VerifyStatusComponent } from 'src/app/layouts/core/verify-status/verify-status.component';
import { TrainerMaster } from '../../model/trainer-master';
import { TraineeAttendanceVerification } from '../../model/trainee-attendance-verification';
import { TraineeAttendance } from '../../model/trainee-attendance';
import { RedFlag } from '../../model/red-flag';
import { BatchMaster } from '../../model/batch-master';
import { InitiateTrainingService } from '../../services/initiate-training.service';
import { MonitorQuestionsVerification } from '../../model/monitor-questions-verification';
import { MonitorQuestions } from '../../model/monitor-questions';
import { Training } from '../../model/training';
import { MonitorComments } from '../../model/monitor-comments';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';

@Component({
  selector: 'app-training-monitor',
  templateUrl: './training-monitor.component.html',
  styleUrls: ['./training-monitor.component.scss'],
})
export class TrainingMonitorComponent implements OnInit {
  ratingForm: FormGroup;
  step = 1;
  connector =
    'HIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIII HIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIII';
  connectorC = 1;
  userId: any;
  trainerAttendanceVerificationPopulate: any;
  trainerData = [];
  participantData = [];
  trainingId: number;
  displayParticipantGrid = true;
  todaysDate: any;
  addChild: RemarkPopUpComponent;
  verifyAttendanceForm: FormGroup;
  ratingQuestionnaireForm: FormGroup;
  loanFilter: any;
  readOnly: boolean = false;
  recordCount;
  columnDefs: any;
  frameworkComponents;
  types = [20, 50, 100];
  value: any;
  gridApi: GridApi;
  gridApi1: GridApi;
  columnApi: any;
  gridOptions = <GridOptions>{};
  trainersList: Array<TrainerMaster>[] = [];
  gridOptionsTrainerOrTrainee = <GridOptions>{};
  paramsSelectRecord = {
    type: 'gridReady',
    api: GridApi,
    columnApi: ColumnApi,
  };
  batchCode: any = '';
  id: Number;
  isViewDisabled: boolean = true;
  session = [];
  checkFor = [];
  readOnlyBatchCode = false;
  searchBtnBatchCode = false;
  paginationPageSize = 20;
  @ViewChild('primaryModal', { static: false })
  public primaryModal: ModalDirective;
  allGroupFromParent;
  remark: any;
  idRmrk: any;
  trainerRating: TrainerAttendanceVerification[] = [];
  traineeAttendanceVerification: TraineeAttendanceVerification[] = [];
  trainerAttendanceVerification: TrainerAttendanceVerification[] = [];
  monitorQuestionVerifcation: MonitorQuestionsVerification[] = [];
  frameworkComponentsTrainerTrainee: any;
  batchCodeDS;
  ratingQuestionnaire;
  photosData = [];
  filterBySession = 0;
  formData = new FormData();
  ppm: any;
  frameworkComponentsRemovePhoto: any;
  constructor(
    private formBuilder: FormBuilder,
    private _commonUtilService: CommonUtilService,
    private _attendance: AttendanceService,
    private _attendanceVerification: AttendanceVerificationService,
    private toast: NgToastService,
    private trainingService: TrainingService,
    private attendanceService: AttendanceService,
    private clientSideStorage: ClientSideStorageService,
    private _initiateTrainingService: InitiateTrainingService
  ) {
    this.frameworkComponentsRemovePhoto = {
      deleteIconComponent: DeleteIconComponent,
    };
    this.frameworkComponents = {
      ratingIcon: RatingIconComponent,
      remarkTextBox: RemarkTextBoxComponent,
    };
    this.frameworkComponentsTrainerTrainee = {
      checkBoxIcon: CheckboxDisabledComponent,
      switchIcon: VerifyStatusComponent,
    };
    if (this.step == 1) {
      this.createColumnDefs();
    } else if (this.step == 2) {
      this.connectorC = 2;
      this.createColumnDefsTrainee();
    } else {
      this.createColumnDefsUploadPhotos();
      this.connectorC = 3;
      this.trainingService.getMonitorQuestions(2).subscribe((res) => {
        if (res && res.data !== null) {
          let arr = [];
          for (let i = 0; i < res.data.length; i++) {
            arr.push(this.BuildDyanamicForm(res.data[i]));
          }
          this.ratingQuestionnaireForm = this.formBuilder.group({
            ratingQuestions: this.formBuilder.array(arr),
            comments: [],
            uploadPhotos: [],
          });
          this.createColumnDefsUploadPhotos();
        }
      });
    }
    this.getTraineeOrTrainer();
    this.getCurrentDate();
    this.getSession();
    // this.batchCodeDS =  this.dataSharing.getBatchCode().source;
    this.batchCodeDS = this.clientSideStorage.get('batchCode');
    if (this.batchCodeDS != null && this.batchCodeDS !== '') {
      this.createRatingFormE();
    } else {
      this.createRatingFormA();
    }

    this.userId = this.clientSideStorage.get('userId');
  }

  ngOnInit(): void {
    this.createVerifyAttendanceForm();
    this.createRatingQuestionnaireForm();
  }

  BuildDyanamicForm(item) {
    return this.formBuilder.group({
      question: [item.question],
      monitorQuestionId: [item.monitorQuestionId],
      answer: [null],
      trainingId: [item.training.trainingId],
    });
  }

  createRatingQuestionnaireForm() {
    this.ratingQuestionnaireForm = this.formBuilder.group({
      ratingQuestions: this.formBuilder.array([]),
      comments: [],
      uploadPhotos: this.formBuilder.array([]),
    });
  }

  get ratingQuestion(): FormArray {
    return this.ratingQuestionnaireForm.get('ratingQuestions') as FormArray;
  }

  createRatingFormA() {
    this.ratingForm = this.formBuilder.group({
      batchCode: [
        Number(this.batchCode),
        [Validators.required, Validators.max(10)],
      ],
    });
  }

  createRatingFormE() {
    this.ratingForm = this.formBuilder.group({
      batchCode: [this.batchCodeDS, [Validators.required, Validators.max(10)]],
    });
  }

  createVerifyAttendanceForm() {
    this.verifyAttendanceForm = this.formBuilder.group({
      checkFor: [],
      session: [],
      date: [this.todaysDate],
    });
  }

  getCurrentDate() {
    const todaysDate = new Date();
    this.todaysDate = this.dateFormatters(todaysDate);
  }
  dateFormatters(date: any) {
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }
  previous() {
    this.connectorC--;
    this.step--;
    if (this.step === 1 && this.connectorC === 1) {
      this.clientSideStorage.set('batchCode', this.batchCode);
      // this.trainerData = [];
      // this.trainersList = [];
      this.createRatingFormA();
      this.createColumnDefs();
    } else if (this.step == 2 && this.connectorC == 2) {
      this.createColumnDefsTrainee();
      this.participantData = [];
      this.verifyAttendanceForm.controls['checkFor'].reset();
      this.verifyAttendanceForm.controls['session'].reset();
    }
  }

  getTraineeOrTrainer() {
    this.checkFor = traineeOrTrainer;
  }

  getSession() {
    this.session = session;
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }

  onGridReady(params: any, value: any) {
    this.gridReady(params, value);
  }

  onGridReadyTraineeTrainer(params: any, value: any) {
    this.gridReady(params, value);
  }

  onGridReadyPhotos(params: any, value: any) {
    this.gridReadyPhoto(params, value);
  }

  gridReady(params: any, value: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    if (value != null && value != undefined) {
      this.paginationPageSize = value;
      this.ngOnInit();
    } else {
      this.paginationPageSize = 20;
    }
  }

  gridReadyPhoto(params: any, value: any) {
    this.gridApi1 = params.api;
    this.columnApi = params.columnApi;
    if (value != null && value != undefined) {
      this.paginationPageSize = value;
      this.ngOnInit();
    } else {
      this.paginationPageSize = 20;
    }
  }

  selectedCheckFor(event) {
    if (
      this.verifyAttendanceForm.value.session != null &&
      this.verifyAttendanceForm.value.checkFor != null
    ) {
      this.isViewDisabled = false;
    } else {
      this.isViewDisabled = true;
    }
  }
  selectedSession(event) {
    if (
      this.verifyAttendanceForm.value.session != null &&
      this.verifyAttendanceForm.value.checkFor != null
    ) {
      this.isViewDisabled = false;
    } else {
      this.isViewDisabled = true;
    }
  }

  viewDetail() {
    if (this.verifyAttendanceForm.value.checkFor === 2) {
      //trainee
      this._attendanceVerification
        .getTraineeAttendanceListByBatchId(this.batchCodeDS)
        .subscribe((response) => {
          this.createColumnDefsTrainee();
          if (response.data.length != 0) {
            const filterBySession = response.data.filter(
              (data) => data.session === this.verifyAttendanceForm.value.session
            );
            if (filterBySession.length === 0) {
              this.displayParticipantGrid = false;
              this.filterBySession = 1;
            } else {
              for (let i = 0; i < filterBySession.length; i++) {
                this.participantData.push(filterBySession[i]);
                this.gridApi.setRowData(this.participantData);
              }
            }
          }
        });
    } else {
      this._attendanceVerification
        .getTrainerAttendanceByBatchId(this.batchCodeDS)
        .subscribe((response) => {
          this.createColumnDefsTrainer();
          if (response.data.length != 0) {
            const filterBySession = response.data.filter(
              (data) => data.session === this.verifyAttendanceForm.value.session
            );
            if (filterBySession.length === 0) {
              this.displayParticipantGrid = false;
              this.filterBySession = 1;
            } else {
              for (let i = 0; i < filterBySession.length; i++) {
                this.participantData.push(filterBySession[i]);
                this.gridApi.setRowData(this.participantData);
              }
            }
          }
        });
    }
  }

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader(
      'trainer.trainerId',
      'Trainer ID'
    );
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'trainer.trainerName',
      'Trainer Name'
    );
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('isPresent', 'Rating');
    header.width = 300;
    header.cellRenderer = 'ratingIcon';
    header.cellRendererParams = {
      onRatingClick: (params: any) => {
        this.onRatingIconClicked(params.rowData.trainer.trainerId);
      },
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'hasRemarkDisabled',
      'Remark'
    );
    header.width = 300;
    header.cellRenderer = 'remarkTextBox';
    header.cellRendererParams = {
      onRemarkTextBox: (params: any) => {
        this.onRemarkIconClicked(params.rowData.trainer.trainerId);
      },
    };

    this.columnDefs.push(header);
  }

  createColumnDefsTrainee() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader(
      'trainee.empCode.employeeCode',
      'Participant ID'
    );
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'trainee.empCode.employeeName',
      'Participant Name'
    );
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'attendance',
      'Attendance'
    );
    header.width = 300;
    header.cellRenderer = 'checkBoxIcon';
    header.cellRendererParams = {
      onCheckBoxClick: (params) => {},
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('verify', 'Verify');
    header.width = 300;
    header.cellRenderer = 'switchIcon';
    header.cellRendererParams = {
      onSwitchClick: (params: any) => {
        this.onSwitchIconClicked();
      },
    };

    this.columnDefs.push(header);
  }

  createColumnDefsUploadPhotos() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('name', 'Photo Name');
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('size', 'Size');
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('type', 'Type');
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Delete');
    header.width = 180;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'removeMonitorPhoto',
      onDeleteIconClick: this.onDeletBtnClicked.bind(this),
    };
    this.columnDefs.push(header);
  }

  onDeletBtnClicked(params) {
    let image = this.photosData.find((item) => item.name === params.data.name);
    this.photosData.splice(image, 1);
    this.gridApi1.setRowData(this.photosData);
  }

  createColumnDefsTrainer() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader(
      'trainerMaster.trainerId',
      'Participant ID'
    );
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'trainerMaster.trainerName',
      'Participant Name'
    );
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'attendance',
      'Attendance'
    );
    header.width = 300;
    header.cellRenderer = 'checkBoxIcon';
    header.cellRendererParams = {
      onCheckBoxClick: (params) => {},
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('verify', 'Verify');
    header.width = 300;
    header.cellRenderer = 'switchIcon';
    header.cellRendererParams = {
      onSwitchClick: (params: any) => {
        this.onSwitchIconClicked();
      },
    };

    this.columnDefs.push(header);
  }

  onRaiseRedFlagClicked() {
    this.id = this.batchCode;
    this.primaryModal.show();
  }

  onRemarkIconClicked(id: number) {
    this.id = id;
    this.primaryModal.show();
  }

  onSwitchIconClicked() {}

  searchByBatchCode() {
    this._attendance
      .getTrainersByBatchForAttendance(this.ratingForm.value.batchCode)
      .subscribe(
        (response) => {
          if (response.data.length != 0) {
            this.readOnlyBatchCode = true;
            this.searchBtnBatchCode = true;
            this.createColumnDefs();
            for (let i = 0; i < response.data.length; i++) {
              this.trainerData.push(response.data[i]);
              this.gridApi.setRowData(this.trainerData);
              this.recordCount = this.trainerData.length;
            }
          }
        },
        (error) => {
          this.toast.error({
            detail: 'Error',
            summary: error.error,
            duration: 10000,
          });
        }
      );
  }

  next() {
    if (this.step === 1) {
      this.createColumnDefsTrainee();
      if (this.trainerData.length != 0) {
        this.trainerData.forEach((data) => {
          if (data.remark === undefined) {
            data.remark = null;
          }
          if (data.rating === undefined) {
            data.rating = null;
          }
        });
        this.batchCode = this.ratingForm.value.batchCode;
        this.clientSideStorage.set('batchCode', this.batchCode);
        // this.dataSharing.setBatchCode(this.batchCode);
        let trainerRating;
        trainerRating = this.mapToModelTrainerRating(this.trainerData);
        this._attendanceVerification
          .saveTrainerAttendanceVerification(trainerRating)
          .subscribe(
            (response) => {
              if (response.status === '200') {
                this.trainerAttendanceVerificationPopulate = response.data;
                this.toast.success({
                  detail: 'Success',
                  summary: response.message,
                  duration: 10000,
                });
                this.trainingService
                  .getMonitorQuestions(this.batchCode)
                  .subscribe((res) => {
                    if (res && res.data !== null) {
                      let arr = [];
                      for (let i = 0; i < res.data.length; i++) {
                        arr.push(this.BuildDyanamicForm(res.data[i]));
                      }
                      this.ratingQuestionnaireForm = this.formBuilder.group({
                        ratingQuestions: this.formBuilder.array(arr),
                        comments: [],
                        uploadPhotos: this.formBuilder.array([]),
                      });
                      this.createColumnDefsUploadPhotos();
                    }
                  });
              }
            },
            (error) => {
              this.toast.error({
                detail: 'Error',
                summary: error.error,
                duration: 10000,
              });
            }
          );
      }
      if (this.trainersList.length != 0) {
        this.trainersList.forEach((data: any) => {
          if (data.remark === undefined) {
            data.remark = null;
          }
          if (data.rating === undefined) {
            data.rating = null;
          }
        });
        this.batchCode = this.ratingForm.value.batchCode;
        this.clientSideStorage.set('batchCode', this.batchCode);
        let trainerRating;
        trainerRating = this.mapToModelTrainerRating(this.trainersList);
        this._attendanceVerification
          .saveTrainerAttendanceVerification(trainerRating)
          .subscribe(
            (response) => {
              if (response.status === '200') {
                this.trainerAttendanceVerificationPopulate = response.data;
                this.toast.success({
                  detail: 'Success',
                  summary: response.message,
                  duration: 10000,
                });
              }
            },
            (error) => {
              this.toast.error({
                detail: 'Error',
                summary: error.error,
                duration: 10000,
              });
            }
          );
      }

      this.ratingForm.controls['batchCode'].reset();
      this.connectorC++;
      this.step++;
      this.createColumnDefsTrainee();
    } else if (this.step == 2 && this.connectorC == 2) {
      if (this.verifyAttendanceForm.controls['checkFor'].value === 2) {
        this.participantData.forEach((pData) => {
          if (pData.verify === undefined) {
            pData.verify = true;
          }
        });
        let traineeAttendanceVerification;
        traineeAttendanceVerification =
          this.mapToModelTraineeAttendanceVerification(this.participantData);
        this._attendanceVerification
          .saveTraineeAttendanceVerification(traineeAttendanceVerification)
          .subscribe(
            (response) => {
              if (response.status === '200') {
                this.toast.success({
                  detail: 'Success',
                  summary: response.message,
                  duration: 10000,
                });
              }
            },
            (error) => {
              this.toast.error({
                detail: 'Error',
                summary: error.error,
                duration: 10000,
              });
            }
          );
        this.connectorC++;
        this.step++;
        this.createColumnDefsUploadPhotos();
      } else {
        //trainer
        this.participantData.forEach((pData) => {
          if (pData.verify === undefined) {
            pData.verify = true;
          }
        });
        let trainerAttendanceVerification;
        trainerAttendanceVerification =
          this.mapToModelTrainerAttendaceVerificationStep2(
            this.participantData
          );
        this._attendanceVerification
          .saveTrainerAttendanceVerification(trainerAttendanceVerification)
          .subscribe(
            (response) => {
              if (response.status === '200') {
                this.toast.success({
                  detail: 'Success',
                  summary: response.message,
                  duration: 10000,
                });
              }
            },
            (error) => {
              this.toast.error({
                detail: 'Error',
                summary: error.error,
                duration: 10000,
              });
            }
          );
      }
    } else {
      // this.connectorC++;
      // this.step++;
      this.ppm = new Blob([JSON.stringify(this.photosData)], {
        type: 'application/json',
      });
      this.formData.append('image', this.ppm);
      // this.ratingQuestionnaireForm.value.uploadPhotos = this.photosData;
      this.ratingQuestionnaireForm.value.comments;
      let monitorQuestionVerifcation;
      monitorQuestionVerifcation = this.mapToModelMonitorQuestionVerification(
        this.ratingQuestionnaireForm.value.ratingQuestions
      );
      this.trainingService
        .saveMonitorQuesVerification(monitorQuestionVerifcation)
        .subscribe((response) => {
          if (response.status === '200') {
            let updateMonitorComments = new MonitorComments();
            updateMonitorComments = this.mapToModelMonitorComment(
              this.ratingQuestionnaireForm.value
            );
            this.trainingService
              .saveMonitorPhotos(this.formData, this.batchCode)
              .subscribe();
            this.trainingService
              .saveMonitorComments(updateMonitorComments)
              .subscribe();
          }
        });
    }
  }

  mapToModelMonitorComment(data: any) {
    let updateMonitorComments = new MonitorComments();
    updateMonitorComments.comment = data.comments;
    let batchMaster = new BatchMaster();
    batchMaster.batchId = this.batchCode;
    updateMonitorComments.batchMaster = batchMaster;
    updateMonitorComments.createdBy = Number(this.userId);
    updateMonitorComments.createdOn = new Date();
    let updatedBy = new User();
    updatedBy.userId = this.userId;
    updateMonitorComments.updatedBy = updatedBy;
    updateMonitorComments.updatedOn = new Date();
    return updateMonitorComments;
  }

  mapToModelTrainerAttendaceVerificationStep2(data: any) {
    let arr = [];
    data.forEach((data) => {
      let trainerAttendanceVerification = new TrainerAttendanceVerification();
      trainerAttendanceVerification.createdBy = Number(this.userId);
      trainerAttendanceVerification.createdOn = new Date();
      trainerAttendanceVerification.updatedOn = new Date();
      let updatedBy = new User();
      updatedBy.userId = this.userId;
      trainerAttendanceVerification.updatedBy = updatedBy;
      let trainerAttendance = new TrainerAttendance();
      trainerAttendance.trainerAttendanceId = data.trainerAttendanceId;
      trainerAttendanceVerification.trainerAttendance = trainerAttendance;
      trainerAttendanceVerification.verify = data.verify;
      let trainer = new TrainerMaster();
      trainer.trainerId = data.trainerMaster.trainerId;
      trainerAttendanceVerification.trainer = trainer;
      let batch = new BatchMaster();
      batch.batchId = data.batch.batchId;
      trainerAttendanceVerification.batch = batch;
      arr.push(trainerAttendanceVerification);
    });
    this.trainerAttendanceVerification = arr;
    return this.trainerAttendanceVerification;
  }

  mapToModelMonitorQuestionVerification(data: any) {
    let arr = [];
    data.forEach((data) => {
      let monitorQuestionVerifcation = new MonitorQuestionsVerification();
      let monitorQuestions = new MonitorQuestions();
      monitorQuestions.monitorQuestionId = data.monitorQuestionId;
      monitorQuestionVerifcation.monitorQuestions = monitorQuestions;
      let training = new Training();
      training.trainingId = data.trainingId;
      monitorQuestionVerifcation.training = training;
      monitorQuestionVerifcation.answer = data.answer;
      let batchMaster = new BatchMaster();
      batchMaster.batchId = 1; //this.batchCode;
      monitorQuestionVerifcation.batchMaster = batchMaster;
      monitorQuestionVerifcation.updatedOn = new Date();
      monitorQuestionVerifcation.createdOn = new Date();
      monitorQuestionVerifcation.createdBy = Number(this.userId);
      let updatedBy = new User();
      updatedBy.userId = this.userId;
      monitorQuestionVerifcation.updatedBy = updatedBy;
      arr.push(monitorQuestionVerifcation);
    });
    this.monitorQuestionVerifcation = arr;
    return this.monitorQuestionVerifcation;
  }

  mapToModelTraineeAttendanceVerification(data: any) {
    let arr = [];
    data.forEach((data) => {
      let traineeAttendanceVerification = new TraineeAttendanceVerification();
      traineeAttendanceVerification.createdBy = Number(this.userId);
      traineeAttendanceVerification.createdOn = new Date();
      let traineeAttendance = new TraineeAttendance();
      traineeAttendance.trainingAttendanceId = data.trainingAttendanceId;
      traineeAttendanceVerification.traineeAttendance = traineeAttendance;
      traineeAttendanceVerification.verify = data.verify;
      let user = new User();
      user.userId = this.userId;
      traineeAttendanceVerification.updatedBy = user;
      traineeAttendanceVerification.updatedOn = new Date();
      arr.push(traineeAttendanceVerification);
    });
    this.traineeAttendanceVerification = arr;
    return this.traineeAttendanceVerification;
  }
  mapToModelTrainerRating(data: any) {
    let arr = [];
    data.forEach((d) => {
      let trainerAttendanceVerification = new TrainerAttendanceVerification();
      trainerAttendanceVerification.createdBy = Number(this.userId);
      trainerAttendanceVerification.createdOn = new Date();
      trainerAttendanceVerification.rating = d.rating;
      trainerAttendanceVerification.ratingRemark = d.remark;

      let batch = new BatchMaster();
      batch.batchId = this.batchCode;
      trainerAttendanceVerification.batch = batch;

      let trainer = new TrainerMaster();
      trainer.trainerId = d.trainer.trainerId;
      trainerAttendanceVerification.trainer = trainer;

      let user = new User();
      user.userId = this.userId;
      trainerAttendanceVerification.updatedBy = user;
      trainerAttendanceVerification.updatedOn = new Date();
      arr.push(trainerAttendanceVerification);
    });

    this.trainerRating = arr;
    return this.trainerRating;
  }

  onRatingIconClicked(id: number) {}

  mapToModelRedFlag(remark: any, idRemark: any) {
    let redFlag = new RedFlag();
    let batchId = new BatchMaster();
    batchId.batchId = idRemark;
    redFlag.batchId = batchId;
    let user1 = new User();
    user1.userId = this.userId;
    redFlag.createdBy = user1;
    redFlag.createdOn = new Date();
    let user = new User();
    user.userId = this.userId;
    redFlag.updatedBy = user;
    redFlag.updatedOn = new Date();
    redFlag.remark = remark;
    return redFlag;
  }

  onAddBtnClicked(event) {
    this.remark = event;
    if (this.filterBySession === 1) {
      let redFlag = new RedFlag();
      redFlag = this.mapToModelRedFlag(this.remark, this.idRmrk);
      this._attendanceVerification.saveRedFlag(redFlag).subscribe(
        (response) => {
          if (response.status === '200') {
            this.toast.success({
              detail: 'Success',
              summary: response.message,
              duration: 10000,
            });
          }
        },
        (error) => {
          this.toast.error({
            detail: 'Error',
            summary: error.error,
            duration: 10000,
          });
        }
      );
    }

    if (this.trainerData.length != 0) {
      this.trainerData.forEach((data) => {
        if (data.trainer.trainerId === this.id) {
          data.remark = this.remark;
        }
      });
    }
    if (this.trainersList.length != 0) {
      this.trainersList.forEach((data: any) => {
        if (data.trainer.trainerId === this.id) {
          data.remark = this.remark;
        }
      });
    }
  }

  getId(event) {
    this.idRmrk = event;
  }

  changeIndicator = (callAddRole) => {
    this.id = 0;
    if (callAddRole == 'cancel') {
      this.primaryModal.hide();
    } else {
      this.primaryModal.hide();
    }
  };

  dataLoaded(child: string) {}

  uploadDoc(event: any) {
    let files = event.target.files[0];
    let typeImage = files.type.split('/');
    let imagetypeAsString = typeImage[0];
    let doctype = files.name.split('.');
    let doctypeName = doctype[doctype.length - 1];
    doctypeName = doctypeName.toLowerCase();
    if (
      doctypeName &&
      (doctypeName === 'jpg' || doctypeName === 'jpeg' || doctypeName === 'png')
    ) {
      let formData = new FormData();
      formData.append('file', files);
      this.trainingService.readQrCode(formData).subscribe((res) => {
        if (res != undefined && res != null) {
          this.batchCodeDS = res.data[0];
          this.createRatingFormE();
          this.attendanceService
            .getTrainersByBatchId(res.data[0])
            .subscribe((response) => {
              if (response != null) {
                this.trainingId = response.data[0].batch.training.trainingId;
                this.trainersList = response.data;
              }
            });
        }
      });
    } else if (imagetypeAsString && imagetypeAsString === 'image') {
    }
    event.target.value = '';
  }

  uploadPhotos(e) {
    this.photosData.push(e.target.files[0]);
    this.gridApi1.setRowData(this.photosData);
    // this.createColumnDefsUploadPhotos();
  }

  submit() {
    let submitData = this.ratingQuestionnaireForm.value;
    this.ratingForm.value.batchCode;
    this._initiateTrainingService
      .saveMonitorQuestionsVerification(submitData)
      .subscribe();
  }
}

const session = [
  {
    id: 1,
    name: 'Morning',
  },
  {
    id: 2,
    name: 'Evening',
  },
];

const traineeOrTrainer = [
  {
    id: 1,
    name: 'Trainer',
  },
  {
    id: 2,
    name: 'Trainee',
  },
];

const resp = {
  status: '200',
  message: ' Data Fetched Successfully',
  data: [
    {
      trainerId: 9,
      trainerName: 'yus',
    },
    {
      trainerId: 11,
      trainerName: 'oim',
    },
    {
      trainerId: 12,
      trainerName: 'sree',
    },
  ],
};
