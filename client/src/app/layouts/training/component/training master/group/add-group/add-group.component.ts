import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { User } from 'src/app/views/pages/login/model/user.model';
import { Constantss } from 'src/utils/constantss';
import { Group } from '../../../../model/group';
import { GroupService } from '../../../../services/group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  addGroupForm: FormGroup;
  group: Group[] = [];
  groupObj = new Group;
  editData: any;
  userId: number;
  ediDataResponse: any;
  @Input() allGroupFromParent: Group[] = [];
  constructor(private confirmationDialogueService: ConfirmationDialogService,
    private toast: NgToastService,
    private router : Router,
    private fb: FormBuilder, private dataSharing: DataSharingService,
    private clientStorage: ClientSideStorageService,
    private _groupService: GroupService, private confirmationDialogue: ConfirmationDialogService) {
    const userId = this.clientStorage.get('userId');
    this.userId = userId;
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
    // this.allGroupFromParent.forEach((v1) => (this.id = v1.groupId));
    this.createFormAdd();
  }
  ngOnChanges() {
    if (this.id) {
      this.groupTitle = "Edit Group";
      this.group = this.allGroupFromParent.filter((v1) => (this.id == v1.groupId));
      this.group.forEach(obj => {
        this.groupObj.description = obj.description;
        this.groupObj.isActive = obj.isActive;
        this.groupObj.groupName = obj.groupName;
        this.groupObj.groupId  = obj.groupId;
      })
      this.createFormEdit();

    }
    else {
      this.groupTitle = "Add Group";
      this.groupObj = new Group();
      this.createFormAdd();
    }
  }
  createFormAdd() {
    this.addGroupForm = this.fb.group({
      groupId: [],
      groupName: ['',
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
      groupId: [this.groupObj.groupId],
      groupName: [this.groupObj.groupName,
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
    return this.addGroupForm.get('groupName');
  }

  get description() {
    return this.addGroupForm.get('description');
  }
  get isActive() {
    return this.addGroupForm.get('isActive');
  }


  closeModal() {
    this.onReset();
    this.changevar = "cancel";
    this.changeIndicator.emit(this.changevar);
    this.emit();
  }
  onReset = () => {

  };


  openForm() {
    this.createFormAdd();
  }
  closeModel() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
      .then((confirmed) => {
        if (confirmed) {
          this.addGroupForm.reset();
          this.addGroupForm.controls['isActive'].setValue(true);
          this.changevar = "cancel";
          this.changeIndicator.emit(this.changevar);
          this.emit();
        }
      })
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
    this.confirmationDialogue.confirm('Confirmation', 'Do you want to save this information?').
      then((confirmed) => {
        if (confirmed) {
          this.groupObj = this.addGroupForm.value;
          let user = new User();
          user.userId = String(this.userId);
          this.groupObj.updatedBy = user;
          this.groupObj.updatedOn = new Date();
          this._groupService.saveTrainingGroups(this.groupObj).subscribe((response) => {
            if (response.status === "200") {
           this.toast.success({
            detail : 'Success',
            summary : Constantss.SAVED_SUCCESSFULLY,
            duration: 10000
           });
           this.changevar = "ok";
           this.changeIndicator.emit(this.changevar);
           this.emit();
           this.router.navigate(['/training/group']);
            }
          },
          (error)=>{
            this.toast.error({
              detail : Constantss.ERROR,
              summary : error.error,
              duration: 10000
            });
          })
        }
      })
  }



}
