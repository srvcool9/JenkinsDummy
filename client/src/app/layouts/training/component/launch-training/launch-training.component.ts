import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ColumnApi,
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
} from 'ag-grid-community';
import { event } from 'jquery';
import { NgToastService } from 'ng-angular-popup';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Entity } from 'src/app/layouts/baseline/model/entity.model';
import { PowerIconComponent } from 'src/app/layouts/core/power-icon/power-icon.component';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { CommonUtilService } from 'src/utils/common-util.service';
import { Constantss } from 'src/utils/constantss';
import { BatchMaster } from '../../model/batch-master';
import { Training } from '../../model/training';
import { GroupService } from '../../services/group.service';
import { InitiateTrainingService } from '../../services/initiate-training.service';
import { LaunchTrainingService } from '../../services/launch-training.service';
import { LaunchPopUpComponent } from './launch-pop-up/launch-pop-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-launch-training',
  templateUrl: './launch-training.component.html',
  styleUrls: ['./launch-training.component.scss'],
})
export class LaunchTrainingComponent implements OnInit {
  @ViewChild('primaryModal', { static: false })
  public primaryModal: ModalDirective;
  addChild: LaunchPopUpComponent;
  allGroupFromParent;
  groups = [];
  subGroups = [];
  trainings = [];
  training = new Training();
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
  id: Number;
  paginationPageSize = 20;
  launchTrainingForm: FormGroup;
  launchTrainingData: any = [];
  trainingGrid: any = []
  launchedOn: any;
  userId: any;
  loggedinUserArea:any
  data:any
  roleArea: any;
  initiateTrainingList: any = []
  groupName: any;
  subGroupName: any;

  constructor(
    private _groupService: GroupService,
    private _launchTrainingService: LaunchTrainingService,
    private fb: FormBuilder,
    private _commonUtilService: CommonUtilService,
    public modalService: NgbModal,
    private dataSharing: DataSharingService,
    private toast: NgToastService,
    private groupService: GroupService,
    private clientStorage: ClientSideStorageService,
    private _initiateTraining: InitiateTrainingService,
    private router: Router
  ) {
    this.data = this.dataSharing.getMenuList();
    this.loggedinUserArea = this.data.source._value;
    this.roleArea = this.loggedinUserArea.roleArea
    this.frameworkComponents = {
      powerIconComponent: PowerIconComponent,
    };
    this.userId = this.clientStorage.get('userId');
    this.getAllActiveGroups();
    this.createColumnDefs();
  }

  ngOnInit(): void {
    this.createFormAdd();
    this.getUserTrainings();
  }

  onStatusChanged(event) {
    this.launchedOn = new Date();
    const newEvent = event.split(' ');
    const stat = newEvent[0];
    const id = newEvent[1];
    this.launchTrainingData.forEach((launch) => {
      if (launch.batchId == id) {
        launch.launchDate = this.dateFormattergrid(this.launchedOn);
        launch.launchStatus.id = 64;
        let batchMaster = new BatchMaster();
        batchMaster = this.batchModel(launch);

        this._initiateTraining.saveBatch(batchMaster).subscribe(
          (response) => {
            if (response.status === '200') {
              this.launchTrainingData = [];
              for (let i = 0; i < this.trainingGrid.length; i++) {
                this.launchTrainingData.push(this.trainingGrid[i]);
                this.gridApi.setRowData(this.launchTrainingData);
              }

              this.toast.success({
                detail: Constantss.SUCCESS,
                summary: 'Batch has been launched successfully',
                duration: 10000,
              });
            }
          },
          (error) => {
            this.toast.error({
              detail: Constantss.ERROR,
              summary: error.error,
              duration: 10000,
            });
          }
        );
      }
    });
  }

  batchModel(data: any) {
    let batchMaster = new BatchMaster();
    batchMaster.batchId = data.batchId;
    batchMaster.launchDate = new Date();

    let entity = new Entity();
    entity.id = 64;
    entity.name = 'Launched';
    batchMaster.launchStatus = entity;

    let training = new Training();
    training.trainingId = data.training.trainingId;
    batchMaster.training = training;

    batchMaster.trainingArea = data.trainingArea;
    batchMaster.batchNumber = data.batchNumber;

    batchMaster.venue = data.venue;
    batchMaster.address = data.address;
    batchMaster.startDate = this.dateFormatter(data.startDate);
    batchMaster.endDate = data.endDate;
    batchMaster.startTime = data.startTime;
    batchMaster.endTime = data.endTime;
    batchMaster.createdBy = Number(this.userId);
    batchMaster.updatedBy = Number(this.userId);
    batchMaster.updatedOn = new Date();
    batchMaster.createdOn = new Date();

    return batchMaster;
  }

