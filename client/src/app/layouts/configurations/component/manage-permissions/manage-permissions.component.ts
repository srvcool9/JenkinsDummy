import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UserRoleService } from '../../service/manage role service/user-role.service';
import { AssignPermission } from '../../model/assign-permission';
import { PermissionService } from '../../service/permission.service';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { Permission } from '../../model/manage role model/permission';
import { Constantss } from 'src/utils/constantss';

@Component({
  selector: 'app-manage-permissions',
  templateUrl: './manage-permissions.component.html',
  styleUrls: ['./manage-permissions.component.scss'],
})
export class ManagePermissionsComponent implements OnInit {
  form: FormGroup;
  moduleList = [];
  rolesPermissions = [];
  moduleName = [];
  moduleNameStr: string;
  roleList;
  permissionData = new Permission();
  moduleId: number;
  displayBreadCrumbText: string;
  activeIndex: number = -1;
  activeIndexSub: number = -1;
  moduleGroupText: string;
  submoduleGroupText: string;
  getHide: boolean = false;
  isShow: boolean = false;
  data: any;
  loggedInUserData: any;
  enableEdit: boolean = false;
  theCheckbox: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  isDisabled: boolean[] = [];

  constructor(
    private _userRole: UserRoleService,
    private fb: FormBuilder,
    private _permission: PermissionService,
    private toast: NgToastService,
    private confirmationDialogueService: ConfirmationDialogService,
    private dataSharing: DataSharingService
  ) {
    this.data = this.dataSharing.getNavItems();
    this.loggedInUserData = this.data.source._value;
    this.permissionData = this.loggedInUserData[0].children[2].permission;
    if (this.permissionData.edit === true) {
      this.enableEdit = true;
    }
  }

  ngOnInit(): void {
    this.createForm();
    this.getModules();
  }

  createForm() {
    let arr = [];
    this.form = this.fb.group({
      permissionForm: this.fb.array(arr),
    });
  }

  createFormForPermission() {
    let arr = [];
    let r = this.rolesPermissions;
    r.forEach((r) => {
      for (let i = 0; i < r.rolesPermissions.length; i++) {
        arr.push(this.BuildDyanamicForm(r.rolesPermissions[i]));
      }
    });
    this.form = this.fb.group({
      permissionForm: this.fb.array(arr),
    });
  }

  BuildDyanamicForm(rolesPermission) {
    const r = rolesPermission;
    return this.fb.group({
      roleId: [r.roleId],
      roleName: [r.roleName],
      view: [r.permission.view],
      add: [r.permission.add],
      edit: [r.permission.edit],
      delete: [r.permission.delete],
    });
  }

  get permissionForm(): FormArray {
    return this.form.get('permissionForm') as FormArray;
  }

  getModules() {
    this._userRole.getModuleSubModulePermission().subscribe((res) => {
      if (res && res !== null) {
        this.moduleList = res;
      }
    });
  }

  toggleAccordian(event, i) {
    this.activeIndex = this.activeIndex == i ? -1 : i;
    this.moduleGroupText = event.target.innerText;
    const element = event.target;
    const classActive = element.classList.toggle('active');
    if (!classActive) {
      this.getHide = false;
      this.isShow = false;
    }
  }

  getRolePermissinByMenu() {
    this._permission
      .getRolesPermissionByMenu(this.moduleId)
      .subscribe((res) => {
        if (res && res.data !== null) {
          this.roleList = res.data[0];
        }
      });
  }

  toggleAccordianSubMenu(event, j, moduleId) {
    this.moduleNameStr = event.target.innerText;
    this.moduleId = moduleId;
    this._permission
      .getRolesPermissionByMenu(this.moduleId)
      .subscribe((res) => {
        if (res && res.data !== null) {
          this.rolesPermissions = res.data;
          this.roleList = res.data[0];
          if (this.roleList.rolesPermissions.length != 0) {
            this.isShow = true;
            this.getHide = true;
            this.roleList = this.roleList.rolesPermissions;
          }
        }
        this.prepareBreadCrumb();
        this.createFormForPermission();
      });
  }

  toggleAccordianInsideSubMenu(event, k, moduleId) {
    this.moduleNameStr = event.target.innerText;
    this.moduleId = moduleId;
    this._permission
      .getRolesPermissionByMenu(this.moduleId)
      .subscribe((res) => {        
      if (res && res.data !== null) {
        this.rolesPermissions = res.data;
        this.roleList = res.data[0];
        if (this.roleList.rolesPermissions.length != 0) {
          this.isShow = true;
          this.getHide = true;
          this.roleList = this.roleList.rolesPermissions;
        }
      }
        this.prepareBreadCrumb();
        this.createFormForPermission();
      });
  }

  isCheckedAdd(i: number) {
    const permissionFormControls = this.permissionForm.controls;
    if (
      permissionFormControls[i].value.add === true ||
      permissionFormControls[i].value.delete === true ||
      permissionFormControls[i].value.edit === true
    ) {
      permissionFormControls[i].value.view = true;
      this.theCheckbox[i] = true;
      this.isDisabled[i] = true;
    } else if (
      permissionFormControls[i].value.add === false ||
      permissionFormControls[i].value.delete === false ||
      permissionFormControls[i].value.edit === false
    ) {
      this.theCheckbox[i] = false;
      this.isDisabled[i] = false;
    }
  }

  prepareBreadCrumb() {
    this.displayBreadCrumbText = this.moduleGroupText
      .concat(' - ')
      .concat(this.moduleNameStr);
  }

  onSubmit() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_SAVE)
      .then((confirmed) => {
        if (confirmed) {
          let assignPermission = new AssignPermission();
          assignPermission = this.mapToModel(this.form.value);
          this._permission
            .saveRolesPermissionsByMenu(assignPermission)
            .subscribe(
              (response) => {
                if (response.status === 'Success') {
                  this.toast.success({
                    detail: response.status,
                    summary: response.message,
                    duration: 10000,
                  });
                } else {
                  this.toast.error({
                    detail: response.status,
                    summary: response.message,
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

  mapToModel(data: any): AssignPermission {
    let assignPermission = new AssignPermission();
    assignPermission.menuId = this.moduleId;
    assignPermission.userId = 1;
    assignPermission.rolePermission = data.permissionForm;
    return assignPermission;
  }
}




