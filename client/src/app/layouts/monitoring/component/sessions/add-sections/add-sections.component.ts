import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Entity } from 'src/app/layouts/baseline/model/entity.model';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { User } from 'src/app/views/pages/login/model/user.model';
import { Constantss } from 'src/utils/constantss';
import { SectionMaster } from '../../../model/section-master';
import { SectionsService } from '../../../service/sections.service';

@Component({
  selector: 'app-add-sections',
  templateUrl: './add-sections.component.html',
  styleUrls: ['./add-sections.component.scss']
})
export class AddSectionsComponent implements OnInit {

  @Input() id: any;
  @Output() changeIndicator = new EventEmitter<string>();
  @Output() dataLoaded = new EventEmitter<string>();
  @Input() allGroupFromParent = [];
  addGroupForm: FormGroup;
  checked = true;
  sectionTitle = '';
  groupData: any;
  allGroupData: any;
  userId: any;
  edit: any;
  editData: any;
  purpose = [];
  changevar: string;
  constructor(
    private fb: FormBuilder,
    private confirmationDialogueService: ConfirmationDialogService,
    private router: Router,
    private dataSharing: DataSharingService,
    private toast: NgToastService,
    private clientStorage: ClientSideStorageService,
    private _sectionService: SectionsService
  ) {
    const userId = this.clientStorage.get('userId');
    this.userId = Number(userId);
    this.dataSharing.getGlobalEditData().subscribe((response) => {
      if (response != null) {
        this.editData = response;
        this.createFormEdit();
      } else {
        this.createFormAdd();
      }
    })
  }

  ngOnChanges() {
    if (this.id) {
      this.sectionTitle = 'Edit Section';
      this.createFormEdit();
    } else {
      this.sectionTitle = 'Add Section';
      this.createFormAdd();
    }

  }

  ngOnInit(): void {
  }

  emit() {
    this.dataLoaded.emit('AddSectionsComponent');
  }

  createFormAdd() {
    this.addGroupForm = this.fb.group({
      sectionId: [],
      section: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9 ]+$'),
        ],
      ],
      description: ['', [Validators.maxLength(250)]],
      isActive: [true],
    });
  }

  createFormEdit() {
    this.addGroupForm = this.fb.group({
      sectionId: [this.editData.sectionId],
      section: [this.editData.section,
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('^[A-Za-z0-9 ]+$'),
      ],
      ],
      description: [this.editData.description, [Validators.maxLength(200)]],
      isActive: [this.editData.status],
    });
  }

  get section() {
    return this.addGroupForm.get('section');
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
          let sectionMaster = new SectionMaster();
          sectionMaster = this.mapToModel(this.addGroupForm.value);
          this._sectionService.saveSectionList(sectionMaster).subscribe((response) => {
            if (response.status === '200') {
              this.toast.success({
                detail: Constantss.SUCCESS,
                summary: response.message,
                duration: 10000,
              });
              this.changevar = "ok";
              this.changeIndicator.emit(this.changevar);
              this.emit();
              this.router.navigate(['/monitoring/sections']);
            }
          }, (error) => {
            this.toast.error({
              detail: Constantss.ERROR,
              summary: error.error,
              duration: 10000,
            })
          })
        }
      });
  }

  mapToModel(data: any): SectionMaster {
    let sectionMaster = new SectionMaster();
    sectionMaster.sectionId = data.sectionId
    let createdBy = new User();
    createdBy.userId = this.userId;
    sectionMaster.createdBy = createdBy;
    sectionMaster.createdOn = new Date();
    sectionMaster.description = data.description;
    // let entity = new Entity();
    // entity.id = data.purpose;
    // sectionMaster.purposeId = entity;
    sectionMaster.section = data.section;
    sectionMaster.status = data.isActive;
    let updatedBy = new User();
    updatedBy.userId = this.userId;
    sectionMaster.updatedBy = updatedBy;
    sectionMaster.updatedOn = new Date();
    return sectionMaster;
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

        }
      });
  }


}

const purpose = [{
  id: 1,
  name: 'Self Assessment'
}, {
  id: 2,
  name: 'Monitoring Visit'
}, {
  id: 3,
  name: 'Both'
}]
