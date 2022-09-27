import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
} from 'ag-grid-community';
import { Trainee } from '../../model/trainee';
import * as moment from 'moment';
import { NgToastService } from 'ng-angular-popup';
import { Entity } from 'src/app/layouts/baseline/model/entity.model';
import { RegistrationService } from 'src/app/layouts/baseline/service/registration.service';
import { ManageUserService } from 'src/app/layouts/configurations/service/manage user service/manage-user.service';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { UrlFormationService } from 'src/app/layouts/shared/services/url-formation.service';
import { CommonUtilService } from 'src/utils/common-util.service';
import { Constantss } from 'src/utils/constantss';
import * as XLSX from 'xlsx';
import { InitiateTrainingService } from '../../services/initiate-training.service';
import { BatchInitiate } from '../../model/batch-initiate';
import { Training } from '../../model/training';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BatchMaster } from '../../model/batch-master';
import { TrainerMaster } from '../../model/trainer-master';
import { Coordinator } from '../../model/coordinator.model';
import { EmpCode } from 'src/app/views/pages/model/emp-code';
import { Bank } from 'src/app/layouts/baseline/model/bank.model';
import { runInThisContext } from 'vm';
import { EntityMaster } from '../../model/entity-master';
import { GroupService } from '../../services/group.service';
import { TrainingArea } from '../../model/training-area';

@Component({
  selector: 'app-form-initiate-training',
  templateUrl: './form-initiate-training.component.html',
  styleUrls: ['./form-initiate-training.component.scss'],
})
export class FormInitiateTrainingComponent implements OnInit {
  connector =
    'HIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIII';
  connectorC = 1;
  batchMasterAdd: boolean = true;
  batchInitiate = new BatchInitiate();
  trainer: any;
  trainerType = [];
  batchNumber = [];
  coordinatorList = [];
  isEmployee: boolean = false;
  isOthers: boolean = false;
  checkList;
  step = 1;
  disableBatch: boolean = false;
  readOnlytrainerInfo: boolean = false;
  batch: BatchMaster;
  batchForm: FormGroup;
  batchMasterForm: FormGroup;
  saveBatchMasterSuccess: boolean = true;
  // (inside trainer form)
  othersForm: FormGroup;
  batchForm_step = false;
  batchInfoForm_step = false;
  trainingInfoForm_step = false;
  CoordinatorForm_step = false;
  trainingData;
  trainingMasterData;
  roleTypeId: any;
  excelData: any;
  employeeList = [];
  empList = [];
  othersList = [];
  otherListsss = [];
  traineeList = [];
  gridOptionsEmployee = <GridOptions>{};
  gridOptionsOthers = <GridOptions>{};
  gridOptionsCoordinators = <GridOptions>{};
  columnDefsEmployee;
  columnDefsOthers;
  columnDefsCoordinators;
  gridApi: GridApi;
  gridApi1: GridApi;
  startDate;
  endDate;
  frameworkComponents;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  bankList: Entity[];
  fileUploadplaceHolder;
  res: TrainerMaster[] = [];
  fileName;
  fData = new FormData();
  totalBatch: any;
  empCode;
  userId;
  batchNumberValue: any;
  trainingId: any;
  batchInitiateId: any;
  dropdownSettings: IDropdownSettings = {};
  checkListItemss;
  dataInitiateTraining: any;
  batchesList: Array<BatchMaster> = [];
  batchId: number;
  finalSubmitResult: any[];
  result: any[];
  edit: boolean = false;
  add: boolean = true;
  batchNumberEdit = [];
  batchData: BatchMaster;
  minimumTrainer: any;
  trainerMaster = new TrainerMaster();
  batchMasterSaved: boolean = false;
  trainingAreaStatusSubmit: any[];
  trainingAreaStatusFinalSubmit: any[];
  constructor(
    private confirmationDialogueService: ConfirmationDialogService,
    private router: Router,
    private fb: FormBuilder,
    private dataSharing: DataSharingService,
    private clientStorage: ClientSideStorageService,
    private _commonUtilService: CommonUtilService,
    private registrationService: RegistrationService,
    private toast: NgToastService,
    private userService: ManageUserService,
    private _initiateTrainingService: InitiateTrainingService,
    private _groupService: GroupService
  ) {
    this.trainingMasterData = this.dataSharing.getGlobalEditData().source;
    this.trainingData = this.trainingMasterData.value;
    this.minimumTrainer = this.trainingData.minimumTrainer;
    this.trainingId = this.trainingData.trainingId;
    this.getEditBatchInititateData(this.trainingId);
    this.getEditBatches(this.trainingId);
    this.createBatchForm();
    this.frameworkComponents = {
      deleteIconComponent: DeleteIconComponent,
    };
    this.createColumnDefsEmployee();
    this.createColumnDefsOthers();
    this.checkListItems();
    this.getTrainerType();
    this.getBanks();
    this.createDyBatchNumber();
    this.getCheckListItems();
    let parsedStartDate = moment(this.trainingData.startDate, 'DD-MM-YYYY');
    this.startDate = parsedStartDate.format('YYYY-MM-DD');
    let parsedEndDate = moment(this.trainingData.endDate, 'DD-MM-YYYY');
    this.endDate = parsedEndDate.format('YYYY-MM-DD');
    this.roleTypeId = this.clientStorage.get('roleTypeId');
    const userId = this.clientStorage.get('userId');
    this.userId = userId;
  }

