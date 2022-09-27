import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { User } from 'src/app/views/pages/login/model/user.model';
import { Constantss } from 'src/utils/constantss';
import { Group } from '../../../../model/group';
import { SubGroup } from '../../../../model/sub-group';
import { GroupService } from '../../../../services/group.service';

@Component({
  selector: 'app-add-sub-group',
  templateUrl: './add-sub-group.component.html',
  styleUrls: ['./add-sub-group.component.scss'],
})
export class AddSubGroupComponent implements OnInit {
  groups = [];
  addGroupForm: FormGroup;
  subGroup: SubGroup[] = [];
  groupObj = new SubGroup();
  editData: any;
  ediDataResponse: any;
  @Input() allSubGroupFromParent: SubGroup[] = [];
  userId;
  constructor(
    private confirmationDialogueService: ConfirmationDialogService,
    private router: Router,
    private _groupService: GroupService,
    private toast: NgToastService,
    private clientSideStorage: ClientSideStorageService,
    private fb: FormBuilder,
    private dataSharing: DataSharingService
  ) {
    const userId = this.clientSideStorage.get('userId');
    this.userId = userId;
    this.getGroups();
    this.ediDataResponse = this.dataSharing.getGlobalEditData();
    this.editData = this.ediDataResponse.source._value;
    this.createFormAdd();
  }
  valueFlag;
  changevar: string;
  @Input() id: any;
  @Output() changeIndicator = new EventEmitter<string>();
  @Output() dataLoaded = new EventEmitter<string>();
  groupTitle: string;
  ngOnInit(): void {
    // this.allSubGroupFromParent.forEach((v1) => (this.id = v1.subGroupId));
    this.createFormAdd();
  }
  ngOnChanges() {
    if (this.id) {
      this.groupTitle = 'Edit Sub-Group';
      this.subGroup = this.allSubGroupFromParent.filter(
        (v1) => this.id == v1.subGroupId
      );
      this.subGroup.forEach((obj) => {
        this.groupObj.group = obj.group;
        this.groupObj.description = obj.description;
        this.groupObj.isActive = obj.isActive;
        this.groupObj.subGroupName = obj.subGroupName;
        this.groupObj.subGroupId = obj.subGroupId;
      });
      this.createFormEdit();
    } else {
      this.groupTitle = 'Add Sub-Group';
      this.groupObj = new SubGroup();
      this.createFormAdd();
    }
  }
  createFormAdd() {
    this.addGroupForm = this.fb.group({
      group: [null, [Validators.required]],
      subGroupId: [],
      subGroupName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9- ]+$'),
        ],
      ],
      description: ['', [Validators.maxLength(250)]],
      isActive: [true],
    });
  }

  createFormEdit() {
    this.addGroupForm = this.fb.group({
      group: [this.groupObj.group.groupId, [Validators.required]],
      subGroupId: [this.groupObj.subGroupId],
      subGroupName: [
        this.groupObj.subGroupName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9- ]+$'),
        ],
      ],
      description: [this.groupObj.description, [Validators.maxLength(250)]],
      isActive: [this.groupObj.isActive],
    });
  }

  get groupName() {
    return this.addGroupForm.get('subGroupName');
  }

  get group() {
    return this.addGroupForm.get('group');
  }

  get description() {
    return this.addGroupForm.get('description');
  }
  get isActive() {
    return this.addGroupForm.get('isActive');
  }

  getGroups() {
    this._groupService.getTrainingGroups().subscribe((response) => {
      if (response && response.data !== null) {
      const allGroups = response.data;
      this.groups = allGroups.filter((grp)=>grp.isActive===true);
      }
    });
  }

  closeModal() {
    this.onReset();
    this.changevar = 'cancel';
    this.changeIndicator.emit(this.changevar);
    this.emit();
  }
  onReset = () => { };

  openForm() {
    this.createFormAdd();
  }
  closeModel() {
    this.confirmationDialogueService
      .confirm(
        Constantss.CONFIRMATION,
        Constantss.SURE_CANCEL
      )
      .then((confirmed) => {
        if (confirmed) {
          this.addGroupForm.reset();
          this.addGroupForm.controls['isActive'].setValue(true);
          this.changevar = 'cancel';
          this.changeIndicator.emit(this.changevar);
          this.emit();
        }
      });
  }

  emit() {
    this.dataLoaded.emit('AddGroupComponent');
  }
  setFlag(value) {
    if (value) {
      this.valueFlag = value;
    } else {
      this.valueFlag = value;
    }
  }

  save() {
    this.confirmationDialogueService
      .confirm('Confirmation', 'Do you want to save this information?')
      .then((confirmed) => {
        if (confirmed) {
          let subGroup = new SubGroup();
          subGroup = this.mapModel(this.addGroupForm.value);
          this._groupService.saveTrainingSubGroup(subGroup).subscribe(
            (response) => {
              if (response.status === '200') {
                this.toast.success({
                  detail: 'Success',
                  summary: Constantss.SAVED_SUCCESSFULLY,
                  duration: 10000,
                });
          this.changevar = "ok";
          this.changeIndicator.emit(this.changevar);
          this.emit();
                this.router.navigate(['/training/subGroup']);
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

  mapModel(data: any): SubGroup {
    let subGroup = new SubGroup();
    subGroup.subGroupId = data.subGroupId;
    let group = new Group();
    group.groupId = data.group;
    subGroup.group = group;
    subGroup.subGroupName = data.subGroupName;
    subGroup.description = data.description;
    subGroup.isActive = data.isActive;
    subGroup.updatedOn = new Date();
    subGroup.createdOn = new Date();
    subGroup.createdBy = this.userId;
    let user = new User();
    user.userId = this.userId;
    subGroup.updatedBy = user;
    return subGroup;
  }
}
