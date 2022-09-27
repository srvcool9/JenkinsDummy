import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Group } from 'src/app/layouts/baseline/model/assessment model/group';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { User } from 'src/app/views/pages/login/model/user.model';
import { Constantss } from 'src/utils/constantss';
import { GroupService } from '../../../../service/assessment service/group service/group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  addGroupForm: FormGroup;
  checked = true;
  groupTitle = '';
  groupData: any;
  allGroupData: any;
  editGroup = new Group();
  userId:number;
  @Input() id: any;
  @Output() changeIndicator = new EventEmitter<string>();
  @Output() dataLoaded = new EventEmitter<string>();  
  @Input() allGroupFromParent: Group[]=[];
  changevar: string;
  constructor(
    private fb: FormBuilder,
    private groupService : GroupService,
    private confirmationDialogueService: ConfirmationDialogService,
    private router: Router,
    private dataSharing:DataSharingService,
    private toast: NgToastService,
    private clientStorage: ClientSideStorageService
  ) {
    const userId=this.clientStorage.get('userId');
    this.userId=Number(userId);
    this.dataSharing.getGlobalEditData().subscribe((response) => {
      if (response!=null) {
        this.groupTitle = 'Edit Group';
        this.editGroup=response;
        this.createFormEdit();
      } else {
        this.groupTitle = 'Add Group';
        this.createFormAdd();
      }
    });
  }

  ngOnInit(): void {}

  createFormEdit() {
    this.addGroupForm = this.fb.group({
      groupId: [this.editGroup.groupId],
      groupName: [
        this.editGroup.groupName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9 ]+$'),
        ],
      ],
      description: [ this.editGroup.description, [Validators.maxLength(200)]],
      isActive: [this.editGroup.isActive],
    });
  }

  
  createFormAdd() {
    this.addGroupForm = this.fb.group({
      groupId: [],
      groupName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9 ]+$'),
        ],
      ],
      description: [ '', [Validators.maxLength(200)]],
      isActive: [true],
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

  save() {
    this.confirmationDialogueService
      .confirm('Confirmation', 'Do you want to save this information ?')
      .then((confirmed) => {
        if (confirmed) {
         this.editGroup = this.addGroupForm.value;
         let user= new User();
         user.userId=String(this.userId);
         this.editGroup.updatedBy = user ;
         this.editGroup.updatedOn= new Date();
         this.groupService.postGroup(this.editGroup).subscribe(
          (response) => {
            if (response.status==='200') {
              this.toast.success({
                detail: Constantss.SUCCESS,
                summary: Constantss.SAVED_SUCCESSFULLY,
                duration: 10000,
              });
              this.router.navigate(['/baseline/group']);
            }
          },
          (error) => {
            this.toast.error({
              detail: Constantss.ERROR,
              summary: error.error,
              duration: 10000,
            });
          }
         )

        }
      });
  }


  cancel() {
    this.confirmationDialogueService
      .confirm(
        Constantss.CONFIRMATION,
        Constantss.SURE_CANCEL
      )
      .then((confirmed) => {
        if (confirmed) {
          this.addGroupForm.reset();
          this.changevar = "cancel";
          this.changeIndicator.emit(this.changevar);
          this.emit(); 
          // this.router.navigate(['/baseline/group']);
        }
      });
  }
  
  emit() {
    this.dataLoaded.emit('AddGroupComponent');
  }

}