  dateFormatter(date: any) {
    let formatedDate;
    if (typeof date === 'string') {
      const [day, month, year] = date.split('-');
      formatedDate = new Date(+year, +month - 1, +day);
    }
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    return formatedDate
      ? formatDate(formatedDate, format, locale)
      : formatDate(date, format, locale);
  }

  getAllActiveGroups() {
    this._groupService.getTrainingGroups().subscribe((response) => {
      if (response && response.data !== null) {
      const groups = response.data;
      this.groups = groups.filter((grp) => grp.isActive === true);
      }
    });
  }

  // selectedGroup(event) {
  //   const subGroups = event.trainingSubGroupList;
  //   this.launchTrainingForm.controls['subGroup'].reset();
  //   this.launchTrainingData = [];
  //   this.subGroups = null;
  //   this.trainings = null;
  //   this.launchTrainingForm.controls['training'].reset();
  //   if (subGroups != null) {
  //     this.subGroups = subGroups.filter((subGrp) => subGrp.isActive);
  //   } else {
  //     this.subGroups = null;
  //   }
  // }

  // selectedSubGroup(event) {
  //   const trainings = event.trainingList;
  //   this.launchTrainingForm.controls['training'].reset();
  //   this.launchTrainingData = [];
  //   this.trainings = null;
  //   if (trainings != null) {
  //     this.trainings = trainings.filter((training) => training.isActive);
  //   } else {
  //     this.trainings = null;
  //   }
  // }

  selectedTraining(event) {
    // this.launchTrainingData = [];
    this.groupName = event.groupName;
    this.subGroupName = event.subGroupName
    this.groupService
      .getBatchesByTraining(event.trainingId)
      .subscribe((response) => {
        if (response && response.data !== null) {
        response.data.forEach((res) => {
          res.startDate = this.dateFormattergrid(res.startDate);
          if (res.launchDate != null) {
            res.launchDate = this.dateFormattergrid(res.launchDate);
          }
        });
        this.trainingGrid = response.data;
      }
      });
  }

  dateFormattergrid(date: Date) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

  createFormAdd() {
    this.launchTrainingForm = this.fb.group({
      group: [null],
      subGroup: [null],
      training: [null],
    });
  }

  viewBatches() {
    if (
      this.launchTrainingForm.value.group == '' ||
      this.launchTrainingForm.value.subGroup == '' ||
      this.launchTrainingForm.value.training == null
    ) {
    } else {
      const filter = this.launchTrainingData.filter(
        (f) => f.trainingId === this.trainingGrid.trainingId
      );
      if (filter.length === 0) {
        for (let i = 0; i < this.trainingGrid.length; i++) {
          this.launchTrainingData.push(this.trainingGrid[i]);
          this.gridApi.setRowData(this.launchTrainingData);
        }
        this.recordCount = this.launchTrainingData.length;
      } else {
        this.toast.error({
          detail: Constantss.ERROR,
          summary: 'This training has been already added.',
          duration: 10000,
        });
      }
    }
  }

  viewDetails(){
    this.router.navigate(["/training/initiateTraining"])
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
      'training.trainingName',
      'Training Initiated'
    );
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('batchNumber', 'Batch');
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('batchId', 'Batch Code');
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('startDate', 'Start Date');
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'launchDate',
      'Launched On'
    );
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'launchStatus.id',
      'Launch'
    );
    header.width = 200;
    header.cellRenderer = 'powerIconComponent';
    header.cellRendererParams = {
      onPowerIconClick: (params: any) => {
        this.onPowerBtnCLicked(params.rowData.batchId);
      },
    };
    this.columnDefs.push(header);
  }

  onPowerBtnCLicked(id: number) {
    this.id = id;
    this.primaryModal.show();
  }

  openModal() {
    const modalRef = this.modalService.open(LaunchPopUpComponent);
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

  getUserTrainings(){
    this._groupService.getAllUserRespectiveTrainings(this.roleArea).subscribe((response) => {
      if (response && response.data != null) {
        response.data.forEach((training) => {
          training.startDate = this.dateFormatGrid(training.startDate);
          training.endDate = this.dateFormatGrid(training.endDate);
          //this.initiateTrainingList = response.data.filter((t)=>t.trainingLevelId.id == this.roleTypeId);
        });        
        this.initiateTrainingList=response.data;
      }
    });
  }

  dateFormatGrid(date: Date) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }
}