  getEditBatchInititateData(trainingId) {
    this._initiateTrainingService
      .getBatchInititate(trainingId)
      .subscribe((resp) => {
        if (resp && resp.data.length != 0) {
          this.batchInitiate = resp.data[0];
          this.createBatchEditForm();
        } else {
          this.createBatchForm();
        }
      });
  }

  getEditBatches(trainingId) {
    this._initiateTrainingService.getBatches(trainingId).subscribe((resp) => {
      if (resp) {
        if (resp.data != null) {
          this.batchMasterAdd = false;
          this.batchesList = resp.data;
        } else {
          this.batchMasterAdd = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.createBatchInfoForm();
    this.createOthersForm();
    this.dropdownSettings = {
      idField: 'checkListItemId',
      textField: 'checkListItemName',
    };
    this.getBatchNumberEdit();
  }

  createBatchForm() {
    this.batchForm = this.fb.group({
      batchinitiateId: [],
      maxBatchSize: [this.trainingData.maximumBatchSize],
      numOfParticipants: ['', [Validators.required]],
      numOfRooms: ['', [Validators.required]],
      totalBatches: [],
      cycles: [],
    });
  }
  createBatchEditForm() {
    this.batchForm = this.fb.group({
      batchinitiateId: [this.batchInitiate.batchinitiateId],
      maxBatchSize: [this.trainingData.maximumBatchSize],
      numOfParticipants: [
        this.batchInitiate.tentitiveParticipants,
        [Validators.required],
      ],
      numOfRooms: [this.batchInitiate.noOfRooms, [Validators.required]],
      totalBatches: [this.batchInitiate.calculatedBatch],
      cycles: [this.batchInitiate.cycle],
    });
  }

  getEmpCode(e) {
    this.empCode = e.target.value;
  }

  saveOthersFormData() {
    this.othersList.push(this.othersForm.value);
    this.gridApi1.setRowData(this.othersList);
  }

  saveOthersInfo() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_SAVE)
      .then((confirmed) => {
        if (confirmed) {
          let trainerMaster;
          trainerMaster = this.mapToModelOthersTrainer(this.othersList);
          this._initiateTrainingService
            .saveTrainer(trainerMaster, this.batchId)
            .subscribe((response) => {
              if (response.status === '200') {
                this.toast.success({
                  detail: Constantss.SUCCESS,
                  summary: response.message,
                  duration: 10000,
                });
                this.othersList = [];
              } else {
                this.toast.error({
                  detail: 'Error',
                  summary: response.message,
                  duration: 10000,
                });
              }
            });
          this.readOnlytrainerInfo = false;
        }
      });
  }

  mapToModelOthersTrainer(data: any) {
    let arr = [];
    data.forEach((datas) => {
      let trainerMaster = new TrainerMaster();
      trainerMaster.IFSCcode = datas.IFSC;
      trainerMaster.aadharNo = datas.aadhar;
      trainerMaster.acountHolder = datas.nameAsInBank;
      trainerMaster.bankAccountNo = datas.accountNumber;
      let bank = new Bank();
      bank.bankId = datas.bank;
      trainerMaster.bankId = bank;
      trainerMaster.email = datas.email;
      trainerMaster.trainerName = datas.name;
      trainerMaster.organizationName = datas.organizationName;
      trainerMaster.mobile = datas.mobile;
      arr.push(trainerMaster);
    });
    this.res = arr;
    return this.res;
  }

  addEmp() {
    this.disableBatch = true;
    this.userService.getUserDataById(this.empCode).subscribe((response) => {
      if (response && response.data !== null) {
      response.data.forEach((element) => {
        element.state = 'Madhya Pradesh';
        element.batch = this.batchData;
      });
      if (response.data.length === 0) {
        this.toast.error({
          detail: Constantss.ERROR,
          summary:
            'No data found for employee ' + this.empCode.toUpperCase() + '!',
          duration: 5000,
        });
      } else {
        const filter = this.employeeList.filter(
          (e) =>
            e.employeeCode === this.empCode.toUpperCase() &&
            e.batch.batchId === this.batchData.batchId
        );
        if (filter.length === 0) {
          this.employeeList.push(response.data[0]);
          this.gridApi.setRowData(this.employeeList);
        } else {
          this.toast.error({
            detail: Constantss.ERROR,
            summary:
              'Employee code : ' +
              this.empCode.toUpperCase() +
              ' is already added.',
            duration: 5000,
          });
        }
      }
    }
    });
  }

  addEmpTrainee() {
    if (this.batchData == undefined) {
      this.toast.error({
        detail: Constantss.ERROR,
        summary: 'Select a batch number',
        duration: 10000,
      });
    } else {
      const maxBatchSize = this.trainingData.maximumBatchSize;
      this.disableBatch = true;
      this.userService.getUserDataById(this.empCode).subscribe((response) => {
        if (response && response.data !== null) {
        response.data.forEach((element) => {
          element.state = 'Madhya Pradesh';
          element.batch = this.batchData;
        });
        if (response.data.length === 0) {
          this.toast.error({
            detail: Constantss.ERROR,
            summary:
              'No data found for employee ' + this.empCode.toUpperCase() + '!',
            duration: 5000,
          });
        } else {
          const filter = this.employeeList.filter(
            (e) =>
              e.employeeCode === this.empCode.toUpperCase() &&
              e.batch.batchId === this.batchData.batchId
          );
          if (filter.length === 0) {
            if (this.employeeList.length + 1 > maxBatchSize) {
              this.toast.info({
                detail: 'Info',
                summary:
                  'Maximum ' +
                  maxBatchSize +
                  ' Trainees can be added in this batch',
                duration: 10000,
              });
            } else {
              this.employeeList.push(response.data[0]);
              this.gridApi.setRowData(this.employeeList);
            }
          } else {
            this.toast.error({
              detail: Constantss.ERROR,
              summary:
                'Employee code : ' +
                this.empCode.toUpperCase() +
                ' is already added.',
              duration: 5000,
            });
          }
        }
      }
      });
    }
  }

  get numOfParticipants() {
    return this.batchForm.get('numOfParticipants');
  }

  get numOfRooms() {
    return this.batchForm.get('numOfRooms');
  }

  createOthersForm() {
    this.othersForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9 ]+$'),
        ],
      ],
      city: [''],
      state: [''],
      mobile: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      organizationName: ['', [Validators.maxLength(200)]],
      aadhar: [
        '',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      bank: [null, [Validators.required]],
      IFSC: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern('^[A-Za-z]{4}0[A-Z0-9a-z]{6}$'),
        ],
      ],
      bankBranch: ['', [Validators.required]],
      nameAsInBank: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9 ]+$'),
        ],
      ],
      accountNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(18),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      batchNumber: [this.batchNumberValue],
      // checkListItems: []
    });
  }

  getCheckListItems() {
    this._initiateTrainingService
      .getTrainingCheckLis(this.trainingId)
      .subscribe((res) => {
        if (res.data.length != 0) {
          this.checkListItemss = res.data[0].checkListItems;
        }
      });
  }

  getEndDate(event) {
    const startDate = new Date(
      this.batchMasterForm.get('startDate').value
    ).getTime();
    const endDate = new Date(event.target.value).getTime();
    if (startDate > endDate) {
      document.getElementById('errorEndDate').innerHTML =
        'End Date must be greater than or equal to Start Date';
      document.getElementById('errorEndDate').style.color = 'red';
      this.batchMasterForm.controls['endDate'].setValue('');
    } else {
      document.getElementById('errorEndDate').innerHTML = '';
    }
  }

  getEndTime(event) {
    const startTime = this.batchMasterForm.controls['startTime'].value;
    const endTime = event.target.value;
    if (startTime > endTime) {
      document.getElementById('error').innerHTML =
        'End Time must be greater than Start Time';
      document.getElementById('error').style.color = 'red';
      this.batchMasterForm.controls['endTime'].setValue('');
    } else {
      document.getElementById('error').innerHTML = '';
    }
  }

  get name() {
    return this.othersForm.get('name');
  }

  get accountNumber() {
    return this.othersForm.get('accountNumber');
  }

  get nameAsInBank() {
    return this.othersForm.get('nameAsInBank');
  }

  get city() {
    return this.othersForm.get('city');
  }

  get email() {
    return this.othersForm.get('email');
  }

  get state() {
    return this.othersForm.get('state');
  }

  get mobile() {
    return this.othersForm.get('mobile');
  }

  get organizationName() {
    return this.othersForm.get('organizationName');
  }

  get aadhar() {
    return this.othersForm.get('aadhar');
  }

  get bank() {
    return this.othersForm.get('bank');
  }

  get IFSC() {
    return this.othersForm.get('IFSC');
  }

  get bankBranch() {
    return this.othersForm.get('bankBranch');
  }

  getNumberOfParticipants(event) {
    const numberOfDays = event.target.value;
    const maxBatchSize = this.batchForm.get('maxBatchSize').value;
    this.batchForm.controls['totalBatches'].setValue(
      Math.round(numberOfDays / maxBatchSize)
    );
    const totalBatches = this.batchForm.get('totalBatches').value;
    const numOfRooms = this.batchForm.get('numOfRooms').value;
    if (totalBatches != null && numOfRooms != null) {
      this.batchForm.controls['cycles'].setValue(
        Math.ceil(totalBatches / numOfRooms)
      );
    }
  }

  getNumberOfRooms(event) {
    const numberOfRooms = event.target.value;
    const totalBatches = this.batchForm.get('totalBatches').value;
    if (Math.round(totalBatches / numberOfRooms) === 0) {
      this.batchForm.controls['cycles'].setValue(1);
    } else {
      this.batchForm.controls['cycles'].setValue(
        Math.round(totalBatches / numberOfRooms)
      );
    }
  }

  createDyBatchNumber() {
    for (let i = 0; i < this.totalBatch; i++) {
      this.batchNumber[i] = {
        batchId: i + 1,
        batchNumber: i + 1,
      };
    }
  }

  getBatchNumberEdit() {
    this._initiateTrainingService
      .getBatches(this.trainingId)
      .subscribe((resp) => {
        if (resp && resp !== null) {
          this.batchNumberEdit = resp.data;
        }
      });
  }

  createBatchInfoForm() {
    this.batchMasterForm = this.fb.group({
      batchId: [],
      batchNumber: [null, [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      trainerType: [null, [Validators.required]],
      venue: ['', [Validators.maxLength(150)]],
      address: ['', [Validators.maxLength(250)]],
      checkListItems: [null],
    });
  }

  uploadTraineeList(event: any) {
    this.excelData = this.readExcelData(event);
    let files = event.target.files[0];
    let doctype = files.name.split('.');
    let doctypeName = doctype[doctype.length - 1];
    if (
      (doctypeName && doctypeName === 'xls' && files.size <= 11534336) ||
      (doctypeName && doctypeName === 'xlsx' && files.size <= 11534336)
    ) {
      this.fileUploadplaceHolder = '';
      this.fData.append('file', files);
      this.fileName = files.name;
    } else {
      this.toast.info({
        detail: 'Invalid File',
        summary:
          'Only Excel file formats with maximum size upto 11MB are allowed',
        duration: 10000,
      });
      event.target.value = '';
    }
  }
  readExcelData(event) {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      let data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      let empArray = [];
      empArray = data;
      empArray.forEach((emp) => {
        this.empCode = emp.EmpCode;
        this.addEmp();
      });
      return data;
    };
  }

  get batchNumbere() {
    return this.batchMasterForm.get('batchNumber');
  }

  get startDatee() {
    return this.batchMasterForm.get('startDate');
  }

  get endDatee() {
    return this.batchMasterForm.get('endDate');
  }

  get startTime() {
    return this.batchMasterForm.get('startTime');
  }

  get endTime() {
    return this.batchMasterForm.get('endTime');
  }

  get trainerTypee() {
    return this.batchMasterForm.get('trainerType');
  }

  get venue() {
    return this.batchMasterForm.get('venue');
  }

  get address() {
    return this.batchMasterForm.get('address');
  }

  editBatchInfoForm(data) {
    let parsedStartDate = moment(data.startDate, 'DD-MM-YYYY');
    let startDate = parsedStartDate.format('YYYY-MM-DD');
    let parsedEndDate = moment(data.endDate, 'DD-MM-YYYY');
    let endDate = parsedEndDate.format('YYYY-MM-DD');
    this.batchMasterForm = this.fb.group({
      batchId: [data.batchId],
      batchNumber: [data.batchNumber, [Validators.required]],
      startDate: [startDate, [Validators.required]],
      endDate: [endDate, [Validators.required]],
      startTime: [data.startTime, [Validators.required]],
      endTime: [data.endTime, [Validators.required]],
      trainerType: [data.trainerType.id, [Validators.required]],
      venue: [data.venue, [Validators.maxLength(150)]],
      address: [data.address, [Validators.maxLength(250)]],
      checkListItems: [null],
    });
    if (data.trainerType.entityName === 'Employee') {
      this.isEmployee = true;
      this.isOthers = false;
      // this.readOnlytrainerInfo = true;
    } else if (data.trainerType.entityName === 'Others') {
      this.isOthers = true;
      this.isEmployee = false;
      // this.readOnlytrainerInfo = true;
    } else {
      this.isOthers = true;
      this.isEmployee = true;
      // this.readOnlytrainerInfo = true;
    }
  }

  getCoordinatorBatch(data) {
    if (data != undefined && data != null) {
      this.batchData = new BatchMaster();
      this.batchData.batchId = data.batchId;
      this._initiateTrainingService.getCoordinator(data.batchId).subscribe(res => {
        if (res && res.data) {
          this.editEmployeeList(res.data, data.batchNumber)
        }
      });
    }
  }

  getCoordinatorBatchEdit(data) {
    if (data != undefined && data != null) {
      this.batchData = new BatchMaster();
      this.batchData.batchId = data.batchId;
      this._initiateTrainingService.getTrainersByBatch(this.trainingId, data.batchId).subscribe(res => {
        if (res && res.data) {
          let response;
          let arr1 = [];
          let arr2 = [];
          response = res.data[0];
          this.editBatchInfoForm(response.batch);
          res.data.forEach(item => {
            if (item.batch.trainerType.entityName === "Employee") {
              arr1.push(item.trainer);
            } else if (item.batch.trainerType.entityName === "Others") {
              arr2.push(item.trainer);
            }
          });
          this.empList = arr1;
          this.othersList = arr2;
        } else {
          this.empList = [];
          this.othersList = [];
          this.isOthers = false;
          this.isEmployee = false;
          this.resetBatchMasterForm();
        }
      });



      // this._initiateTrainingService
      //   .getCoordinator(data.batchId)
      //   .subscribe();
      //   this._initiateTrainingService.getBatchById(data.batchId).subscribe(res=>{
      //     if(res && res.data) {
      //       let response;
      //       response = res.data[0];
      //       this.editBatchInfoForm(response);
      //     }
      //   });
    }
  }


  resetBatchMasterForm() {
    this.batchMasterForm.get('batchId').setValue('');
    this.batchMasterForm.get('startDate').setValue('');
    this.batchMasterForm.get('startDate').setValue('');
    this.batchMasterForm.get('endDate').setValue('');
    this.batchMasterForm.get('startTime').setValue('');
    this.batchMasterForm.get('endTime').setValue('');
    this.batchMasterForm.get('trainerType').setValue(null);
    this.batchMasterForm.get('venue').setValue('');
    this.batchMasterForm.get('address').setValue('');
    this.batchMasterForm.get('checkListItems').setValue(null);
  }

  getTraineesBatch(data) {
    if (data != undefined && data != null) {
      this.batchData = new BatchMaster();
      this.batchData.batchId = data.batchId;
      this._initiateTrainingService.getTraineesByBatch(data.batchId).subscribe(resposne => {
        if (resposne && resposne.data !== null) {
        this.editEmployeeList(resposne.data, data.batchNumber);
        }
      });
    }
  }

  editEmployeeList(data, batchNumber) {
    data.forEach((e) => {
      e.empCode.batchNumber = batchNumber;
      e.empCode.coordinatorId = e.coordinatorId;
      if (e.traineeId != undefined && e.traineeId != null) {
        e.empCode.traineeId = e.traineeId;
      }
      this.employeeList.push(e.empCode);
      this.gridApi.setRowData(this.employeeList);
    });
  }

  next() {
    if (this.step == 1) {
      this.batchForm_step = true;
      this.confirmationDialogueService
        .confirm(Constantss.CONFIRMATION, Constantss.SURE_SAVE)
        .then((confirmed) => {
          if (confirmed) {
            this.toast.success({
              detail: Constantss.SUCCESS,
              summary: 'Record has been saved successfully',
              duration: 10000,
            });
            let batchInitiate = new BatchInitiate();
            batchInitiate = this.batchInitiateMaptoModel(this.batchForm.value);
            this._initiateTrainingService
              .saveBatchInitiate(batchInitiate)
              .subscribe((response) => {
                if (response.status === '200') {

                  let trainingArea;
                  trainingArea = this.mapToModelTrainingArea(this.trainingData.trainingAreaId);
                  this._initiateTrainingService.saveTrainingArea(trainingArea).subscribe();

                  this.trainingMasterData._value.initiateTrainingStatus.id = 61;
                  this.trainingMasterData._value.initiateTrainingStatus.entityId = 2;
                  this.trainingMasterData._value.initiateTrainingStatus.entityTypeId = 13;
                  this.trainingMasterData._value.initiateTrainingStatus.entityName = "In Progress";
                  this.trainingMasterData._value.initiateTrainingStatus.isActive = true;
                  this.trainingMasterData._value.initiateTrainingStatus.name = null;
                  this.trainingMasterData._value.startDate = this.dateFormattergrid(this.trainingMasterData._value.startDate);
                  this.trainingMasterData._value.endDate = this.dateFormattergrid(this.trainingMasterData._value.endDate);
                  this._groupService.saveTraining(this.trainingMasterData._value).subscribe((rsp) => {
                    if (rsp.status === '200') {
                      this.toast.success({
                        detail: 'Success',
                        summary: Constantss.SAVED_SUCCESSFULLY,
                        duration: 10000,
                      });
                    } else {
                      this.toast.error({
                        detail: Constantss.ERROR,
                        summary: response.message,
                        duration: 10000,
                      });
                    }
                  })
                }


              });
            this.totalBatch = this.batchForm.get('totalBatches').value;
            this.createDyBatchNumber();
            this.connectorC++;
            this.step++;
          }
        });
    } else if (this.step == 2 && this.connectorC == 2) {
      this.batchInfoForm_step = true;
      this.confirmationDialogueService
        .confirm(Constantss.CONFIRMATION, Constantss.SURE_SAVE)
        .then((confirmed) => {
          if (confirmed) {
            this.toast.success({
              detail: Constantss.SUCCESS,
              summary: 'Record has been saved successfully',
              duration: 10000,
            });
            this.connectorC++;
            this.step++;
          }
        });
      // this.employeeList=[];
    } else if (this.step == 3 && this.connectorC == 3) {
      this.confirmationDialogueService
        .confirm(Constantss.CONFIRMATION, Constantss.SURE_SAVE)
        .then((confirmed) => {
          if (confirmed) {
            let coordinators = this.coordinatorMapper();
            if (coordinators.length != 0) {
              this._initiateTrainingService
                .saveCoordinator(coordinators)
                .subscribe((response) => {
                  if (response != null) {
                    this.employeeList = [];
                    this.trainingInfoForm_step = true;
                    this.connectorC++;
                    this.step++;
                    this.toast.success({
                      detail: Constantss.SUCCESS,
                      summary: 'Record has been saved successfully',
                      duration: 10000,
                    });
                  } else {
                    this.toast.error({
                      detail: 'Error',
                      summary: response.message,
                      duration: 10000,
                    });
                  }
                });
            }

          }
        });
    } else {
      this.confirmationDialogueService
        .confirm(Constantss.CONFIRMATION, Constantss.SURE_SAVE)
        .then((confirmed) => {
          if (confirmed) {
            let trainees = this.traineeMapper();
            this.router.navigate(['/training/initiateTraining']);
            if (trainees.length != 0) {
              this._initiateTrainingService
                .saveTraineees(trainees)
                .subscribe((response) => {

                  if (response != null && response.status === '200') {


                    let trainingArea;
                    trainingArea = this.mapToModelTrainingAreaFinalSubmit(this.trainingData.trainingAreaId);
                    this._initiateTrainingService.saveTrainingArea(trainingArea).subscribe();



                    this.trainingMasterData._value.initiateTrainingStatus.id = 62;
                    this.trainingMasterData._value.initiateTrainingStatus.entityId = 3;
                    this.trainingMasterData._value.initiateTrainingStatus.entityTypeId = 13;
                    this.trainingMasterData._value.initiateTrainingStatus.entityName = "Initiated";
                    this.trainingMasterData._value.initiateTrainingStatus.isActive = true;
                    this.trainingMasterData._value.initiateTrainingStatus.name = null;
                    this.trainingMasterData._value.startDate = this.dateFormattergrid(this.trainingMasterData._value.startDate);
                    this.trainingMasterData._value.endDate = this.dateFormattergrid(this.trainingMasterData._value.endDate);
                    this._groupService.saveTraining(this.trainingMasterData._value).subscribe((rsp) => {
                      if (rsp.status === '200') {
                        this.toast.success({
                          detail: 'Success',
                          summary: Constantss.SAVED_SUCCESSFULLY,
                          duration: 10000,
                        });
                      } else {
                        this.toast.error({
                          detail: Constantss.ERROR,
                          summary: response.message,
                          duration: 10000,
                        });
                      }
                    })



                  }
                });
              this.router.navigate(['/training/initiateTraining']);
            }
          }
          this.CoordinatorForm_step = true;
          this.connectorC++;
          this.step++;
        });
    }
  }

  mapToModel(data: any) {
    let training = new Training();
    return training;
  }

  mapToModelTrainingArea(areaId) {
    let arr = [];
    let trainingArea = new TrainingArea();
    if (this.trainingData.initiateTrainingStatus === 'Pending' ||
      this.trainingData.initiateTrainingStatus.id === 61) {
      let entity = new Entity();
      entity.id = 61;
      trainingArea.status = entity;
    }
    if (this.trainingData.initiateTrainingStatus.id === 62) {
      let entity = new Entity();
      entity.id = 62;
      trainingArea.status = entity;
    }

    trainingArea.trainingAreaId = areaId;
    trainingArea.areaId = this.trainingData.areaId;
    let entity2 = new Entity();
    entity2.id = this.trainingData.trainingTypeId.id;
    trainingArea.trainingTypeId = entity2;
    let training = new Training();
    training.trainingId = this.trainingData.trainingId;
    trainingArea.training = training;
    arr.push(trainingArea);
    this.trainingAreaStatusSubmit = arr;
    return this.trainingAreaStatusSubmit;
  }


  mapToModelTrainingAreaFinalSubmit(areaId) {
    let arr = [];
    let trainingArea = new TrainingArea();
    let entity = new Entity();
    entity.id = 62;
    trainingArea.status = entity;
    trainingArea.trainingAreaId = areaId;
    trainingArea.areaId = this.trainingData.areaId;
    let entity2 = new Entity();
    entity2.id = this.trainingData.trainingTypeId.id;
    trainingArea.trainingTypeId = entity2;
    let training = new Training();
    training.trainingId = this.trainingData.trainingId;
    trainingArea.training = training;
    arr.push(trainingArea);
    this.trainingAreaStatusFinalSubmit = arr;
    return this.trainingAreaStatusFinalSubmit;
  }

  coordinatorMapper() {
    let coordinators: Array<Coordinator> = [];
    this.employeeList.forEach((employee) => {
      let coordinator = new Coordinator();
      if (
        employee.coordinatorId != undefined &&
        employee.coordinatorId != null
      ) {
        coordinator.coordinatorId = employee.coordinatorId;
      }
      let empCode = new EmpCode();
      empCode.employeeCode = employee.employeeCode;
      coordinator.empCode = empCode;
      coordinator.batch = this.batchData;
      coordinators.push(coordinator);
    });

    return coordinators;
  }

  traineeMapper() {
    let trainees: Array<Trainee> = [];
    this.employeeList.forEach((emp) => {
      let trainee = new Trainee();
      let empCode = new EmpCode();
      empCode.employeeCode = emp.employeeCode;
      trainee.empCode = empCode;
      trainee.batchId = this.batchData;
      trainee.traineeId = emp.traineeId;
      trainees.push(trainee);
    });
    return trainees;
  }




  batchInitiateMaptoModel(data: any) {
    let batchInitiate = new BatchInitiate();
    batchInitiate.batchinitiateId = data.batchinitiateId;
    batchInitiate.maxBatchSize = data.maxBatchSize;
    batchInitiate.tentitiveParticipants = data.numOfParticipants;
    batchInitiate.noOfRooms = data.numOfRooms;
    batchInitiate.cycle = data.cycles;
    batchInitiate.createdOn = new Date();
    batchInitiate.createdBy = this.userId;
    let training = new Training();
    training.trainingId = this.trainingId;
    batchInitiate.training = training;
    batchInitiate.calculatedBatch = data.totalBatches;
    batchInitiate.updatedOn = new Date();
    batchInitiate.updatedBy = this.userId;
    let trainingArea = new TrainingArea();
    trainingArea.trainingAreaId = this.trainingData.trainingAreaId;
    batchInitiate.trainingArea = trainingArea;
    return batchInitiate;
  }

  othersMapToModel(data: any) {
    let trainerMaster = new TrainerMaster();
  }

  dateFormattergrid(date: any) {
    let formatedDate;
    if (typeof (date) === "string") {
      const [day, month, year] = date.split('-');
      formatedDate = new Date(+year, +month - 1, +day);
    }
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    return formatedDate ? formatDate(formatedDate, format, locale) : formatDate(date, format, locale);
  }

  saveBatchMaster() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_SAVE)
      .then((confirmed) => {
        if (confirmed) {
          let batchMaster = new BatchMaster();
          batchMaster = this.batchMasterMapToModel(this.batchMasterForm.value);
          this._initiateTrainingService
            .saveBatch(batchMaster)
            .subscribe((res) => {
              if (res.status === '200') {
                this.batchMasterSaved = true;
                this.saveBatchMasterSuccess = true;
                this.batchId = res.data[0].batchId;
                this.toast.success({
                  detail: 'Success',
                  summary: Constantss.SAVED_SUCCESSFULLY,
                  duration: 10000,
                });
              } else {
                this.toast.error({
                  detail: Constantss.ERROR,
                  summary: res.message,
                  duration: 10000,
                });
              }
            });
        }


      });
  }

  batchMasterMapToModel(data: any) {
    let batchMaster = new BatchMaster();
    batchMaster.batchId = data.batchId;
    let training = new Training();
    training.trainingId = this.trainingId;
    batchMaster.training = training;
    batchMaster.batchNumber = data.batchNumber;
    batchMaster.venue = data.venue;
    batchMaster.address = data.address;
    batchMaster.startDate = data.startDate;
    batchMaster.endDate = data.endDate;
    batchMaster.startTime = data.startTime;
    batchMaster.endTime = data.endTime;
    let launchStatus = new Entity();
    launchStatus.id= 63;
    batchMaster.launchStatus=launchStatus;
    batchMaster.createdBy = this.userId;
    batchMaster.createdOn = new Date();
    batchMaster.updatedBy = this.userId;
    batchMaster.updatedOn = new Date();
    return batchMaster;
  }

  previous() {
    this.connectorC--;
    this.step--;
    if (this.step == 1 && this.connectorC == 1) {
      this.batchForm_step = false;
    } else if (this.step == 1 && this.connectorC == 0) {
      this.batchInfoForm_step = false;
      this.batchMasterForm.reset();
    } else if (this.step == 3 && this.connectorC == 3) {
      this.trainingInfoForm_step = false;
    } else {
      this.CoordinatorForm_step = false;
    }
  }

  cancelBatchForm() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
      .then((confirmed) => {
        if (confirmed) {
          this.router.navigate(['/training/initiateTraining']);
        }
      });
  }

  cancelBatchInfoForm() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
      .then((confirmed) => {
        if (confirmed) {
          this.router.navigate(['/training/initiateTraining']);
        }
      });
  }

  checkListItems() {
    this.checkList = checklist;
  }

  onCheckListItemChange(event) {
    const formArray: FormArray = this.batchMasterForm.get(
      'checkListItems'
    ) as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  getTrainerType() {
    this.dataSharing.fetchEntityById(12).subscribe((resp) => {
      if (resp && resp.data !== null) {
      this.trainerType = resp.data;
      }
    });
  }

  selectTrainerType(event) {
    this.trainer = event.name;
  }

  addTrainer() {
    this.batchNumberValue = this.batchNumbere.value;
    this.createOthersForm();
    this.readOnlytrainerInfo = true;
    if (this.trainer === 'Employee') {
      this.isEmployee = true;
      this.isOthers = false;
    } else if (this.trainer === 'Others') {
      this.isOthers = true;
      this.isEmployee = false;

    } else {
      this.isOthers = true;
      this.isEmployee = true;
      this.empList = [];
      this.employeeList = [];
    }
  }

  saveEmployeeInfo() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_SAVE)
      .then((confirmed) => {
        if (confirmed) {
          if (this.employeeList.length < this.minimumTrainer) {
            this.toast.error({
              detail: Constantss.ERROR,
              summary:
                'Kindly add minimum ' +
                this.minimumTrainer +
                ' number of trainers',
              duration: 10000,
            });
          } else {
            let trainerMaster;
            trainerMaster = this.mapEmployeeToTrainerMasterModel(
              this.employeeList
            );
            this._initiateTrainingService
              .saveTrainer(trainerMaster, this.batchId)
              .subscribe((response) => {
                if (response.status === '200') {
                  this.toast.success({
                    detail: Constantss.SUCCESS,
                    summary: Constantss.SAVED_SUCCESSFULLY,
                    duration: 10000,
                  });
                } else {
                  this.toast.error({
                    detail: 'Error',
                    summary: 'Could not save data',
                    duration: 10000,
                  });
                }
              });
          }
        }
      });
  }

  mapEmployeeToTrainerMasterModel(data: any) {
    let arr = [];
    data.forEach((d) => {
      let trainerMaster = new TrainerMaster();
      trainerMaster.trainerId = d.trainerId;
      trainerMaster.trainerName = d.employeeName;
      trainerMaster.mobile = d.mobileNo;
      trainerMaster.email = null;
      trainerMaster.organizationName = 'qwerty';
      trainerMaster.aadharNo = '12345';
      trainerMaster.bankId = null;
      trainerMaster.IFSCcode = null;
      trainerMaster.bankAccountNo = null;
      trainerMaster.acountHolder = d.employeeName;
      arr.push(trainerMaster);
    });
    this.finalSubmitResult = arr;
    return this.finalSubmitResult;
  }

  seletedBank($event) { }

  getBanks() {
    this.registrationService.getAllBanks().subscribe((res) => {
      if (res && res.data !== null) {
      this.bankList = res.data;
      }
    });
  }

  onIFSCEntered(e) {
    this.registrationService
      .getBankBranchByIfsc(e.target.value)
      .subscribe((response) => {
        if (response.status === '200') {
          this.toast.success({
            detail: Constantss.SUCCESS,
            summary: response.message,
            duration: 10000,
          });
          this.bankBranch.setValue(response.data[0].branchName);
        } else {
          if (this.IFSC.value.length === 11) {
            this.toast.error({
              detail: Constantss.ERROR,
              summary: response.message,
              duration: 10000,
            });
          }

          this.bankBranch.setValue('');
        }
      });
  }

  createColumnDefsEmployee() {
    this.columnDefsEmployee = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('employeeName', 'Name');
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefsEmployee.push(header);

    header = this._commonUtilService.getColumnHeader(
      'batchNumber',
      'Batch Number'
    );
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsEmployee.push(header);

    header = this._commonUtilService.getColumnHeader('mobileNo', 'Mobile No.');
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsEmployee.push(header);

    header = this._commonUtilService.getColumnHeader('employeeCode', 'Emp ID');
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsEmployee.push(header);

    header = this._commonUtilService.getColumnHeader(
      'designation',
      'Designation'
    );
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsEmployee.push(header);

    header = this._commonUtilService.getColumnHeader(
      'districtName',
      'District/block'
    );
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefsEmployee.push(header);

    header = this._commonUtilService.getColumnHeader('state', 'State');
    header.width = 100;
    header.sortable = true;
    header.filter = true;
    this.columnDefsEmployee.push(header);

    header = this._commonUtilService.getColumnHeader('schoolName', 'School');
    header.width = 100;
    header.sortable = true;
    header.filter = true;
    this.columnDefsEmployee.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Remove');
    header.width = 100;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'removeEmployee',
      onDeleteIconClick: this.onDeleteEmpBtnClicked.bind(this),
    };

    this.columnDefsEmployee.push(header);
  }

  onDeleteEmpBtnClicked(params) {
    this.employeeList.forEach((element, index) => {
      if (element.employeeCode === params.data.employeeCode) {
        this.confirmationDialogueService
          .confirm('Confirmation', 'Do you want to remove this record ?')
          .then((confirmed) => {
            if (confirmed) {
              this.employeeList.splice(index, 1);
              this.gridApi.setRowData(this.employeeList);
            }
          });
      }
    });
  }

  dateFormatter(date: Date) {
    const format = 'yyyy-dd-MM';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

  createColumnDefsOthers() {
    this.columnDefsOthers = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('trainerName', 'Name');
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsOthers.push(header);

    header = this._commonUtilService.getColumnHeader(
      'batchNumber',
      'Batch Number'
    );
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsOthers.push(header);

    header = this._commonUtilService.getColumnHeader('mobile', 'Mobile No.');
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsOthers.push(header);

    header = this._commonUtilService.getColumnHeader('aadharNo', 'Aadhar No.');
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsOthers.push(header);

    header = this._commonUtilService.getColumnHeader(
      'organizationName',
      'Organization'
    );
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefsOthers.push(header);

    header = this._commonUtilService.getColumnHeader('email', 'Email');
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsEmployee.push(header);

    header = this._commonUtilService.getColumnHeader(
      'bankBranch',
      'Bank Branch'
    );
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsOthers.push(header);

    header = this._commonUtilService.getColumnHeader(
      'acountHolder',
      'Account Holder'
    );
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsOthers.push(header);

    header = this._commonUtilService.getColumnHeader(
      'bankAccountNo',
      'Account Number'
    );
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsOthers.push(header);

    header = this._commonUtilService.getColumnHeader('ifsccode', 'IFSC');
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsOthers.push(header);

    header = this._commonUtilService.getColumnHeader('city', 'City/Village');
    header.width = 150;
    header.sortable = true;
    header.filter = true;
    this.columnDefsOthers.push(header);

    header = this._commonUtilService.getColumnHeader('state', 'State');
    header.width = 100;
    header.sortable = true;
    header.filter = true;
    this.columnDefsOthers.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Remove');
    header.width = 100;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'removeOthers',
      onDeleteIconClick: this.onDeleteOthersBtnClicked.bind(this),
    };

    this.columnDefsOthers.push(header);
  }

  onDeleteOthersBtnClicked(params) {
    this.othersList.forEach((element, index) => {
      if (element.aadhar === params.data.aadhar) {
        this.confirmationDialogueService
          .confirm('Confirmation', 'Do you want to remove this record?')
          .then((confirmed) => {
            if (confirmed) {
              this.othersList.splice(index, 1);
              this.gridApi1.setRowData(this.othersList);
            }
          });
      }
    });
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(event?) {
    this.gridApi = event.api;
  }

  onGridReady1(event?) {
    this.gridApi1 = event.api;
  }

  onDeletBtnClicked() { }
}

const checklist = [
  {
    id: 1,
    name: 'Bottle',
  },
  {
    id: 2,
    name: 'Pen',
  },
  {
    id: 1,
    name: 'Book',
  },
];
