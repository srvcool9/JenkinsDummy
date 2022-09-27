import { Component, OnInit } from '@angular/core';
import { TrainingArea } from '../../model/training-area';
import { ChecklistMaster } from '../../model/checklist-master';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
  Constants,
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
} from 'ag-grid-community';
import { CommonUtilService } from 'src/utils/common-util.service';
import { Constantss } from 'src/utils/constantss';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { NgToastService } from 'ng-angular-popup';
import { ManageUserService } from 'src/app/layouts/configurations/service/manage user service/manage-user.service';
import { GroupService } from '../../services/group.service';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { Training } from '../../model/training';
import { Quiz } from '../../model/quiz';
import { TrainingService } from '../../services/training.service';
import { formatDate } from '@angular/common';
import { Entity } from 'src/app/layouts/baseline/model/entity.model';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { User } from 'src/app/views/pages/login/model/user.model';
import { Question } from '../../model/question';
import { TrainingMaterial } from '../../model/training-material';
import { Document } from '../../model/document';
import { Link } from '../../model/link';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInFormArray } from '../../model/move-item-in-form-array';
@Component({
  selector: 'app-training-configuration',
  templateUrl: './training-configuration.component.html',
  styleUrls: ['./training-configuration.component.scss'],
})
export class TrainingConfigurationComponent implements OnInit {
  connector = 'HIIIIIIIIIIHIIIIIIIIIIHIIIIIIIIIIHIIIIIIII';
  connectorC = 6;
  divisionData = [];
  districtData = [];
  hiddenEdit = true;
  blockData = [];
  totalQuestDisabled = false;
  posttotalQuestDisabled = false;
  batchInfo!: FormGroup;
  range!: FormGroup;
  assessment!: FormGroup;
  trainingMaterial!: FormGroup;
  checkListForm: FormGroup;
  batchInfo_step = false;
  range_step = false;
  assessment_step = false;
  trainingMaterial_step = false;
  checkList_step = false;
  empForm: FormGroup;
  step = 1;
  dltBtnHidden = false;
  gridOptions = <GridOptions>{};
  gridOptions1 = <GridOptions>{};
  gridOptions2 = <GridOptions>{};
  columnDefs;
  columnDefsDoc;
  columnDefsLink;
  frameworkComponents;
  areaList: Array<Range> = [];
  gridApi: GridApi;
  gridApi1: GridApi;
  gridApi2: GridApi;
  dropdownSettings: IDropdownSettings = {};
  dropdownList = [];
  formData = new FormData();
  monitoringQuestionsForm: FormGroup;
  quizList = [
    { id: 1, name: 'Pre-Post Test' },
    { id: 2, name: 'Daily' },
  ];
  dayList = [];
  val = 0;
  dailySelected: boolean = null;
  prePostForm = false;
  dailyTestForm = false;
  PreTestPanel = true;
  PostTestPanel = false;
  dataLevel1;
  dataLevel2;
  optionSelected: any;
  preTestBtnColor: boolean = true;
  postTestBtnColor: boolean = false;
  trainingAreaList: Array<TrainingArea> = [];
  trainingArea = new TrainingArea();
  trainingMaterialList: Array<TrainingMaterial> = [];
  trainingMaterials = new TrainingMaterial();
  documentsList: Array<Document> = [];
  document = new Document();
  linksList: Array<Link> = [];
  link = new Link();
  documentList = [];
  linkList: Link[] = [];
  btnDisabled = true;
  stateList = [];
  userId: any;
  trainingId = null;
  quizId = null;
  quizIdFromRes = null;
  noOfDays;
  monitoring_Questions_step;
  day = [];
  prePost = [
    { id: 0, name: 'Pre Test' },
    { id: 1, name: 'Post Test' },
  ];
  fields: any;
  selectedDayIndex = 0;
  selectedtestIndex = 0;
  fileUploadplaceHolder;
  fileName;
  fData = new FormData();
  arrayFordragDropDaily = [];
  arrayFordragDropPrePost = [];
  selectQuizDisable = false;
  disabledBtn: boolean = true;
  trainingLevelId;
  divisionId: any;
  districtId: any;
  blockId: any;
  rangeValid: boolean = true;
  training = new Training();
  prePostCount = null;
  dailyCount = null;
  activeButton = 0;
  assessmentData;
  preQuestionList;
  postQuestionList;
  dailyQuestionList;
  editResponse = null;
  responseFinal;
  totalNoOfDays;
  check = 0;
  finalSubmitResult: ChecklistMaster[] = [];
  saveNextDisableForTest = false;
  new: any;
  newStep: any;
  materialRes;
  checkListData = null;
  startDate: number;
  endDate: number;
  noOfDay: any;
  constructor(
    private formBuilder: FormBuilder,
    private _commonUtilService: CommonUtilService,
    private confirmationDialogueService: ConfirmationDialogService,
    private router: Router,
    private dataSharingService: DataSharingService,
    private toast: NgToastService,
    private userService: ManageUserService,
    private groupService: GroupService,
    private clientStorage: ClientSideStorageService,
    private trainingService: TrainingService,
    private _dataSharing: DataSharingService,
  ) {
    this.new = this._dataSharing.getStep();
    this.newStep = this.new.source._value;
    this.dataLevel1 = this.dataSharingService.getGlobalEditData();
    let dataLevel = this.dataLevel1.source._value;
    let startDate = this.dateFormattergrid(this.dataLevel1.source._value.startDate);
    let endDate = this.dateFormattergrid(this.dataLevel1.source._value.endDate);
    this.startDate = new Date(startDate).getTime();
    this.endDate = new Date(endDate).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    this.noOfDay = ((this.endDate - this.startDate) / oneDay) + 1;
    this.training = this.dataLevel1.source._value;
    this.getTrainingAreas(this.training.trainingId);

    this.dataLevel2 = dataLevel;
    this.getEditTrainingMaterial(this.training.trainingId);
    this.trainingLevelId = this.dataLevel2.trainingLevelId.id;
    if (this.trainingLevelId === 41) {
      this.disabledBtn = true;
    }
    this.trainingId = this.dataLevel2.trainingId;
    this.getAllDivision();
    this.frameworkComponents = {
      deleteIconComponent: DeleteIconComponent,
    };
    const userId = this.clientStorage.get('userId');
    this.userId = userId;
    this.trainingService.getTrainingCheckList(this.trainingId).subscribe(res => {
      if (res && res.data !== null) {
        this.empForm = this.formBuilder.group({
          checkList: this.formBuilder.array([]),
        });
        this.checkListData = res.data;
        //  this.allForms();
        let index = 0;
        this.checkListData.forEach(item => {
          this.employees.push(this.newMainItem(item));
          if (item.checkListItems && item.checkListItems.length > 0) {
            item.checkListItems.forEach(i => {
              this.employeeSkills(index).push(this.newChecklistItem(i));
            });
          } else {
            this.employeeSkills(index).push(this.newItem());
          }
          index++;
        })
      }
    });


    this.trainingService
      .getQuizData(dataLevel.trainingId)
      .subscribe((res: any) => {
        this.responseFinal = res;
        if (res.data && res.data !== null && res.data[0]) {
          this.editResponse = res.data[0];
          if (res && res.data && res.data.length > 0) {
            this.totalNoOfDays = res.data.length;
          }
          this.trainingService
            .getQuestionList(0, dataLevel.trainingId, 0)
            .subscribe((response) => {
              if (response !== null) {
              this.assessmentData = response;
              this.allForms();
              if (
                this.assessmentData &&
                this.assessmentData.data &&
                this.assessmentData.data.length > 0
              ) {
                this.preQuestionList = this.assessmentData.data.filter(
                  (i) => i.quizTypeId === 54
                );
                this.postQuestionList = this.assessmentData.data.filter(
                  (i) => i.quizTypeId === 55
                );
                this.dailyQuestionList = this.assessmentData.data.filter(
                  (i) => i.quizTypeId === 56
                );
                if (this.dailyQuestionList.length > 0) {
                  this.dailyTestForm = true;
                  this.prePostForm = false;
                  this.dailySelected = true;
                } else if (
                  this.preQuestionList.length > 0 ||
                  this.postQuestionList.length > 0
                ) {
                  this.dailyTestForm = false;
                  this.prePostForm = true;
                  this.dailySelected = false;
                }
                this.editAssessmentForm();
                this.editAssessment();
                this.selectQuizDisable = true;
              }
            }
            });
        }
      });

    // this.fields = {
    //   type: {
    //     options: this.options
    //   }
    // }

    this.trainingService.getMonitorQuestions(this.trainingId).subscribe((response) => {
      if (response.data != null) {
        this.fields = response.data;
        this.createMonitoringQuestionEdit();
      } else {
        this.createFormMonitoringQuestions();
      }
    })
  }

