import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Entity } from 'src/app/layouts/baseline/model/entity.model';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { SubGroup } from 'src/app/layouts/training/model/sub-group';
import { User } from 'src/app/views/pages/login/model/user.model';
import { Constantss } from 'src/utils/constantss';
import { Training } from '../../../../model/training';
import { GroupService } from '../../../../services/group.service';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss'],
})
export class AddTrainingComponent implements OnInit {
  groups = [];
  subGroups = [];
  level = [];
  @Input() allGroupFromParent: Training[] = [];
  trainingTitle: string;
  training: Training[] = [];
  trainingData = new Training();
  trainingObj = new Training();
  @Output() changeIndicator = new EventEmitter<string>();
  @Output() dataLoaded = new EventEmitter<string>();
  @Input() id: any;
  userId: any;
  editData: any;
  ediDataResponse: any;
  addTrainingForm: FormGroup;
  changevar: string;
  startDate: any;
  endDate: any;

  constructor(
    private clientStorage: ClientSideStorageService,
    private toast: NgToastService,
    private dataSharing: DataSharingService,
    private fb: FormBuilder,
    private confirmationDialogueService: ConfirmationDialogService,
    private router: Router,
    private _groupService: GroupService
  ) {
    this.getAllRoleTypes();
    this.getAllActiveGroups();
    const userId = this.clientStorage.get('userId');
    this.userId = userId;
    this.createFormAdd();
  }

  ngOnInit(): void {
    // this.allGroupFromParent.forEach((v1) => (this.id = v1.trainingId));
    this.createFormAdd();
  }

