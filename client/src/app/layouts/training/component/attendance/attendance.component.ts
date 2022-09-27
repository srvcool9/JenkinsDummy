import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ColumnApi,
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
} from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CheckboxComponent } from 'src/app/layouts/core/checkbox/checkbox.component';
import { RemarkTextBoxComponent } from 'src/app/layouts/core/remark-text-box/remark-text-box.component';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { CommonUtilService } from 'src/utils/common-util.service';
import { RemarkPopUpComponent } from './remark-pop-up/remark-pop-up.component';
import { InitiateTrainingService } from '../../services/initiate-training.service';
import { formatDate } from '@angular/common';
import { AttendanceService } from '../../services/attendance.service';
import { NgToastService } from 'ng-angular-popup';
import { TraineeAttendance } from '../../model/trainee-attendance';
import { BatchMaster } from '../../model/batch-master';
import { Trainee } from '../../model/trainee';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { User } from 'src/app/views/pages/login/model/user.model';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { TrainerAttendance } from '../../model/trainer-attendance';
import { TrainerMaster } from '../../model/trainer-master';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  @ViewChild('primaryModal', { static: false })
  public primaryModal: ModalDirective;
  readOnly: boolean = false;
  allGroupFromParent;
  addChild: RemarkPopUpComponent;
  batchCode = [];
  training = [];
  session = [];
  markFor = [];
  isViewDisabled = true;
  trainings = [];
  loanFilter: any;
  recordCount;
  remark;
  trainee = false;
  trainer = false;
  columnDefs: any;
  frameworkComponents;
  types = [20, 50, 100];
  value: any;
  id: Number;
  gridApi: GridApi;
  columnApi: any;
  gridOptions = <GridOptions>{};
  paramsSelectRecord = {
    type: 'gridReady',
    api: GridApi,
    columnApi: ColumnApi,
  };
  paginationPageSize = 20;
  attendanceForm: FormGroup;
  attendanceData = [];
  idRmrk: Number;
  todaysDate: any;
  attendance: any;
  userId: any;
  traineeAttendance: TraineeAttendance[] = [];
  trainerAttendance: TrainerAttendance[] = [];
  constructor(
    private confirmationDialogueService: ConfirmationDialogService,
    private clientStorage: ClientSideStorageService,
    private fb: FormBuilder,
    private _commonUtilService: CommonUtilService,
    private dataSharing: DataSharingService,
    public modalService: NgbModal,
    private _initiateTraining: InitiateTrainingService,
    private _attendance: AttendanceService,
    private toast: NgToastService
  ) {
    this.frameworkComponents = {
      checkBoxIcon: CheckboxComponent,
      remarkTextBox: RemarkTextBoxComponent,
    };
    this.userId = this.clientStorage.get('userId');
    this.getCurrentDate();
    this.getLaunchedBatch();
    this.getSession();
    this.createColumnDefs();
    this.getTrainee();
  }

  ngOnInit(): void {
    this.createFormAdd();
  }

  getLaunchedBatch() {
    this._initiateTraining.getAllBatch().subscribe((response) => {
      if (response && response.data !== null) {
      const batches = response.data;
      this.batchCode = batches.filter((resp) => resp.launchStatus.id == 64);
      }
    });
  }

  selectedTraining(event) {
    // console.log(event);
  }

  selectedBatchCode(event) {
    if (
      this.attendanceForm.value.batchCode != null &&
      this.attendanceForm.value.session != null &&
      this.attendanceForm.value.markFor != null
    ) {
      this.isViewDisabled = false;
    } else {
      this.isViewDisabled = true;
    }
  }

  selectedSession(event) {
    if (
      this.attendanceForm.value.batchCode != null &&
      this.attendanceForm.value.session != null &&
      this.attendanceForm.value.markFor != null
    ) {
      this.isViewDisabled = false;
    } else {
      this.isViewDisabled = true;
    }
  }

  selectedMarkFor(event) {
    if (
      this.attendanceForm.value.batchCode != null &&
      this.attendanceForm.value.session != null &&
      this.attendanceForm.value.markFor != null
    ) {
      this.isViewDisabled = false;
    } else {
      this.isViewDisabled = true;
    }
  }

  createFormAdd() {
    this.attendanceForm = this.fb.group({
      batchCode: [null, [Validators.required]],
      session: [null, [Validators.required]],
      date: [this.todaysDate, [Validators.required]],
      markFor: [null, [Validators.required]],
    });
  }

  viewDetail() {
    if (this.attendanceForm.value.markFor === 1) {
      //Trainer
      this._attendance
        .getTrainersByBatchForAttendance(this.attendanceForm.value.batchCode)
        .subscribe((response) => {
          this.createColumnDefsTrainer();
          this.isViewDisabled = true;
          this.readOnly = true;
          if (response.data.length != 0) {
            for (let i = 0; i < response.data.length; i++) {
              this.attendanceData.push(response.data[i]);
              this.gridApi.setRowData(this.attendanceData);
              this.recordCount = this.attendanceData.length;
            }
          }
        });
    } else {
      this._attendance
        .getTraineesByBatchId(this.attendanceForm.value.batchCode)
        .subscribe((response) => {
          if (response.data.length != 0) {
            this.createColumnDefs();
            this.isViewDisabled = true;
            this.readOnly = true;
            for (let i = 0; i < response.data.length; i++) {
              this.attendanceData.push(response.data[i]);
              this.gridApi.setRowData(this.attendanceData);
              this.recordCount = this.attendanceData.length;
            }
          }
        });
    }
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
  getSession() {
    this.session = session;
  }

  getTrainee() {
    this.markFor = trainee;
  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
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

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader(
      'empCode.employeeCode',
      'Participant ID'
    );
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'empCode.employeeName',
      'Participant Name'
    );
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('isPresent', 'Attendance');
    header.width = 300;
    header.cellRenderer = 'checkBoxIcon';
    header.cellRendererParams = {
      onCheckBoxClick: (params) => {
        this.onCheckBoxClicked(params.rowData);
      },
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('remark', 'Remark');
    header.width = 300;
    header.cellRenderer = 'remarkTextBox';
    header.cellRendererParams = {
      onRemarkTextBox: (params: any) => {
        this.onRemarkIconClicked(params.rowData.traineeId);
      },
    };

    this.columnDefs.push(header);
  }

  createColumnDefsTrainer() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader(
      'trainer.trainerId',
      'Participant ID'
    );
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'trainer.trainerName',
      'Participant Name'
    );
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('isPresent', 'Attendance');
    header.width = 300;
    header.cellRenderer = 'checkBoxIcon';
    header.cellRendererParams = {
      onCheckBoxClick: (params) => {
        this.onCheckBoxClickedTrainer(params.rowData);
      },
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('remark', 'Remark');
    header.width = 300;
    header.cellRenderer = 'remarkTextBox';
    header.cellRendererParams = {
      onRemarkTextBox: (params: any) => {
        this.onRemarkIconClicked(params.rowData.trainer.trainerId);
      },
    };

    this.columnDefs.push(header);
  }

  onRemarkIconClicked(id: number) {
    this.id = id;
    this.primaryModal.show();
  }

  onCheckBoxClicked(params: any) {
    this.id = params.traineeId;
    this.attendanceData.forEach((att) => {
      if (att.traineeId === this.id) {
        att.isPresent = params.isPresent;
        if (att.isPresent == true) {
          att.remark = null;
        }
      }
    });
  }

  onCheckBoxClickedTrainer(params: any) {
    this.id = params.trainerId;
    this.attendanceData.forEach((att) => {
      if (att.trainer.trainerId === this.id) {
        att.isPresent = params.isPresent;
        if (att.isPresent == true) {
          att.remark = null;
        }
      }
    });
  }

  submit() {
    this.confirmationDialogueService
      .confirm('Confirmation', 'Do you want to save this information ?')
      .then((confirmed) => {
        if (confirmed) {
          this.attendanceData.forEach((a) => {
            if (a.isPresent == null && a.remark == null) {
              a.isPresent = false;
              a.remark = null;
            }
            if (a.isPresent == true) {
              a.remark = null;
            }
          });
          if (this.attendanceForm.value.markFor === 2) {
            let attendanceDataTrainee;
            attendanceDataTrainee = this.mapToModelTraineeAttendance(
              this.attendanceData
            );
            this._attendance
              .saveTraineeAttendance(attendanceDataTrainee)
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
            this.attendanceForm.controls['batchCode'].reset();
            this.attendanceForm.controls['session'].reset();
            this.attendanceForm.controls['markFor'].reset();
          } else if (this.attendanceForm.value.markFor === 1) {
            let attendanceDataTrainer;
            attendanceDataTrainer = this.mapToModelTrainerAttendance(
              this.attendanceData
            );
            this._attendance
              .saveTrainerAttendance(attendanceDataTrainer)
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
            this.attendanceForm.controls['batchCode'].reset();
            this.attendanceForm.controls['session'].reset();
            this.attendanceForm.controls['markFor'].reset();
          } else {
          }
          this.attendanceData = [];
          this.isViewDisabled = false;
          this.readOnly = false;
          this.recordCount = 0;
        }
      });
  }

  mapToModelTraineeAttendance(data: any) {
    let arr = [];
    data.forEach((d) => {
      let traineeAttendance = new TraineeAttendance();

      let batch = new BatchMaster();
      batch.batchId = this.attendanceForm.value.batchCode;
      traineeAttendance.batch = batch;

      traineeAttendance.session = this.attendanceForm.value.session;

      let trainee = new Trainee();
      trainee.traineeId = d.traineeId;
      traineeAttendance.trainee = trainee;

      traineeAttendance.attendance = d.isPresent;

      traineeAttendance.remark = d.remark;

      traineeAttendance.createdOn = new Date();
      traineeAttendance.updatedOn = new Date();

      traineeAttendance.createdBy = Number(this.userId);

      let user = new User();
      user.userId = this.userId;
      traineeAttendance.updatedBy = user;

      arr.push(traineeAttendance);
    });
    this.traineeAttendance = arr;
    return this.traineeAttendance;
  }

  mapToModelTrainerAttendance(data: any) {
    let arr = [];
    data.forEach((d) => {
      let trainerAttendance = new TrainerAttendance();
      let batch = new BatchMaster();
      batch.batchId = this.attendanceForm.value.batchCode;
      trainerAttendance.batch = batch;

      trainerAttendance.session = this.attendanceForm.value.session;

      let trainerMaster = new TrainerMaster();
      trainerMaster.trainerId = d.trainer.trainerId;
      trainerAttendance.trainerMaster = trainerMaster;

      trainerAttendance.attendance = d.isPresent;

      trainerAttendance.remark = d.remark;

      trainerAttendance.createdOn = new Date();
      trainerAttendance.updatedOn = new Date();

      trainerAttendance.createdBy = Number(this.userId);

      let user = new User();
      user.userId = this.userId;
      trainerAttendance.updatedBy = user;

      arr.push(trainerAttendance);
    });
    this.trainerAttendance = arr;
    return this.trainerAttendance;
  }

  openModal() {
    const modalRef = this.modalService.open(RemarkPopUpComponent);
    modalRef.result.then((result) => {}).catch((error) => {});
  }
  addModel() {
    this.id = 0;
    this.primaryModal.show();
    this.dataSharing.setGlobalEditData(null);
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

  onAddBtnClicked(event) {
    this.remark = event;
    if (this.attendanceForm.value.markFor === 2) {
      this.attendanceData.forEach((remrk) => {
        if (remrk.traineeId == this.id) {
          remrk.remark = this.remark;
          remrk.isPresent = false;
        }
      });
    } else {
      this.attendanceData.forEach((remrk) => {
        if (remrk.trainer.trainerId == this.id) {
          remrk.remark = this.remark;
          remrk.isPresent = false;
        }
      });
    }
  }

  getId(event) {
    this.idRmrk = event;
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

const trainee = [
  {
    id: 1,
    name: 'Trainer',
  },
  {
    id: 2,
    name: 'Trainee',
  },
];