  getNumberOfDays(event) {
    let numberOfDays = event.target.value;
    if (numberOfDays > this.noOfDay) {
      this.toast.info({
        detail: 'Info',
        summary: 'Number of Days should be less than ' + this.noOfDay + ' for this training.',
        duration: 6000
      });
      this.batchInfo.get('numberOfDays').setValue('');
    } else {
      document.getElementById('error').innerHTML = "";
    }

  }

  createMonitoringQuestionEdit() {
    this.monitoringQuestionsForm = this.formBuilder.group({
      monitorQuestionFormArray: this.formBuilder.array([
      ]),
    });
    this.patch();
  }


  patch() {
    const control = <FormArray>this.monitoringQuestionsForm.get('monitorQuestionFormArray');
    this.fields.forEach(x => {
      control.push(this.patchValues(x.question, x.monitorQuestionId))
    })
  }

  patchValues(question, monitorQuestionId) {
    return this.formBuilder.group({
      monitorQuestionId: [monitorQuestionId],
      question: [question]
    });
  }

  newMainItem(item): FormGroup {
    return this.formBuilder.group({
      checkListName: [
        item.checkListName,
        [
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9- ]+$'),
          Validators.required,
        ],
      ],
      checkListId: [item.checkListId],
      checkListItems: this.formBuilder.array([], Validators.required),
    });
  }

  newChecklistItem(item): FormGroup {
    return this.formBuilder.group({
      checkListItemName: [
        item.checkListItemName,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9- ]+$'),
        ],
      ],
      checkListItemId: [item.checkListItemId]
    });
  }

  editAssessment() {
    if (this.dailySelected === true) {
      if (this.batchInfo.value && this.batchInfo.value.numberOfDays) {
        this.noOfDays = this.batchInfo.value.numberOfDays;
      } else if (this.training && this.training.noOfDays) {
        this.noOfDays = this.training.noOfDays;
      }

      for (let i = 0; i < this.noOfDays; i++) {
        this.assessment[i] = this.formBuilder.group({
          totalQuestions: [null, [Validators.required]],
          questionnaire: this.formBuilder.array([]),
        });
        this.day.push({ id: [i], name: 'Day' + ' ' + [i + 1] });
      }
      if (this.dailyQuestionList.length > 0) {
        this.dailyCount = true;
        let list = this.dailyQuestionList.filter((i) => i.day === 1);
        if (list && list.length > 0) {
          this.assessment[0] = this.formBuilder.group({
            totalQuestions: [list.length, [Validators.required]],
            questionnaire: this.formBuilder.array([]),
          });
          this.questionsOnEditAssess(list, 0);
        }
      }
      this.quizId = 56;
      this.prePostForm = false;
      this.dailyTestForm = true;
    } else if (this.dailySelected === false) {
      this.quizId = 54;
      this.prePostForm = true;
      this.dailyTestForm = false;
      for (let i = 0; i < 2; i++) {
        this.assessment[i] = this.formBuilder.group({
          totalQuestions: [null, [Validators.required]],
          questionnaire: this.formBuilder.array([]),
        });
      }
      if (this.preQuestionList.length > 0) {
        this.prePostCount = true;
        this.assessment[0] = this.formBuilder.group({
          totalQuestions: [this.preQuestionList.length, [Validators.required]],
          questionnaire: this.formBuilder.array([]),
        });
        this.questionsOnEditAssess(this.preQuestionList, 0);
      }
    }
    this.activeButton = 0;
  }

  questionsOnEditAssess(list, indexValue) {
    if (list.length > 0) {
      list.forEach((item) => {
        this.questions(indexValue).push(
          this.formBuilder.group({
            question: [item.question, [Validators.required]],
            answer: [item.answer, [Validators.required]],
            option1: [item.option1, [Validators.required]],
            option2: [item.option2, [Validators.required]],
            option3: [item.option3, [Validators.required]],
            option4: [item.option4, [Validators.required]],
            questionId: [item.questionId],
            displayOrder: [item.displayOrder],
            quizId: [item.quizId],
          })
        );
      });
    }
  }

  getEditTrainingMaterial(trainingId: any) {
    let materials = [];
    this.trainingService.getTrainingMaterial(trainingId).subscribe((res) => {
      if (res && res.data != null) {
        materials = res.data;
        this.materialRes = materials;
        this.allForms();
        materials.forEach((linkData) => {
          if (linkData.linkPath != null && linkData.linkName != null) {
            let link = new Link();
            link.materialId = linkData.materialId;
            link.linkName = linkData.linkName;
            link.linkPath = linkData.linkPath;
            this.linksList.push(link);
          }
          if (linkData.documentName != null && linkData.documentPath != null) {
            let doucmentD = new Document();
            doucmentD.materialId = linkData.materialId;
            let docName = linkData.documentName.replace('Training_ID_4_', '');
            let doc = linkData.documentPath.replace(
              'C:apache-tomcat-9.0.64webappsDocumentsTrainingDocs',
              ''
            );
            doucmentD.documentName = docName;
            doucmentD.documentPath = doc;
            this.documentList.push(doucmentD);
          }
        });
        // this.gridApi1.setRowData(this.documentsList);
        //this.gridApi2.setRowData(this.linksList);
      }
    });
  }
  getAllDivision() {
    this.userService.getDivisionData().subscribe((response) => {
      if (response && response.data !== null) {
      this.divisionData = response.data;
      }
    });
  }
  getTrainingAreas(id: any) {
    this.groupService.fetchTrainingAreas(id).subscribe((res) => {
      if (res.data != null) {
        res.data.forEach((element) => {
          if (element.trainingArea.divisionName) {
            element.trainingArea.name = element.trainingArea.divisionName;
          } else if (element.trainingArea.districtName) {
            element.trainingArea.name = element.trainingArea.districtName;
          } else if (element.trainingArea.blockName) {
            element.trainingArea.name = element.trainingArea.blockName;
          }
        });
        this.trainingAreaList = res.data;
        this.createColumnDefs();
        this.allForms();
        if (
          this.trainingAreaList != null &&
          this.trainingAreaList.length != 0
        ) {
          this.disabledBtn = false;
          this.rangeValid = false;
        } else {
          this.disabledBtn = true;
          this.rangeValid = true;
        }
      }
    });
  }

  ngOnInit() {
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };
    this.createFormMonitoringQuestions();
    this.createCheckListForm();
    this.getDayList();
    this.getState();
    this.craeteFormBatchInfo();
    this.createFormRange();
    this.createFormAssessment();
    this.createFormTrainingMaterial();
    this.allForms();
    // this.checkList.push(this.createCheckList());
  }

  allForms() {
    if (this.batchInfo.status === "INVALID") {
      this.step = 1;
      this.connectorC = 1;
    } else if (this.trainingAreaList === null || this.trainingAreaList.length === 0) {
      this.createColumnDefs();
      this.step = 2;
      this.connectorC = 2;
    } else if (this.assessmentData === undefined || (this.assessmentData.data && this.assessmentData.data.length > 0 && this.assessmentData.data[0].formValid !== true)) {
      this.step = 3;
      this.connectorC = 3;
    } else if (this.materialRes === undefined|| this.materialRes === null || this.materialRes.length === 0) {
      this.step = 4;
      this.connectorC = 4;
    } else if (this.empForm.status === "INVALID") {
      this.step = 5;
      this.connectorC = 5;
    }
    else {
      this.step = 6;
      this.connectorC = 6;
    }

  }

  craeteFormBatchInfo() {
    this.batchInfo = this.formBuilder.group({
      numberOfDays: [
        this.training.noOfDays,
        [Validators.required, Validators.max(10)],
      ],
      minTrainer: [this.training.minimumTrainer, [Validators.required]],
      maxBatchSize: [this.training.maximumBatchSize, [Validators.required]],
    });
  }

  // createFormCheckList() {
  //   this.checkListForm = this.formBuilder.group({
  //     checkList: this.formBuilder.array([this.createCheckList()], Validators.required),
  //   });
  // }

  // createCheckList(): FormGroup {
  //   return this.formBuilder.group({
  //     checkListName: ['', [Validators.required]],
  //     items: this.formBuilder.array([this.newItem()]),
  //   });
  // }

  checkList(): FormArray {
    return this.checkListForm.get('checkList') as FormArray;
  }

  checkListItems(itemIndex: number): FormArray {
    return this.checkList().at(itemIndex).get('checkListItems') as FormArray;
  }

  monitoringQuest(): FormGroup {
    return this.formBuilder.group({
      question: ['', Validators.required],
      training: []
    });
  }

  newItem(): FormGroup {
    return this.formBuilder.group({
      checkListItemName: [''],
    });
  }

  addNewItem(itemIndex: number) {
    this.checkListItems(itemIndex).push(this.newItem());
  }

  // addanotherCheckList() {
  //   let c = this.checkListForm.controls['checkList'].value;
  //   for (let i = this.check; i < c.length; i++) {
  //     if (c[i].checkListItemName === '') {
  //     } else {
  //       this.check++;
  //       return this.checkList().push(this.createCheckList());
  //     }
  //   }
  // }

  addMoreItems() { }

  saveItems() { }

  get numberOfDays() {
    return this.batchInfo.get('numberOfDays');
  }

  get minTrainer() {
    return this.batchInfo.get('minTrainer');
  }

  get maxBatchSize() {
    return this.batchInfo.get('maxBatchSize');
  }

  get division() {
    return this.range.get('division');
  }

  get district() {
    return this.range.get('district');
  }

  get block() {
    return this.range.get('block');
  }

  districtOnChange(event) {
    if (this.trainingLevelId === 42 && this.divisionId != null) {
      this.disabledBtn = false;
    }
    this.districtId = event.id;
    this.trainingArea = new TrainingArea();
    this.trainingArea.areaId = event.id;

    let areaName = new Entity();
    areaName.name = event.name;
    this.trainingArea.trainingArea = areaName;

    let training = new Training();
    training.trainingId = this.trainingId;
    this.trainingArea.training = training;

    this.trainingArea.trainingTypeId = this.dataLevel2.trainingLevelId;

    let createdBy = new User();
    createdBy.userId = this.userId;
    this.trainingArea.createdBy = createdBy;

    this.groupService.fetchBlockByDistrictId(event.id).subscribe((response) => {
      if (response && response.data !== null) {
      this.blockData = response.data;
      this.range.controls['block'].reset();
      }
    });
  }

  divisionOnChange(event) {
    if (this.trainingLevelId === 41 && event.id != null) {
      this.disabledBtn = false;
    }
    this.divisionId = event.id;
    this.trainingArea = new TrainingArea();
    this.trainingArea.areaId = event.id;
    let areaName = new Entity();
    areaName.name = event.name;
    this.trainingArea.trainingArea = areaName;

    let training = new Training();
    training.trainingId = this.trainingId;
    this.trainingArea.training = training;

    this.trainingArea.trainingTypeId = this.dataLevel2.trainingLevelId;

    let createdBy = new User();
    createdBy.userId = this.userId;
    this.trainingArea.createdBy = createdBy;

    this.groupService
      .fetchDistrictByDivisionId(event.id)
      .subscribe((response) => {
        if (response && response.data !== null) {
        this.districtData = response.data;
        this.range.controls['district'].reset();
        this.range.controls['block'].reset();
        }
      });
  }

  blockOnChange(event) {
    if (this.trainingLevelId === 43 && this.districtId != null) {
      this.disabledBtn = false;
    }
    this.trainingArea = new TrainingArea();
    this.trainingArea.areaId = event.id;

    let areaName = new Entity();
    areaName.name = event.name;
    this.trainingArea.trainingArea = areaName;

    let training = new Training();
    training.trainingId = this.trainingId;
    this.trainingArea.training = training;

    this.trainingArea.trainingTypeId = this.dataLevel2.trainingLevelId;

    let createdBy = new User();
    createdBy.userId = this.userId;
    this.trainingArea.createdBy = createdBy;
  }

  resetArea() {
    this.range.controls['division'].reset();
    this.range.controls['district'].reset();
    this.range.controls['block'].reset();
  }

  add() {
    const filterArea = this.trainingAreaList.filter(
      (area) => area.areaId === this.trainingArea.areaId
    );
    if (filterArea.length === 0) {
      this.trainingAreaList.push(this.trainingArea);
      this.gridApi.setRowData(this.trainingAreaList);
      if (this.trainingLevelId === 41) {
        this.rangeValid = false;
      } else if (this.trainingLevelId === 42 && this.divisionId != null) {
        this.rangeValid = false;
      } else if (this.trainingLevelId === 43 && this.districtId != null) {
        this.rangeValid = false;
      } else {
        this.rangeValid = true;
      }
      this.disabledBtn = true;
    } else {
      this.toast.error({
        detail: Constantss.ERROR,
        summary: 'This area is already added!',
        duration: 5000,
      });
    }

    this.resetArea();
  }

  addDocMaterial() {
    if(this.trainingMaterial.controls['documentName'].status === 'VALID'
    && this.trainingMaterial.controls['trainingMaterial'].status === 'VALID') {
    this.document = new Document();
    this.document.documentName =
      this.trainingMaterial.controls['documentName'].value;
    this.document.documentPath = this.fileName;
    if (
      this.document.documentName == null ||
      this.document.documentName === ''
    ) {
      this.toast.error({
        detail: Constantss.ERROR,
        summary: 'Please specify Document Name',
        duration: 5000,
      });
    } else {
      const filterDoc = this.documentsList.filter(
        (doc) => doc.documentPath === this.document.documentPath
      );
      if (filterDoc.length === 0) {
        this.documentsList.push(this.document);
        this.gridApi1.setRowData(this.documentsList);
      } else {
        this.toast.error({
          detail: Constantss.ERROR,
          summary: 'This document is already added!',
          duration: 5000,
        });
      }
    }
    this.trainingMaterial.reset();
  } else if (this.trainingMaterial.controls['trainingMaterial'].status !== 'VALID'){
    this.toast.info({      
      detail: Constantss.ERROR,
      summary: 'Upload Training Material',
      duration: 3000,
    })
  }
  }

  addLinkMaterial() {
    if(this.trainingMaterial.controls['link'].status === 'VALID'
    && this.trainingMaterial.controls['linkMaterial'].status === 'VALID') {
    this.link = new Link();
    this.link.linkName = this.trainingMaterial.controls['link'].value;
    this.link.linkPath = this.trainingMaterial.controls['linkMaterial'].value;
    if (this.link.linkName == null || this.link.linkName == '') {
      this.toast.error({
        detail: 'Error',
        summary: 'Please specify name of link',
        duration: 5000,
      });
    } else {
      const filterLink = this.linksList.filter(
        (link) => link.linkPath === this.link.linkPath
      );
      if (filterLink.length === 0) {
        this.linksList.push(this.link);
        this.gridApi2.setRowData(this.linksList);
      } else {
        this.toast.error({
          detail: Constantss.ERROR,
          summary: 'This link is already added!',
          duration: 5000,
        });
      }
    }
    this.trainingMaterial.reset();
  } else if (this.trainingMaterial.controls['linkMaterial'].status !== 'VALID'){
    this.toast.info({      
      detail: Constantss.ERROR,
      summary: 'Material Link is not added!!',
      duration: 3000,
    })
  }
  }

  createFormRange() {
    this.range = this.formBuilder.group({
      division: [null, [Validators.required]],
      district: [null],
      block: [null],
    });
  }

  createFormAssessment() {
    this.assessment = this.formBuilder.group({
      selectedQuiz: [null, [Validators.required]],
      selectedDay: [],
      totalQuestions: [null, [Validators.required]],
      questionnaire: this.formBuilder.array([]),
    });
  }

  get selectedQuize() {
    return this.assessment.get('selectedQuiz');
  }

  editAssessmentForm() {
    this.assessment = this.formBuilder.group({
      selectedQuiz: [this.editResponse.selectedQuiz.id],
      selectedDay: [],
      totalQuestions: ['', [Validators.required]],
      questionnaire: this.formBuilder.array([]),
    });
  }

  createFormTrainingMaterial() {
    this.trainingMaterial = this.formBuilder.group({
      documentName: ['', [Validators.required, Validators.maxLength(50)]],
      trainingMaterial: ['',[Validators.required]],
      link: ['', [Validators.required, Validators.maxLength(50)]],
      linkMaterial: ['',[Validators.required]],
    });
  }

  get documentName() {
    return this.trainingMaterial.get('documentName');
  }

  get linkName() {
    return this.trainingMaterial.get('link');
  }

  uploadDoc(event: any) {
    let files = event.target.files[0];
    let doctype = files.name.split('.');
    let doctypeName = doctype[doctype.length - 1];
    if (doctypeName && doctypeName === 'pdf' && files.size <= 2097152) {
      this.fileUploadplaceHolder = '';
      this.fData.append('file', files);
      this.fileName = files.name;
    } else {
      this.toast.info({
        detail: 'Invalid File',
        summary: 'Only pdf file formats with maximum size 2MB are allowed',
        duration: 10000,
      });
      event.target.value = '';
    }
  }

  // addPreTestPanel() {
  //   this.quizId = 54;
  //   this.arrayFordragDropPrePost = [];
  //   this.assessment.controls['totalQuestions'].reset();
  //   this.assessment.controls['questionnaire'].reset();
  //   this.totalQuestDisabled = false;
  //   this.assessment.value.questionnaire = [];
  //   this.PreTestPanel = true;
  //   this.PostTestPanel = false;
  //   this.preTestBtnColor = true;
  //   this.postTestBtnColor = false;
  // }

  // addPostTestPanel() {
  //   this.quizId = 55;
  //   this.arrayFordragDropPrePost = [];
  //   this.assessment.controls['totalQuestions'].reset();
  //   this.assessment.controls['questionnaire'].reset();
  //   this.assessment.value.questionnaire = [];
  //   this.PreTestPanel = false;
  //   this.PostTestPanel = true;
  //   this.preTestBtnColor = false;
  //   this.postTestBtnColor = true;
  // }

  getDayList() {
    this.dropdownList = [
      { id: 1, name: 'Day 1' },
      { id: 2, name: 'Day 2' },
      { id: 3, name: 'Day 3' },
      { id: 4, name: 'Day 4' },
      { id: 5, name: 'Day 5' },
    ];
  }

  getState() {
    this.stateList = stateList;
  }

  onGridReady(event?) {
    this.gridApi = event.api;
  }

  onGridReady1(event?) {
    this.gridApi1 = event.api;
  }

  onGridReady2(event?) {
    this.gridApi2 = event.api;
  }

  addAssessment() {
    if (this.dailySelected === true) {
      this.noOfDays = this.batchInfo.value.numberOfDays;
      for (let i = 0; i < this.noOfDays; i++) {
        this.assessment[i] = this.formBuilder.group({
          totalQuestions: ['', [Validators.required]],
          questionnaire: this.formBuilder.array([]),
        });
        this.day.push({ id: [i], name: 'Day' + ' ' + [i + 1] });
      }
      this.quizId = 56;
      this.prePostForm = false;
      this.dailyTestForm = true;
    } else if (this.dailySelected === false) {
      for (let i = 0; i < 2; i++) {
        this.assessment[i] = this.formBuilder.group({
          totalQuestions: ['', [Validators.required]],
          questionnaire: this.formBuilder.array([]),
        });
      }
      this.quizId = 54;
      this.prePostForm = true;
      this.dailyTestForm = false;
    }
    this.activeButton = 0;
  }

  totalQuestions() {
    return this.assessment.get('totalQuestions');
  }

  selectedQuiz(e) {
    if (e && e.name === 'Daily') {
      this.dailySelected = true;
      // this.dailyTestForm = true;
    } else {
      this.dailySelected = false;
    }
    this.prePostForm = false;
    // this.dailyTestForm = false;
    this.arrayFordragDropPrePost = [];
    this.arrayFordragDropDaily = [];
  }

  next() {
    if (this.step == 1) {
      this.confirmationDialogueService
        .confirm('Confirmation', 'Do you want to save this information?')
        .then((confirmed) => {
          if (confirmed) {
            let training = new Training();
            training = this.mapToModelBatchInfo(this.batchInfo.value);
            this.groupService.saveTraining(training).subscribe(
              (response) => {
                if (response.status === '200') {
                  this.toast.success({
                    detail: 'Success',
                    summary: Constantss.SAVED_SUCCESSFULLY,
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
            this.batchInfo_step = true;
            this.connectorC++;
            this.step++;
            this.createColumnDefs();
          }
        });
    } else if (this.step == 2 && this.connectorC == 2) {
      if (this.trainingLevelId === 41) {
        //   this.trainingArea = new TrainingArea();
        //   this.trainingArea.areaId = 1;
        //   let areaName = new Entity();
        //   areaName.name = 'Madhya Pradesh';
        //   this.trainingArea.trainingArea = areaName;
        //   let training = new Training();
        //   training.trainingId = this.trainingId;
        //   this.trainingArea.training = training;
        //   this.trainingArea.trainingTypeId = this.dataLevel2.trainingLevelId;
        //   let createdBy = new User();
        //   createdBy.userId = this.userId;
        //   this.trainingArea.createdBy = createdBy;
        // this.trainingAreaList.push(this.trainingArea);
      }
      this.confirmationDialogueService
        .confirm('Confirmation', 'Do you want to save this information ?')
        .then((confirmed) => {
          if (confirmed) {
            this.groupService.saveTrainingArea(this.trainingAreaList).subscribe(
              (response) => {
                if (response.status === '200') {
                  this.toast.success({
                    detail: 'Success',
                    summary: Constantss.SAVED_SUCCESSFULLY,
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

            this.range_step = true;
            this.connectorC++;
            this.step++;
          }
        });
    } else if (this.step == 3 && this.connectorC == 3) {
      this.confirmationDialogueService
        .confirm('Confirmation', 'Do you want to save this information ?')
        .then((confirmed) => {
          if (confirmed) {
            let result1;
            let e = 0;
            for (let e = 0; e < 15; e++) {
              if (
                this.assessment[e] &&
                this.assessment[e].value &&
                this.assessment[e].value.questionnaire &&
                this.assessment[e].value.questionnaire.length > 0
              ) {
                result1 = this.assessment[e].value.questionnaire;
                let count = 1;
                result1.forEach((i) => {
                  i.displayOrder = count;
                  count++;
                });
                this.trainingService.saveQuestions(result1).subscribe();
              }
            }
            this.toast.success({
              detail: Constantss.SUCCESS,
              summary: 'Data saved successfully',
              duration: 5000,
            });
            this.assessment_step = true;
            this.connectorC++;
            this.step++;
            this.createColumnDefsDoc();
            this.createColumnDefsLink();
          }
        });
    } else if (this.step == 4 && this.connectorC == 4) {
      this.confirmationDialogueService
        .confirm('Confirmation', 'Do you want to Save this information ?')
        .then((confirmed) => {
          if (confirmed) {
            let trainingMaterial: TrainingMaterial[];
            trainingMaterial = this.mapperLinkList();
            let trainingMaterialJSON = new Blob(
              [JSON.stringify(trainingMaterial)],
              {
                type: 'application/json',
              }
            );
            this.fData.append('training', trainingMaterialJSON);
            this.trainingService.saveTrainingMaterial(this.fData).subscribe(
              (res) => {
                if (res.status == '200') {
                  this.toast.success({
                    detail: Constantss.SUCCESS,
                    summary: res.message,
                    duration: 5000,
                  });
                  // this.router.navigate(['/training/trainingMaster']);
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
            this.trainingMaterial_step = true;
            this.connectorC++;
            this.step++;
          }
        });
    } else if (this.step == 5 && this.connectorC == 5) {
      this.confirmationDialogueService
        .confirm(Constantss.CONFIRMATION, Constantss.SURE_SAVE)
        .then((confirmed) => {
          if (confirmed) {
            let checkListMaster;
            if (this.checkListData && this.checkListData.length > 0) {
              //checkListMaster = this.empForm.value.checkList;
              checkListMaster= this.mapToModelCheckList(this.empForm.value);
            } else {
              checkListMaster = this.mapToModelCheckList(this.empForm.value);
            }
            this.trainingService
              .saveCheckList(checkListMaster)
              .subscribe((response) => {
                if (response.status === '200') {
                  this.toast.success({
                    detail: 'Success',
                    summary: Constantss.SAVED_SUCCESSFULLY,
                    duration: 10000,
                  });
                } else {
                  this.toast.error({
                    detail: 'Error',
                    summary: Constantss.ERROR,
                    duration: 10000,
                  });
                }
              });
            this.connectorC++;
            this.step++;
            this.checkList_step = true;
          }
        });
    }
  }

  resetFormData() {
    this.fData.delete('training');
    this.fData.delete('file');
  }
  mapperLinkList(): Array<TrainingMaterial> {
    let training = new Training();
    training.trainingId = this.trainingId;
    this.linksList.forEach((element) => {
      let trainingMaterial = new TrainingMaterial();
      trainingMaterial.linkName = element.linkName;
      trainingMaterial.linkPath = element.linkPath;
      trainingMaterial.trainingId = training;
      this.trainingMaterialList.push(trainingMaterial);
    });
    return this.trainingMaterialList;
  }

  mapToModelBatchInfo(data: any): Training {
    let training = new Training();
    training.trainingId = this.dataLevel2.trainingId;
    training.noOfDays = data.numberOfDays;
    training.minimumTrainer = data.minTrainer;
    training.maximumBatchSize = data.maxBatchSize;
    training.description = this.dataLevel2.description;
    training.endDate = this.dateFormattergrid(this.dataLevel2.endDate);
    training.startDate = this.dateFormattergrid(this.dataLevel2.startDate);
    training.trainingName = this.dataLevel2.trainingName;
    training.approxTrainees = this.dataLevel2.approxTrainees;
    training.isActive = this.dataLevel2.isActive;
    training.subGroupId = this.dataLevel2.subGroupId;
    training.trainingLevelId = this.dataLevel2.trainingLevelId;
    if (this.dataLevel2.status.id === 52) {
      let status = new Entity();
      status.id = 52;
      training.status = status;
    } else {
      let status = new Entity();
      status.id = 51;
      training.status = status;
    }

    let initiateTrainingStatus = new Entity();
    initiateTrainingStatus.id = 60;
    training.initiateTrainingStatus = initiateTrainingStatus;
    return training;
  }


  mapToModelBatchInfoFinalSubmit(data: any): Training {
    let training = new Training();
    training.trainingId = this.dataLevel2.trainingId;
    training.noOfDays = data.numberOfDays;
    training.minimumTrainer = data.minTrainer;
    training.maximumBatchSize = data.maxBatchSize;
    training.description = this.dataLevel2.description;
    training.endDate = this.dateFormattergrid(this.dataLevel2.endDate);
    training.startDate = this.dateFormattergrid(this.dataLevel2.startDate);
    training.trainingName = this.dataLevel2.trainingName;
    training.approxTrainees = this.dataLevel2.approxTrainees;
    training.isActive = this.dataLevel2.isActive;
    training.subGroupId = this.dataLevel2.subGroupId;
    training.trainingLevelId = this.dataLevel2.trainingLevelId;
    let status = new Entity();
    status.id = 52;
    training.status = status;
    let initiateTrainingStatus = new Entity();
    initiateTrainingStatus.id = 60;
    training.initiateTrainingStatus = initiateTrainingStatus;
    return training;
  }





  dateFormattergrid(date: any) {
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

  previous() {
    this.step--;
    this.connectorC--;
    if (this.step == 1 && this.connectorC == 1) {
      this.batchInfo_step = false;
    } else if (this.step == 2 && this.connectorC == 2) {
      this.createColumnDefs();
      this.range_step = false;
    } else if (this.step == 3 && this.connectorC == 3) {
      this.assessment_step = false;
    } else if (this.step == 4 && this.connectorC == 4) {
      this.createColumnDefsLink();
      this.createColumnDefsDoc();
      this.trainingMaterial_step = false;
    } else if (this.step == 5 && this.connectorC == 5) {
      this.checkList_step = false;
    } else if (this.step == 6 && this.connectorC == 6) {
      this.monitoring_Questions_step = false;
    }
  }

  submit() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_SAVE)
      .then((confirmed) => {
        if (confirmed) {
          let training = new Training();
          training.trainingId = this.trainingId;
          this.monitoringQuestionsForm.value.monitorQuestionFormArray.forEach(item => {
            item.training = training;
          });
          let monitorQuestions = this.monitoringQuestionsForm.value.monitorQuestionFormArray;          
          this.resetFormData();
          this.router.navigate(['/training/trainingMaster']);
          this.trainingService.saveMonitoringQuestions(monitorQuestions).subscribe((response) => {
            if (response.status === '200') {
              let training = new Training();
              training = this.mapToModelBatchInfoFinalSubmit(this.batchInfo.value);
              this.groupService.saveTraining(training).subscribe((resp) => {
               
              })
              this.toast.success({
                detail: 'Success',
                summary: Constantss.SAVED_SUCCESSFULLY,
                duration: 10000,
              });
            } else {
              this.toast.error({
                detail: 'Error',
                summary: Constantss.ERROR,
                duration: 10000,
              });
            }
          });
        }
      });
  }

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader(
      'trainingTypeId.entityName',
      'Type'
    );
    header.width = 300;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'trainingArea.name',
      'Area'
    );
    header.width = 300;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Delete');
    header.width = 200;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'deleteArea',
      onDeleteIconClick: this.onDeletBtnClicked.bind(this),
    };
    this.columnDefs.push(header);
  }

  createColumnDefsDoc() {
    this.columnDefsDoc = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('documentName', 'Name');
    header.width = 300;
    header.sortable = true;
    header.filter = true;
    this.columnDefsDoc.push(header);

    header = this._commonUtilService.getColumnHeader('documentPath', 'File');
    header.sortable = true;
    header.filter = true;
    header.width = 300;
    this.columnDefsDoc.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Remove');
    header.width = 200;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'deleteDoc',
      onDeleteIconClick: this.onDeletBtnDocClicked.bind(this),
    };
    this.columnDefsDoc.push(header);
  }

  createColumnDefsLink() {
    this.columnDefsLink = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('linkName', 'Name');
    header.sortable = true;
    header.filter = true;
    header.width = 300;
    this.columnDefsLink.push(header);

    header = this._commonUtilService.getColumnHeader('linkPath', 'File');
    header.sortable = true;
    header.filter = true;
    header.width = 300;
    this.columnDefsLink.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Remove');
    header.width = 200;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'deleteLink',
      onDeleteIconClick: this.onDeletBtnLinkClicked.bind(this),
    };
    this.columnDefsLink.push(header);
  }

  onDeletBtnClicked(params) {
    if (params.data.trainingTypeId.id.entityName !== 'State') {
      this.trainingAreaList.forEach((element, index) => {
        if (element.areaId === params.data.areaId) {
          this.confirmationDialogueService
            .confirm('Confirmation', 'Do you want to remove this record ?')
            .then((confirmed) => {
              if (confirmed) {
                this.trainingService
                  .deleteTrainingArea(element.trainingAreaId)
                  .subscribe((res) => {
                    if (res) {
                      this.toast.success({
                        detail: Constantss.SUCCESS,
                        summary: 'Area removed successfully',
                        duration: 5000,
                      });
                    }
                  });
                this.trainingAreaList.splice(index, 1);
                this.gridApi.setRowData(this.trainingAreaList);
                if (this.trainingAreaList.length == 0) {
                  this.rangeValid = true;
                }
              }
            });
        }
      });
    }
  }

  // onDeletBtnLinkClicked(params) {
  //   this.linksList.forEach((element, index) => {
  //     if (element.linkPath === params.data.linkPath) {
  //       this.confirmationDialogueService
  //         .confirm('Confirmation', 'Do you want to remove this record ?')
  //         .then((confirmed) => {
  //           if (confirmed) {
  //             this.linksList.splice(index, 1);
  //             this.gridApi2.setRowData(this.linksList);
  //           }
  //         });
  //     }
  //   });
  // }

  onDeletBtnLinkClicked(params) {
    this.linksList.forEach((element, index) => {
      if (element.linkPath === params.data.linkPath) {
        this.confirmationDialogueService
          .confirm(
            Constantss.CONFIRMATION,
            'Do you want to remove this record ?'
          )
          .then((confirmed) => {
            if (confirmed) {
              if (
                params.data.materialId != null &&
                params.data.materialId != undefined
              ) {
                this.trainingService
                  .deleteMaterial(params.data.materialId)
                  .subscribe(
                    (response) => {
                      if (response.status === '200') {
                        this.toast.success({
                          detail: Constantss.SUCCESS,
                          summary: 'Record deleted successfully',
                          duration: 5000,
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
              this.linksList.splice(index, 1);
              this.gridApi2.setRowData(this.linksList);
            }
          });
      }
    });
  }

  onDeletBtnDocClicked(params) {
    this.documentList.forEach((element, index) => {
      if (element.documentPath === params.data.documentPath) {
        this.confirmationDialogueService
          .confirm(
            Constantss.CONFIRMATION,
            'Do you want to remove this record ?'
          )
          .then((confirmed) => {
            if (confirmed) {
              if (
                params.data.materialId != null &&
                params.data.materialId != undefined
              ) {
                this.trainingService
                  .deleteMaterial(params.data.materialId)
                  .subscribe(
                    (response) => {
                      if (response.status === '200') {
                        this.toast.success({
                          detail: Constantss.SUCCESS,
                          summary: 'Record deleted successfully',
                          duration: 5000,
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
              this.documentsList.splice(index, 1);
              this.gridApi1.setRowData(this.documentsList);
            }
          });
      }
    });
  }

  // onDeletBtnDocClicked(params) {
  //   this.documentsList.forEach((element, index) => {
  //     if (element.documentPath === params.data.documentPath) {
  //       this.confirmationDialogueService
  //         .confirm('Confirmation', 'Do you want to remove this record ?')
  //         .then((confirmed) => {
  //           if (confirmed) {
  //             if(params.data.materialId!=undefined && params.data.materialId!=null){
  //               this.trainingService.deleteMaterial(params.data.materialId).subscribe(res=>{
  //                 if(res){
  //                   this.toast.success({
  //                     detail: Constantss.SUCCESS,
  //                     summary: 'Record deleted successfully',
  //                     duration: 5000,
  //                   });
  //                 }
  //               },(error)=>{
  //                 this.toast.error({
  //                   detail: Constantss.ERROR,
  //                   summary: error,
  //                   duration: 5000,
  //                 });
  //               }
  //               )
  //             }
  //             this.documentsList.splice(index, 1);
  //             this.gridApi1.setRowData(this.documentsList);
  //           }
  //         });
  //     }
  //   });
  // }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  cancelTrainingMaterial() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
      .then((confirmed) => {
        if (confirmed) {
          this.router.navigate(['/training/trainingMaster']);
        }
      });
  }

  cancelBatchInfo() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
      .then((confirmed) => {
        if (confirmed) {
          this.router.navigate(['/training/trainingMaster']);
        }
      });
  }

  cancelRange() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
      .then((confirmed) => {
        if (confirmed) {
          this.router.navigate(['/training/trainingMaster']);
        }
      });
  }

  cancelAssessment() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
      .then((confirmed) => {
        if (confirmed) {
          this.router.navigate(['/training/trainingMaster']);
        }
      });
  }

  questions(index): FormArray {
    this.arrayFordragDropPrePost =
      this.assessment[this.selectedtestIndex].value.questionnaire;
    return this.assessment[index].get('questionnaire') as FormArray;
  }

  dailyQuestions(index): FormArray {
    this.arrayFordragDropDaily =
      this.assessment[this.selectedDayIndex].value.questionnaire;
    return this.assessment[index].get('questionnaire') as FormArray;
  }

  addQuestion(questionIndex?, indexValue?) {
    if (
      this.assessment[indexValue].value.questionnaire.length <=
      this.assessment[indexValue].value.totalQuestions
    ) {
      let questionList = [];
      if (
        questionIndex !== null &&
        this.assessment[indexValue].status !== 'INVALID' &&
        this.prePostCount === true
      ) {
        let question = new Question();
        question =
          this.assessment[indexValue].value.questionnaire[questionIndex];
        let quiz = new Quiz();
        quiz.quizId =
          this.quizIdFromRes !== null
            ? this.quizIdFromRes
            : this.assessment[indexValue].value.questionnaire[questionIndex - 1]
              .quizId.quizId;
        question.quizId = quiz;
        questionList.push(question);
        this.trainingService
          .saveQuestions(questionList)
          .subscribe((response) => {
            if (response !== null) {
            if (
              this.assessment[indexValue].value.questionnaire.length ===
              this.assessment[indexValue].value.totalQuestions &&
              this.assessment[indexValue].status !== 'INVALID'
            ) {
              this.saveNextDisableForTest = false;
            }
            this.assessment[indexValue].value.questionnaire[
              questionIndex
            ].questionId = response.data[0].questionId;
            this.toast.success({
              detail: Constantss.SUCCESS,
              summary: 'Questions added successfully',
              duration: 5000,
            });
          }
          });
      }
      //  if (
      //   this.assessment[indexValue].value.questionnaire.length <
      //   this.assessment[indexValue].value.totalQuestions
      // ) {
      //   this.prePostCount = true;
      // this.questions(indexValue).push(this.newQuestion());
      // }

      if (
        this.assessment[indexValue].value.questionnaire.length <
        this.assessment[indexValue].value.totalQuestions &&
        this.prePostCount === true &&
        this.assessment[indexValue].status !== 'INVALID'
      ) {
        this.questions(indexValue).push(this.newQuestion());
      } else if (
        this.assessment[indexValue].value.questionnaire.length <
        this.assessment[indexValue].value.totalQuestions &&
        this.prePostCount === null
      ) {
        this.prePostCount = true;
        this.questions(indexValue).push(this.newQuestion());
      }
    } else {
      this.toast.error({
        detail: Constantss.ERROR,
        summary: 'Kindly change total number of questions to add question',
        duration: 5000,
      });
    }
  }

  newQuestion(): FormGroup {
    return this.formBuilder.group({
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      option1: ['', [Validators.required]],
      option2: ['', [Validators.required]],
      option3: ['', [Validators.required]],
      option4: ['', [Validators.required]],
      questionId: [''],
      displayOrder: [''],
    });
  }

  removeQuestion(questionIndex: number, testIndex) {
    let id =
      this.assessment[testIndex].value.questionnaire[questionIndex].questionId;
    this.trainingService.deleteQuestion(id).subscribe((res) => {
      this.toast.success({
        detail: Constantss.SUCCESS,
        summary: 'Question deleted successfully',
        duration: 5000,
      });
    });
    this.questions(testIndex).removeAt(questionIndex);
  }

  removeDailyQuestion(questionIndex: number, dayIndex) {
    let id =
      this.assessment[dayIndex].value.questionnaire[questionIndex].questionId;
    this.trainingService.deleteQuestion(id).subscribe((res) => {
      this.toast.success({
        detail: Constantss.SUCCESS,
        summary: 'Question deleted successfully',
        duration: 5000,
      });
    });
    this.dailyQuestions(dayIndex).removeAt(questionIndex);
  }

  onDailyTotalQuesSave(e) {
    let value = this.questions(this.selectedDayIndex).value.length;
    let totalQues = this.assessment[this.selectedDayIndex].value.totalQuestions;
    if (value <= totalQues) {
      let quiz = new Quiz();
      quiz.day = this.selectedDayIndex + 1;
      let training = new Training();
      let entity = new Entity();
      quiz.noOfQuestions = this.assessment[e].value.totalQuestions;
      training.trainingId = this.trainingId;
      entity.id = this.quizId;
      quiz.trainingId = training;
      quiz.quizTypeId = entity;
      this.saveNextDisableForTest = true;
      this.trainingService.saveTraining(quiz).subscribe((res) => {
        if (res && res.data !== null) {
        this.quizIdFromRes = res.data[0].quizId;
        this.totalQuestDisabled = true;
        this.hiddenEdit = false;
        this.toast.success({
          detail: Constantss.SUCCESS,
          summary: 'Total number of questions has been saved successfully',
          duration: 5000,
        });
        if (this.dailyQuestions(e).length === 0) {
          this.addDailyQuestion(null, e);
          this.selectQuizDisable = true;
        }
      }
      });
    } else {
      this.saveNextDisableForTest = true;
      this.toast.warning({
        summary:
          'Total number of questions should be greater then questions entered',
        duration: 3000,
      });
    }
  }

  addDailyQuestion(questionIndex?, indexValue?) {
    if (
      this.assessment[indexValue].value.questionnaire.length <=
      this.assessment[indexValue].value.totalQuestions
    ) {
      let questionList = [];
      if (
        questionIndex !== null &&
        this.assessment[indexValue].status !== 'INVALID' &&
        this.dailyCount === true
      ) {
        let question = new Question();
        question =
          this.assessment[indexValue].value.questionnaire[questionIndex];
        let quiz = new Quiz();
        quiz.quizId =
          this.quizIdFromRes !== null
            ? this.quizIdFromRes
            : this.assessment[indexValue].value.questionnaire[questionIndex - 1]
              .quizId.quizId;
        question.quizId = quiz;
        questionList.push(question);
        this.trainingService
          .saveQuestions(questionList)
          .subscribe((response) => {
            if (
              this.assessment[indexValue].value.questionnaire.length ===
              this.assessment[indexValue].value.totalQuestions &&
              this.assessment[indexValue].status !== 'INVALID'
            ) {
              this.saveNextDisableForTest = false;
            }
            this.assessment[indexValue].value.questionnaire[
              questionIndex
            ].questionId = response.data[0].questionId;
            this.toast.success({
              detail: Constantss.SUCCESS,
              summary: 'Questions added successfully',
              duration: 5000,
            });
          });
      }
      if (
        this.assessment[indexValue].value.questionnaire.length <
        this.assessment[indexValue].value.totalQuestions &&
        this.dailyCount === true &&
        this.assessment[indexValue].status !== 'INVALID'
      ) {
        this.dailyQuestions(indexValue).push(this.newQuestion());
      } else if (
        this.assessment[indexValue].value.questionnaire.length <
        this.assessment[indexValue].value.totalQuestions &&
        this.dailyCount === null
      ) {
        this.dailyCount = true;
        this.dailyQuestions(indexValue).push(this.newQuestion());
      }
      // this.dailyQuestions(indexValue).push(this.newQuestion());
    } else {
      this.toast.error({
        detail: Constantss.ERROR,
        summary: 'Kindly change total number of questions to add question',
        duration: 5000,
      });
    }
  }

  daySelection(indexValue) {
    let check = null;
    let noOfDays;
    if (this.batchInfo.value && this.batchInfo.value.numberOfDays) {
      noOfDays = this.batchInfo.value.numberOfDays;
    } else if (this.training && this.training.noOfDays) {
      noOfDays = this.training.noOfDays;
    }
    for (let i = 0; i < noOfDays; i++) {
      if (
        this.assessment[i].value.totalQuestions &&
        this.assessment[i].status === 'INVALID'
      ) {
        this.toast.warning({
          summary: 'Kindly fill all the required fields!',
          duration: 3000,
        });
        check = true;
      }
    }
    if (check !== true) {
      this.selectedDayIndex = indexValue;
      this.activeButton = indexValue;
      if (this.dailyQuestionList.length > 0) {
        this.dailyCount = true;
        let value = indexValue + 1;
        let list = this.dailyQuestionList.filter((i) => i.day === value);
        if (list && list.length > 0) {
          this.assessment[indexValue] = this.formBuilder.group({
            totalQuestions: [list.length, [Validators.required]],
            questionnaire: this.formBuilder.array([]),
          });
          this.questionsOnEditAssess(list, indexValue);
        }
      }
    }
  }

  testSelection(indexValue) {
    if (
      (this.assessment[0].value.totalQuestions &&
        this.assessment[0].status === 'INVALID') ||
      (this.assessment[1].value.totalQuestions &&
        this.assessment[1].status === 'INVALID')
    ) {
      this.toast.warning({
        summary: 'Kindly fill all the required fields!',
        duration: 3000,
      });
    } else {
      this.selectedtestIndex = indexValue;
      this.activeButton = indexValue;
      if (indexValue === 0) {
        this.quizId = 54;
        this.editResponse = this.responseFinal.data[0];
        this.prePostCount = null;
      } else if (indexValue === 1) {
        this.quizId = 55;
        this.editResponse = this.responseFinal.data[1];
        if (this.postQuestionList.length > 0) {
          this.prePostCount = true;
          this.assessment[1] = this.formBuilder.group({
            totalQuestions: [
              this.postQuestionList.length,
              [Validators.required],
            ],
            questionnaire: this.formBuilder.array([]),
          });
          this.questionsOnEditAssess(this.postQuestionList, 1);
          this.prePostCount = null;
        }
      }
      this.quizIdFromRes = null;
    }
  }

  onTotalQuestionSaveClick(e) {
    let value = this.questions(this.selectedtestIndex).value.length;
    let totalQues =
      this.assessment[this.selectedtestIndex].value.totalQuestions;
    if (value !== 0) {
      this.prePostCount = true;
    }
    if (value <= totalQues) {
      let quiz = new Quiz();
      let training = new Training();
      let entity = new Entity();
      if (value === 0) {
        quiz.quizId = null;
      } else {
        quiz.quizId = this.editResponse ? this.editResponse.quizId : null;
      }
      quiz.noOfQuestions = this.assessment[e].value.totalQuestions;
      training.trainingId = this.trainingId;
      entity.id = this.quizId;
      quiz.trainingId = training;
      quiz.quizTypeId = entity;
      this.saveNextDisableForTest = true;
      this.trainingService.saveTraining(quiz).subscribe((res) => {
        if (res && res.data !== null) {
        this.quizIdFromRes = res.data[0].quizId;
        this.totalQuestDisabled = true;
        // if (this.quizId === 54) {
        //   this.totalQuestDisabled = true;
        // } else if (this.quizId === 54) {
        //   this.posttotalQuestDisabled = true;
        // }
        this.hiddenEdit = false;
        this.toast.success({
          detail: Constantss.SUCCESS,
          summary: 'Total number of questions has been saved successfully',
          duration: 5000,
        });
        if (this.questions(e).length === 0) {
          this.addQuestion(null, e);
          this.selectQuizDisable = true;
        }
      }
      });
    } else {
      this.toast.warning({
        summary:
          'Total number of questions should be greater then questions entered',
        duration: 3000,
      });
    }
  }

  onTotalQuestionEditClick() {
    this.totalQuestDisabled = false;
    this.posttotalQuestDisabled = false;
  }

  dailyDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInFormArray(
        this.dailyQuestions(this.selectedDayIndex),
        event.previousIndex,
        event.currentIndex
      );
    } else {
      moveItemInFormArray(
        this.dailyQuestions(this.selectedDayIndex),
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  preDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInFormArray(
        this.questions(this.selectedtestIndex),
        event.previousIndex,
        event.currentIndex
      );
    } else {
      moveItemInFormArray(
        this.questions(this.selectedtestIndex),
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  //CHECKLIST

  createCheckListForm() {
    this.empForm = this.formBuilder.group({
      checkList: this.formBuilder.array([this.newEmployee()]),
    });
  }

  createFormMonitoringQuestions() {
    this.monitoringQuestionsForm = this.formBuilder.group({
      monitorQuestionFormArray: this.formBuilder.array([
        this.newMonitoringQuestions(),
      ]),
    });
  }

  // addMonitoringQuestions(){
  //   this.monitorQuestionArr.push(this.createQuestionText());
  // }

  // removeMonitoringQuestionAtIndex(i){
  //   this.monitorQuestionArr.removeAt(i);
  // }

  // saveMonitoringQuestionData(){
  //   this.savedData = this.monitoringQuestionsForm.value;
  // }

  // createQuestionText(){
  //   return this.formBuilder.group({
  //     questionText : []
  //   })
  // }

  get employees(): FormArray {
    return this.empForm.get('checkList') as FormArray;
  }

  get monitorQuestionArr() {
    return this.monitoringQuestionsForm.get(
      'monitorQuestionFormArray'
    ) as FormArray;
  }

  newEmployee(): FormGroup {
    return this.formBuilder.group({
      checkListName: [
        '',
        [
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9- ]+$'),
          Validators.required,
        ],
      ],
      checkListItems: this.formBuilder.array([this.newSkill()], Validators.required),
    });
  }

  newMonitoringQuestions(): FormGroup {
    return this.formBuilder.group({
      question: ['', [Validators.required]],
      training: []
    });
  }

  get checkListName() {
    return this.employees.get('checkListName');
  }

  addEmployee() {
    this.employees.push(this.newEmployee());
  }

  addMoreMonitoringQuest() {
    this.monitorQuestionArr.push(this.newMonitoringQuestions());
  }

  removeEmployee(id,empIndex: number) {
    this.confirmationDialogueService
      .confirm(
        Constantss.CONFIRMATION,
        'Are you sure you want to remove this record?'
      )
      .then((confirmed) => {
        if (confirmed) {
          this.trainingService.deleteCheckListMaster(id.value.checkListId).subscribe(res=>{
            if(res!=null){
                this.employees.removeAt(empIndex);
              this.toast.success({
                detail: 'Success',
                summary: res.message,
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
           }) 
        }
      });
  }

  removeMonitoringQuestionAtIndex(i,questionId) {
    this.confirmationDialogueService
      .confirm(
        Constantss.CONFIRMATION,
        'Are you sure you want to remove this record?'
      )
      .then((confirmed) => {
        if (confirmed) {
          this.monitorQuestionArr.removeAt(i);
          this.trainingService.deleteMonitorQuestion(questionId.value.monitorQuestionId).subscribe(res=>{
            if(res!=null){
              this.toast.success({
                detail: 'Success',
                summary: res.message,
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
           }) ;
        }
      });
  }

  employeeSkills(empIndex?: number): FormArray {
    return this.employees.at(empIndex).get('checkListItems') as FormArray;
  }

  newSkill(): FormGroup {
    return this.formBuilder.group({
      checkListItemName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9- ]+$'),
        ],
      ],
    });
  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  removeEmployeeSkill(id,empIndex: number, skillIndex: number) {
    this.confirmationDialogueService
    .confirm(Constantss.CONFIRMATION, 'Are your sure you want to remove this item from checklist')
    .then((confirmed) => {
      if (confirmed) {
       this.trainingService.deleteCheckListItem(id.value).subscribe(res=>{
        if(res!=null){
          this.toast.success({
            detail: 'Success',
            summary: res.message,
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
       }) ;
      }
    });
    if (skillIndex != 0) {
      this.employeeSkills(empIndex).removeAt(skillIndex);
      console.log(empIndex+" "+skillIndex);
    }
  }


  // removeEmployee(empIndex: number) {
  //   this.confirmationDialogueService
  //     .confirm(
  //       Constantss.CONFIRMATION,
  //       'Are you sure you want to remove this record?'
  //     )
  //     .then((confirmed) => {
  //       if (confirmed) {
  //         if (empIndex != 0) {
  //           console.log(empIndex);
  //           this.employees.removeAt(empIndex);
  //         }
  //       }
  //     });
  // }

  onSubmit() { }

  mapToModelCheckList(data: any) {
    let arr = [];
    data.checkList.forEach((i) => {
      let checkListMaster = new ChecklistMaster();
      let training = new Training();
      let itemArray = [];
      training.trainingId = this.trainingId;
      checkListMaster.training = training;
      checkListMaster.checkListId=i.checkListId
      checkListMaster.checkListName = i.checkListName;
      i.checkListItems.forEach((checkListItemName) => {
        itemArray.push(checkListItemName);
      });
      checkListMaster.checkListItems = itemArray;
      arr.push(checkListMaster);
    });
    this.finalSubmitResult = arr;
    return this.finalSubmitResult;
  }
}

const stateList = [
  {
    trainingArea: {
      name: 'State',
    },
    trainingTypeId: {
      entityName: 'Madhya Pradesh',
    },
  },
];