  ngOnChanges() {
    if (this.id) {
      this.trainingTitle = 'Edit Training';
      this.training = this.allGroupFromParent.filter(
        (v1) => this.id === v1.trainingId
      );
      this.training.forEach((obj) => {
        this.trainingObj.status = obj.status;
        this.trainingObj.isActive = obj.isActive;
        this.trainingObj.subGroupId = obj.subGroupId;
        this.trainingObj.trainingName = obj.trainingName;
        this.trainingObj.trainingId = obj.trainingId;
        this.trainingObj.trainingLevelId = obj.trainingLevelId;
        this.trainingObj.approxTrainees = obj.approxTrainees;
        this.trainingObj.startDate = this.dateFormattergrid(obj.startDate);
        this.trainingObj.endDate = this.dateFormattergrid(obj.endDate);
        this.trainingObj.description = obj.description;
      });
      this.ediDataResponse = this.dataSharing.getGlobalEditData();
      this.editData = this.ediDataResponse.source._value;
      this.createFormEdit();
    } else {
      this.trainingObj = new Training();
      this.trainingTitle = 'Add Training';
      this.createFormAdd();
    }
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

  createFormAdd() {
    this.addTrainingForm = this.fb.group({
      trainingId: [],
      group: [null, [Validators.required]],
      subGroup: [null, [Validators.required]],
      training: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9 ]+$'),
        ],
      ],
      trainingLevel: [],
      approxTrainee: [],
      startDate: [],
      endDate: [],
      description: ['', [Validators.maxLength(250)]],
      isActive: [true],
      status: [],
    });
  }

  createFormEdit() {
    this.getTrainingSubGroupsByGroupId(this.trainingObj.subGroupId.group.groupId);
    this.addTrainingForm = this.fb.group({
      trainingId: [this.trainingObj.trainingId],
      group: [this.trainingObj.subGroupId.group.groupId, [Validators.required]],
      subGroup: [this.trainingObj.subGroupId.subGroupId, [Validators.required]],
      training: [
        this.trainingObj.trainingName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9 ]+$'),
        ],
      ],
      trainingLevel: [this.trainingObj.trainingLevelId.id],
      approxTrainee: [this.trainingObj.approxTrainees],
      startDate: [this.trainingObj.startDate],
      endDate: [this.trainingObj.endDate],
      description: [this.trainingObj.description, [Validators.maxLength(250)]],
      isActive: [this.trainingObj.isActive],
      status: [this.trainingObj.status.id],
    });
  }

  get group() {
    return this.addTrainingForm.get('group');
  }

  get subGroup() {
    return this.addTrainingForm.get('subGroup');
  }

  get description() {
    return this.addTrainingForm.get('description');
  }
  get isActive() {
    return this.addTrainingForm.get('isActive');
  }
  get trainings() {
    return this.addTrainingForm.get('training');
  }

  getAllRoleTypes() {
    this.dataSharing.fetchEntityById(8).subscribe((resp) => {
      if (resp && resp.data !== null) {
      const levels = resp.data;
      this.level = levels.filter((lvl) => lvl.id <= 43);
      }
    });
  }

  getAllActiveGroups() {
    this._groupService.getTrainingGroups().subscribe((response) => {
      if (response && response.data !== null) {
      const groups = response.data;
      this.groups = groups.filter((grp) => grp.isActive === true);
      }
    });
  }

  getTrainingSubGroupsByGroupId(id) {
    this._groupService.getSubGroupByGroupId(id).subscribe((response) => {
      if (response && response.data !== null) {
      this.subGroups = response.data;
      }
    });
  }

  selectedGroup(event) {
    this._groupService
      .getSubGroupByGroupId(event.groupId)
      .subscribe((response) => {
        if (response && response.data !== null) {
        const subGroups = response.data;
        if (subGroups != null) {
          this.addTrainingForm.controls['subGroup'].reset();
          this.subGroups = subGroups.filter(
            (subGroup) => subGroup.isActive === true
          );
        } else if (subGroups == null) {
          this.subGroups = null;
          this.addTrainingForm.controls['subGroup'].reset();
        } else {
          this.addTrainingForm.controls['subGroup'].reset();
        }
      }
      });
  }

  save() {
    this.confirmationDialogueService
      .confirm('Confirmation', 'Do you want to save this information?')
      .then((confirmed) => {
        if (confirmed) {
          let training = new Training();
          training = this.mapToModel(this.addTrainingForm.value);
          this._groupService.saveTraining(training).subscribe(
            (response) => {
              if (response.status === '200') {
                this.toast.success({
                  detail: 'Success',
                  summary: Constantss.SAVED_SUCCESSFULLY,
                  duration: 10000,
                });
                this.changevar = 'ok';
                this.changeIndicator.emit(this.changevar);                
                this.subGroups = [];
                this.emit();
                this.router.navigate(['/training/trainingMaster']);
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

  mapToModel(data: any): Training {
    let training = new Training();
    training.trainingId = data.trainingId;
    training.trainingName = data.training;
    training.approxTrainees = data.approxTrainee;
    training.startDate = data.startDate;
    training.endDate = data.endDate;
    training.description = data.description;
    training.isActive = data.isActive;
    training.updatedOn= new Date();
    let subGroup = new SubGroup();
    subGroup.subGroupId = data.subGroup;
    training.subGroupId = subGroup;

    let entity = new Entity();
    entity.id = data.trainingLevel;
    training.trainingLevelId = entity;

    let status = new Entity();
    if (this.editData != undefined && this.editData.status.id != null) {
      status.id = this.editData.status.id;
      training.status = status;
    } else {
      status.id = 49;
      training.status = status;
    }

    let initiateTrainingStatus = new Entity();
    initiateTrainingStatus.id = 60;
    training.initiateTrainingStatus = initiateTrainingStatus;

    training.updatedOn = new Date();
    training.createdOn = new Date();

    let createdByUser = new User();
    createdByUser.userId = this.userId;
    training.createdBy = createdByUser;

    let updatedByUser = new User();
    updatedByUser.userId = this.userId;
    training.updatedBy = updatedByUser;

    return training;
  }

  closeModel() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
      .then((confirmed) => {
        if (confirmed) {
          this.subGroups = [];
          this.addTrainingForm.reset();
          this.addTrainingForm.controls['isActive'].setValue(true);
          this.changevar = 'cancel';
          this.changeIndicator.emit(this.changevar);
          this.emit();
        }
      });
  }

  emit() {
    this.dataLoaded.emit('AddTrainingComponent');
  }

  getStartDate(event) {
    this.startDate = new Date(event.target.value).getTime();
  }

  getEndDate(event) {
    this.endDate = new Date(event.target.value).getTime();
    if (this.endDate < this.startDate) {
      this.addTrainingForm.controls['endDate'].setValue(null);
      document.getElementById('error').innerHTML =
        'End Date must be greater than or equal to Start Date';
      document.getElementById('error').style.color = 'red';
    } else {
      document.getElementById('error').innerHTML = '';
    }
  }
}
