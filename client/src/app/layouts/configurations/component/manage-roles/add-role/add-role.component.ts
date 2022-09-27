import { KeyValue } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModuleGroup } from '../../../model/manage role model/module-group';
import { UserRoleService } from '../../../service/manage role service/user-role.service';
import { UserRole } from '../../../model/manage role model/user-role';
import { RoleModulePermission } from '../../../model/manage role model/role-module-permission.model';
import { ConfirmationDialogService } from '../../../../shared/services/confirmation-dialog.service';
import { NgToastService } from 'ng-angular-popup';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { Constantss } from 'src/utils/constantss';
// import { browserRefresh } from 'src/app/app.component';
declare const $: any;
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent implements OnInit {

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    window.opener.location.reload();
  }
  addRoleForm: FormGroup;
  isDisabled: boolean[] = [];
  theCheckbox: boolean[] = [false,false,false,false,false,false,false,false,false];
  subModuleList;
  moduleGroupListData: Array<ModuleGroup> = [];
  subModuleListLength: any;
  map = new Map<any, any>();
  mapResponse = new Map<any, any>();
  aftersortmap = new Map<any, any>();
  roleTypes = [];
  existingRoles = [];
  moduleList = [];
  editRole = new UserRole();
  permissionList = [];
  permissionCheck: boolean = false;
  editedRole: any;
  roleNameDisabled:boolean = false;
  verifiExistingRole: boolean = false;
  checked : boolean =true;
  userId:number;
  constructor(
    private _userRole: UserRoleService,
    private router: Router,
    private fb: FormBuilder,
    private confirmationDialogueService: ConfirmationDialogService,
    private toast: NgToastService,
    private dataSharing:DataSharingService,
    private clientStorage:ClientSideStorageService
  ) {
    // if(browserRefresh){
    //   this.router.navigate(["/config/RoleMgmt"]);
    // }
    const userId=this.clientStorage.get('userId');
     this.userId= Number(userId);
    const response = this._userRole.getAddRoleId();
    this.id = response.source;
    if (this.id._value === 1) {
      this.Role = 'Edit Role';
      this.roleNameDisabled = true;
      this.getUserRoleById();
    } else {
      this.Role = 'Add Role';
      this.roleNameDisabled = false;
    }
    this._userRole.getModuleSubModulePermission().subscribe((response) => {      
      if (response && response !== null) {
      this.moduleList = response;
      this.createForm();
      this.initializePermissions();
      }
    });

    this.getExistingRoles();
    this.getModuleSubModulePermission();
    this.getAllRoleTypes();
  }
  selectedType: number;
  Role: any;
  count: number = 0;
  verify: boolean = false;
  id;

  ngOnInit(): void {    
   
  this.createForm();
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

  createForm() {
   // this.getModuleSubModulePermission();
    if (this.verify == true) {
      //edit
      this.addRoleForm = this.fb.group({
        roleId: [this.editRole.roleId],
        roleName: [
          this.editRole.roleName,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern('^[A-Za-z0-9 ]+$'),
          ],
        ],
        roleDescription: [this.editRole.roleDescription,[Validators.maxLength(250)]],
        isActive: [this.editRole.isActive],
        roleType: [this.editRole.roleTypeId, [Validators.required]],
        existingRoles: [],
        permissionForm: this.fb.array([]),
      });
    } else {
      let arr = [];
      this.moduleList.forEach((module) => {
        for (let i = 0; i < module.children.length; i++) {
          if (i === 0) {
            arr.push(this.BuildFormDynamic(module.children[i], module.name));
          } else {
            arr.push(this.BuildFormDynamic(module.children[i], ''));
          }

          if (
            module.children[i].children &&
            module.children[i].children != null
          ) {
            for (let j = 0; j < module.children[i].children.length; j++) {
              arr.push(
                this.BuildFormDynamic(
                  module.children[i].children[j],
                  module.children[i].name
                )
              );
            }
          }
        }
      });
      //}
      this.addRoleForm = this.fb.group({
        roleId: [this.editRole.roleId],
        roleName: [
          this.editRole.roleName,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern('^[A-Za-z0-9 ]+$'),
          ],
        ],
        roleDescription: [
          this.editRole.roleDescription,
          [Validators.maxLength(250)],
        ],
        isActive: [true],
        roleType: [this.editRole.roleTypeId, [Validators.required]],
        existingRoles: [],
        permissionForm: this.fb.array(arr),
       
      });
      
    }
  }

  BuildFormDynamic(module, moduleGroup) {
    const m = module;
    return this.fb.group({
      id: [m.id],
      moduleGroupName: [moduleGroup],
      subModules: [m.name],
      view: [false],
      add: [false],
      edit: [false],
      delete: [false],
    });
  }

  get roleName() {
    return this.addRoleForm.get('roleName');
  }

  get roleDescription() {
    return this.addRoleForm.get('roleDescription');
  }

  get roleType(){
    return this.addRoleForm.get('roleType');
  }

  get permissionForm(): FormArray {
    return this.addRoleForm.get('permissionForm') as FormArray;
  }

  getAllRoleTypes() {
    this.dataSharing.fetchEntityById(8).subscribe((resp)=>{
      if (resp && resp.data !== null) {
      this.roleTypes = resp.data;
      }
    });
  }

  onChange(event) {
    this.permissionForm.clear();
    this.getUserRoleById(event);
  }

  getExistingRoles() {
    this._userRole.getAllRoleData().subscribe((response) => {
      if (response && response.data !== null) {
      this.existingRoles = response.data;
      }
    });
  }

  getUserRoleById(data?) {
    this.editedRole=this.dataSharing.getGlobalEditData();
    let userRole = this.editedRole.source._value;
    this.editRole = userRole;
    if (data && data != undefined) {
      userRole = data;
    }
    if (userRole != null && userRole!=undefined) {
      this.verify = true;
    } else {
      this.verify = false;
    }
    if (userRole && userRole.roleId != undefined && userRole != null) {
      this._userRole.getUserRoleById(userRole.roleId).subscribe((resp) => {
        if (resp && resp.data !== null) {
        this.moduleGroupListData = resp;
        this.initializePermissions();
        }
      });
    }
  }

  getModuleSubModulePermission() {
    this._userRole.getModuleSubModulePermission().subscribe((response) => {
      if (response && response !== null) {
      this.moduleList = response;
      }
    });
  }

  cancel() {
    this.confirmationDialogueService
    .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
    .then((confirmed) => {
      if (confirmed) {
        this.addRoleForm.reset();
        this.router.navigate(['/Config/RoleMgmt']);
      }
    });
  }

  onEditPermissionFormCheck() {
    for (let i = 0; i < this.permissionForm.controls.length; i++) {
      if (
        this.permissionForm.controls[i].value.add === true ||
        this.permissionForm.controls[i].value.delete === true ||
        this.permissionForm.controls[i].value.edit === true ||
        this.permissionForm.controls[i].value.view === true
      ) {
        this.permissionForm.controls[i].value.view = true;
        this.theCheckbox[i] = this.permissionForm.controls[i].value.view;
        this.isDisabled[i] = this.permissionForm.controls[i].value.view;
      }else{
        this.theCheckbox[i] = this.permissionForm.controls[i].value.view;
        this.isDisabled[i] = this.permissionForm.controls[i].value.view;
        this.permissionForm.controls[i].value.view = false;
      }
    }
  }

  initializePermissions() {
    this.moduleGroupListData.forEach((moduleGrp) => {
      let editCount = 0;
      let editModuleName;
      editModuleName = moduleGrp.name;
      moduleGrp.children.forEach((modules) => {
        this.onEditPermissionFormCheck();

        if (editCount === 0) {
          editCount++;
          this.permissionForm.push(
            this.fb.group({
              id: [modules.id],
              moduleGroupName: [moduleGrp.name],
              subModules: [modules.name],
              view: [modules.permission.view],
              add: [modules.permission.add],
              edit: [modules.permission.edit],
              delete: [modules.permission.delete],
            })
          );
          this.onEditPermissionFormCheck();
          if (modules.children) {
            if (modules.itemName === 'Training' || modules.itemName === 'Large Scale Assessment') {
              modules.children.forEach((children) => {              
                this.permissionForm.push(
                  this.fb.group({
                    id: [children.id],
                    moduleGroupName: [''],
                    subModules: [children.name],
                    view: [children.permission.view],
                    add: [children.permission.add],
                    edit: [children.permission.edit],
                    delete: [children.permission.delete],
                  })
                );
                this.onEditPermissionFormCheck();
              });
            } else {
            modules.children.forEach((children) => {              
              this.permissionForm.push(
                this.fb.group({
                  id: [children.id],
                  moduleGroupName: [modules.name],
                  subModules: [children.name],
                  view: [children.permission.view],
                  add: [children.permission.add],
                  edit: [children.permission.edit],
                  delete: [children.permission.delete],
                })
              );
              this.onEditPermissionFormCheck();
            });
           }
          }
        } else {
          this.permissionForm.push(
            this.fb.group({
              id: [modules.id],
              moduleGroupName: [''],
              subModules: [modules.name],
              view: [modules.permission.view],
              add: [modules.permission.add],
              edit: [modules.permission.edit],
              delete: [modules.permission.delete],
            })
          );
          this.onEditPermissionFormCheck();
          if (modules.children) {
            modules.children.forEach((children) => {
              this.permissionForm.push(
                this.fb.group({
                  id: [children.id],
                  moduleGroupName: [modules.name],
                  subModules: [children.name],
                  view: [children.permission.view],
                  add: [children.permission.add],
                  edit: [children.permission.edit],
                  delete: [children.permission.delete],
                })
              );
              this.onEditPermissionFormCheck();
            });
          }
        }
      });
    });
  }

  save() {
    this.confirmationDialogueService
      .confirm('Confirmation', 'Do you want to save this information ?')
      .then((confirmed) => {
        let list = this.addRoleForm.value;
        if (this.addRoleForm.value.isActive == null) {
          this.addRoleForm.value.isActive = false;
        }
        let userRole = new UserRole();
        userRole.roleId = this.addRoleForm.value.roleId;
        userRole.roleName = this.addRoleForm.value.roleName;
        userRole.roleDescription = this.addRoleForm.value.roleDescription;
        userRole.isActive = this.addRoleForm.value.isActive;
        userRole.roleTypeId = this.addRoleForm.value.roleType;
        userRole.updatedOn=new Date();
        userRole.loginUserId = String(this.userId);
        userRole.updatedBy=String(this.userId);
        list.permissionForm.forEach((p) => {
          this.moduleList.forEach((mod) => {
            mod.children
              .filter((m) => m.name === p.subModules)
              .map((re) => {
                if (p.view === null) {
                  re.permission.view = false;
                } else {
                  re.permission.view = p.view;
                }
                if (p.add === null) {
                  re.permission.add = false;
                } else {
                  re.permission.add = p.add;
                }
                if (p.edit === null) {
                  re.permission.edit = false;
                } else {
                  re.permission.edit = p.edit;
                }
                if (p.delete === null) {
                  re.permission.delete = false;
                } else {
                  re.permission.delete = p.delete;
                }
              });
          });
        });
               list.permissionForm.forEach((p) => {
          this.moduleList.forEach((mod) => {
             mod.children.forEach((child)=>{
              child.children
                .filter((m) => m.name === p.subModules)
                .map((re) => {
                  if (p.view === null) {
                    re.permission.view = false;
                  } else {
                    re.permission.view = p.view;
                  }
                  if (p.add === null) {
                    re.permission.add = false;
                  } else {
                    re.permission.add = p.add;
                  }
                  if (p.edit === null) {
                    re.permission.edit = false;
                  } else {
                    re.permission.edit = p.edit;
                  }
                  if (p.delete === null) {
                    re.permission.delete = false;
                  } else {
                    re.permission.delete = p.delete;
                  }
                });
             })
            
          });
        });
        let roleModulePermission = new RoleModulePermission();
        roleModulePermission.userRole = userRole;
        roleModulePermission.navigableMenu = this.moduleList;
        if (confirmed) {
          this._userRole.getRoleExists(userRole.roleName).subscribe((resp)=>{
            if(resp.data.isExists===true && this.verify===true &&this.id._value === 1){
          this._userRole.postUserRoleData(roleModulePermission).subscribe((response) => {
              if (response) {
                this.toast.success({
                  detail: Constantss.SUCCESS,
                  summary: 'Record has been updated successfully !',
                  duration: 10000,
                });
                this.router.navigate(['/Config/RoleMgmt']);
              }
            },
            (error) => {
              this.router.navigate(['/Config/RoleMgmt']);
              this.toast.error({
                detail: 'Error',
                summary: error.error,
                duration: 10000,
              });
            }
          );
            }else if( resp.data.isExists==true &&this.id._value === 0 ){
              this.toast.error({
                detail: 'Error',
                summary: 'Role name already exists!',
                duration: 10000,
              });
            }
            
            else{
              this._userRole.postUserRoleData(roleModulePermission).subscribe(
                (response) => {
                  if (response.status===Constantss.SUCCESS) {
                    this.toast.success({
                      detail: Constantss.SUCCESS,
                      summary: 'Record has been added successfully !!',
                      duration: 10000,
                    });
                    this.router.navigate(['/Config/RoleMgmt']);
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
          })
        }
       });
  }
}

