import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserRoleService } from '../../../service/manage role service/user-role.service';
import { ManageUserService } from '../../../service/manage user service/manage-user.service';
import { AddUser } from '../../../model/manage role model/add-user.model';
import { RoleArea } from '../../../model/manage role model/role-area.model';
import { GridApi, GridOptions, FirstDataRenderedEvent } from 'ag-grid-community';
import { CommonUtilService } from 'src/utils/common-util.service';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { UserArea } from '../../../model/manage role model/user-area.model';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Area } from '../../../model/manage role model/area.model';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { Constantss } from 'src/utils/constantss';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @ViewChild('ngSelectComponent') ngSelectComponent: NgSelectComponent;
  addUserForm: FormGroup;
  gridOptions = <GridOptions>{};
  columnDefs;
  frameworkComponents;
  divisions = 'District';
  userData: any;
  employeeData: any;
  nullValue;
  addRoleFix: boolean = false;
  roles = [];
  filteredRoles = [];
  mp = 'Madhya Pradesh';
  gripApi: any;
  loggedInUserData: any;
  loggedInUserRoleTypeId: number;
  areaList: Array<Area> = [];
  listDivision: string;

  private gridApi!: GridApi;

  disable: boolean = false;
  divisionEnable: boolean = true;
  roleType = null;

  divisionData: UserArea[] = [];
  districtData: UserArea[] = [];
  blockData: UserArea[] = [];
  clusterData: UserArea[] = [];
  schoolData: UserArea[] = [];

  divisionStaticList: string;
  districtStaticList: string;
  blockStaticList: string;
  cluserStaticList: string;

  divisionStaticSet = new Set<string>();
  districtStaticSet = new Set<string>();
  blockStaticSet = new Set<string>();
  cluserStaticSet = new Set<string>();

  districtCheck: boolean = false;
  blockCheck: boolean = false;
  clusterCheck: boolean = false;

  disableDivision: boolean = false;
  disableDistrict: boolean = false;
  disableBlock: boolean = false;
  disableCluster: boolean = false;
  disableSchool: boolean = false;

  roleStatus: boolean = false;
  editStatus: boolean = false;
  roleArea: RoleArea = new RoleArea();
  usersData: AddUser[] = [];
  divisionCheck: boolean = false;
  editRoleData;
  roleData;
  editSelectVisible = false;
  editRoleID;
  filteredRoleRes;

  constructor(
    private fb: FormBuilder,
    private _userRole: UserRoleService,
    private userService: ManageUserService,
    private _commonUtilService: CommonUtilService,
    private dataSharing: DataSharingService,
    private toast: NgToastService,
    private router: Router,
    private confirmationDialogueService: ConfirmationDialogService
  ) {
    this.getDivision();
    this.editRoleData = this.dataSharing.getGlobalEditData();
    this.roleData = this.editRoleData.source
      ? this.editRoleData.source._value
      : null;
    this._userRole.getAddRoleId().subscribe((res) => {
      this.editStatus = res == 1 ? true : false;
    });
    this.frameworkComponents = {
      deleteIconComponent: DeleteIconComponent,
    };
    this.dataSharing.getMenuList().subscribe((res) => {
      if (res && res !== null) {
        this.loggedInUserData = res;
      }
    });
  }
  clearValue() {
    // This line will clear the value of ngSelect control.
    this.ngSelectComponent.handleClearClick();
  }

  ngOnInit(): void {
    this.getLoggedInUserRoles();
    this.getSelectedUserData();
    this.createColumnDefs();
    this.createForm();
  }

  getLoggedInUserRoles() {
    this.listDivision = '';
    this.loggedInUserRoleTypeId = this.loggedInUserData.employeeRole.roleTypeId;
    this.loggedInUserData.roleArea.forEach((roleArea) => {
      if (this.loggedInUserRoleTypeId === 40) {
        this.disableBelowState();
      } else if (this.loggedInUserRoleTypeId === 41) {
        //division
        this.disableBelowDivision();
        let division = new UserArea();
        division.name = roleArea.divisionName;
        division.id = roleArea.divisionId;
        this.divisionData.push(division);
      } else if (this.loggedInUserRoleTypeId === 42) {
        //distict
        this.divisionStaticSet.add(roleArea.divisionName);
        this.divisionStaticList = Array.from(this.divisionStaticSet).join(',');
        this.disableBelowDistrict();
        let district = new UserArea();
        district.name = roleArea.districtName;
        district.id = roleArea.districtId;
        this.districtData.push(district);
      } else if (this.loggedInUserRoleTypeId === 43) {
        //block
        this.divisionStaticSet.add(roleArea.divisionName);
        this.divisionStaticList = Array.from(this.divisionStaticSet).join(',');
        this.districtStaticSet.add(roleArea.districtName);
        this.districtStaticList = Array.from(this.districtStaticSet).join(',');
        this.disableBelowBlock();
        let block = new UserArea();
        block.name = roleArea.blockName;
        block.id = roleArea.blockId;
        this.blockData.push(block);
      } else if (this.loggedInUserRoleTypeId === 44) {
        //cluster
        this.divisionStaticSet.add(roleArea.divisionName);
        this.divisionStaticList = Array.from(this.divisionStaticSet).join(',');
        this.districtStaticSet.add(roleArea.districtName);
        this.districtStaticList = Array.from(this.districtStaticSet).join(',');
        this.blockStaticSet.add(roleArea.blockName);
        this.blockStaticList = Array.from(this.blockStaticSet).join(',');
        this.disableBelowCluster();
        let cluster = new UserArea();
        cluster.name = roleArea.clusterName;
        cluster.id = roleArea.clusterId;
        this.clusterData.push(cluster);
      } else if (this.loggedInUserRoleTypeId === 45) {
        //school
        this.disableBelowSchool();
        this.divisionStaticSet.add(roleArea.divisionName);
        this.divisionStaticList = Array.from(this.divisionStaticSet).join(',');
        this.districtStaticSet.add(roleArea.districtName);
        this.districtStaticList = Array.from(this.districtStaticSet).join(',');
        this.blockStaticSet.add(roleArea.blockName);
        this.blockStaticList = Array.from(this.blockStaticSet).join(',');
        this.cluserStaticSet.add(roleArea.clusterName);
        this.cluserStaticList = Array.from(this.cluserStaticSet).join(',');
        let school = new UserArea();
        school.name = roleArea.schoolName;
        school.id = roleArea.schoolId;
        this.schoolData.push(school);
      }
    });
  }
  getSelectedUserData() {
    this.userData = this.userService.getUserData();
    this.employeeData = this.userData.source._value;
    this.getRoles();
  }

  selectedRole(event, string?) {
    this.roleArea.roleId = event.roleId;
    this.roleArea.roleTypeName = event.roleTypeName;
    this.roleArea.status = event.isActive;
    this.roleArea.roleTypeId = +event.roleTypeId;
    for (let i = this.loggedInUserRoleTypeId; i <= 45; i++) {
      this.getDivision();
      if (i > this.loggedInUserRoleTypeId) {
        if (i == 41) {
          this.divisionData = [];
          this.disableDivision = true;
        }
        if (i == 42) {
          this.districtData = [];
          this.disableDistrict = true;
        }
        if (i == 43) {
          this.blockData = [];
          this.disableBlock = true;
        }
        if (i == 44) {
          this.clusterData = [];
          this.disableCluster = true;
        }
        if (i == 45) {
          this.schoolData = [];
          this.disableSchool = true;
        }
      }
    }

    if (this.loggedInUserRoleTypeId < event.roleTypeId) {
      for (let i = 40; i <= event.roleTypeId; i++) {
        if (i > this.loggedInUserRoleTypeId) {
          if (i == 41) {
            this.divisionData = [];
            this.disableDivision = false;
          }
          if (i == 42) {
            this.districtData = [];
            this.disableDistrict = false;
          }
          if (i == 43) {
            this.blockData = [];
            this.disableBlock = false;
          }
          if (i == 44) {
            this.clusterData = [];
            this.disableCluster = false;
          }
          if (i == 45) {
            this.schoolData = [];
            this.disableSchool = false;
          }
        }
      }
    }
    if (string === null || string === undefined) {
      this.resetArea();
    }
  }

  resetArea() {
    this.addUserForm.controls['division'].reset();
    this.addUserForm.controls['district'].reset();
    this.addUserForm.controls['block'].reset();
    this.addUserForm.controls['cluster'].reset();
    this.addUserForm.controls['school'].reset();
  }

  getRoles() {
    this._userRole.getAllRoleData().subscribe((response) => {
      if (response && response.data !== null) {
        this.roles = response.data;
        this.filteredRoles = this.roles.filter(
          (role) =>
            role.roleTypeId >= this.loggedInUserData.employeeRole.roleTypeId
        );
        this.filteredRoleRes = this.filteredRoles;
        if (this.employeeData && this.employeeData.roles) {
          this.employeeData.roles.forEach((i) => {
            this.filteredRoleRes = this.filteredRoleRes.filter(
              (o) => o.roleId !== i.roleId
            );
          });
        }
      }
    });
  }

  cancel() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
      .then((confirmed) => {
        if (confirmed) {
          this.router.navigate(['/Config/UserMgmt']);
        }
      });
  }

  getDivision() {
    this.userService.getDivisionData().subscribe((res) => {
      if (res && res.data !== null) {
      this.divisionData = res.data;
      }
    });
  }

  createForm() {
    if (this.roleData != null) {
      this.editSelectVisible = true;
      this.selectedRole(this.roleData, 'edit Data');
      this.areaList = this.roleData.area;
      this.areaList.map((area) => {
        area.roleTypeName = this.roleArea.roleTypeName;
      });
      this.editUserForm(this.roleData);
    } else {
      this.editSelectVisible = false;
      this.addUserForm = this.fb.group({
        empCode: [this.employeeData.employeeCode],
        name: [this.employeeData.employeeName],
        type: [],
        isActive: [],
        role: [],
        states: [],
        division: [],
        district: [],
        block: [],
        cluster: [],
        school: [],
      });
    }
  }

  editUserForm(roleData) {
    this.addUserForm = this.fb.group({
      empCode: [this.employeeData.employeeCode],
      name: [this.employeeData.employeeName],
      type: [roleData.roleTypeName],
      isActive: [roleData.status],
      role: [roleData.roleName],
      states: [],
      division: [],
      district: [],
      block: [],
      cluster: [],
      school: [],
    });
    this.roleArea.roleTypeName = roleData.roleTypeName;
    this.editRoleID = roleData.roleId;
  }

  divisionOnChange(e) {
    this.getDistrict(e.id);
  }

  districtOnChange(e) {
    this.getBlock(e.id);
  }

  blockOnChange(e) {
    this.getCluster(e.id);
  }

  clusterOnChange(e) {
    this.getSchool(e.id);
  }

  getBlock(id) {
    if (id && id != undefined && id != null) {
      this.userService.getBlockData(id).subscribe((res) => {
        if (res && res.data !== null) {
        this.blockData = res.data;
        }
      });
    }
  }

  getDistrict(id) {
    if (id && id != undefined && id != null) {
      this.userService.getDistrictData(id).subscribe((res) => {
        if (res && res.data !== null) {
        this.districtData = res.data;
        }
      });
    }
  }
  getCluster(id) {
    if (id && id != undefined && id != null) {
      this.userService.getClusterData(id).subscribe((res) => {
        if (res && res.data !== null) {
        this.clusterData = res.data;
        }
      });
    }
  }

  getSchool(id) {
    if (id && id != undefined && id != null) {
      this.userService.getSchoolData(id).subscribe((res) => {
        if (res && res.data !== null) {
        this.schoolData = res.data;
        }
      });
    }
  }

  add() {
    this.addRoleFix = true;
    if (this.roleArea.roleTypeName === 'Division') {
      let area = new Area();
      const division = this.divisionData.filter(
        (division) => division.id === this.addUserForm.value.division
      );
      area.areaId = division[0].id;
      area.areaName = division[0].name;
      const filter = this.areaList.filter((a) => a.areaName === area.areaName);
      if (filter != null && filter.length === 0) {
        this.areaList.push(area);
      } else {
        this.toast.error({
          detail: Constantss.ERROR,
          summary: 'Area already added!',
          duration: 10000,
        });
      }
    }
    if (this.roleArea.roleTypeName === 'District') {
      let area = new Area();
      const district = this.districtData.filter(
        (dist) => dist.id === this.addUserForm.value.district
      );
      area.areaId = district[0].id;
      area.areaName = district[0].name;
      const filter = this.areaList.filter((a) => a.areaName === area.areaName);
      if (filter != null && filter.length === 0) {
        this.areaList.push(area);
      } else {
        this.toast.error({
          detail: Constantss.ERROR,
          summary: 'Area already added!',
          duration: 10000,
        });
      }
    }
    if (this.roleArea.roleTypeName === 'Block') {
      let area = new Area();
      const block = this.blockData.filter(
        (block) => block.id === this.addUserForm.value.block
      );
      area.areaId = block[0].id;
      area.areaName = block[0].name;
      const filter = this.areaList.filter((a) => a.areaName === area.areaName);
      if (filter != null && filter.length === 0) {
        this.areaList.push(area);
      } else {
        this.toast.error({
          detail: Constantss.ERROR,
          summary: 'Area already added!',
          duration: 10000,
        });
      }
    }
    if (this.roleArea.roleTypeName === 'Cluster') {
      let area = new Area();
      const cluster = this.clusterData.filter(
        (cluster) => cluster.id === this.addUserForm.value.cluster
      );
      area.areaId = cluster[0].id;
      area.areaName = cluster[0].name;
      const filter = this.areaList.filter((a) => a.areaName === area.areaName);
      if (filter != null && filter.length === 0) {
        this.areaList.push(area);
      } else {
        this.toast.error({
          detail: Constantss.ERROR,
          summary: 'Area already added!',
          duration: 10000,
        });
      }
    }
    if (this.roleArea.roleTypeName === 'School') {
      let area = new Area();
      const school = this.schoolData.filter(
        (school) => school.id === this.addUserForm.value.school
      );
      area.areaId = school[0].id;
      area.areaName = school[0].name;
      const filter = this.areaList.filter((a) => a.areaName === area.areaName);
      if (filter != null && filter.length === 0) {
        this.areaList.push(area);
      } else {
        this.toast.error({
          detail: Constantss.ERROR,
          summary: 'Area already added!',
          duration: 10000,
        });
      }
    }
    this.areaList.map((area) => {
      area.roleTypeName = this.roleArea.roleTypeName;
    });
    this.gridApi.setRowData(this.areaList);
    this.resetArea();
  }

  onGridReady(event?) {
    this.gridApi = event.api;
  }

  quickSearch(value) {}

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('roleTypeName', 'Type');
    header.width = 240;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('areaName', 'Area');
    header.width = 200;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Delete');
    header.width = 200;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'deleteUser',
      onDeleteIconClick: this.onDeletBtnClicked.bind(this),
    };
    this.columnDefs.push(header);
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  onDeletBtnClicked(params) {
    this.areaList.forEach((element, index) => {
      if (element.areaId === params.data.areaId) {
        this.areaList.splice(index, 1);
      }
    });
    this.gridApi.setRowData(this.areaList);
  }

  disableBelowState() {
    this.divisionCheck = false;
    this.districtCheck = false;
    this.blockCheck = false;
    this.clusterCheck = false;
    this.disableDivision = true;
    this.disableDistrict = true;
    this.disableBlock = true;
    this.disableCluster = true;
    this.disableSchool = true;
  }

  disableBelowDivision() {
    // this.divisionCheck = true;
    //this.districtCheck = true;
    //this.blockCheck = true;
    //this.clusterCheck = true;
    this.disableDistrict = true;
    this.disableBlock = true;
    this.disableCluster = true;
    this.disableSchool = true;
  }

  disableBelowDistrict() {
    this.divisionCheck = true;
    // this.districtCheck=true;
    // this.blockCheck=true;
    // this.clusterCheck=true;
    this.disableBlock = true;
    this.disableCluster = true;
    this.disableSchool = true;
  }

  disableBelowBlock() {
    this.divisionCheck = true;
    this.districtCheck = true;
    // this.blockCheck = true;
    // this.clusterCheck = true;
    this.disableCluster = true;
    this.disableSchool = true;
  }

  disableBelowCluster() {
    this.divisionCheck = true;
    this.districtCheck = true;
    this.blockCheck = true;
    //this.clusterCheck = true;
    this.disableSchool = true;
  }
  disableBelowSchool() {
    this.divisionCheck = true;
    this.districtCheck = true;
    this.blockCheck = true;
    this.clusterCheck = true;
  }

  submit() {
    this.confirmationDialogueService
      .confirm('Confirmation', 'Do you want to save this information ?')
      .then((confirmed) => {
        if (confirmed) {
          let addUser = new AddUser();
          addUser.userId = this.employeeData.userId;
          addUser.roleId = this.roleArea.roleId;
          addUser.roleTypeId = this.roleArea.roleTypeId;
          addUser.loginUserId = this.employeeData.userId;
          addUser.area = this.areaList;
          this.userService.addRoleAssociation(addUser).subscribe((res) => {
            if (res.status === Constantss.SUCCESS) {
              this.toast.success({
                detail: Constantss.SUCCESS,
                summary: 'Record has been updated successfully !!',
                duration: 10000,
              });
              this.router.navigate(['/Config/UserMgmt']);
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
}
