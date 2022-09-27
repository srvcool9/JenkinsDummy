import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NgToastService } from 'ng-angular-popup';
import { Constantss } from 'src/utils/constantss';
import { UserRoleService } from '../../configurations/service/manage role service/user-role.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent implements ICellRendererAngularComp {
  public params: any;
  constructor(
    private userRoleService: UserRoleService,
    private toast: NgToastService
  ) { }
  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }
  status: any;

  onSwitchClick(event, type, userId) {
    this.status = event.target.checked;
    if (type === 'role') {
      this.userRoleService
        .changeRoleStatus(type, this.status, this.params.data.roleId, 0)
        .subscribe((res) => {
          if (res.status === 'Success') {
            this.toast.success({
              detail: 'Success',
              summary: 'Status has been updated successfully',
              duration: 5000,
            });
          } else {
            this.toast.error({
              detail: Constantss.ERROR,
              summary: res.message,
              duration: 5000,
            });
          }
        });
    }
    if (type === 'userrole') {
      this.userRoleService
        .changeRoleStatus(type, this.status, this.params.data.roleId, userId)
        .subscribe((res) => {
          if (res.status === 'Success') {
            this.toast.success({
              detail: 'Success',
              summary: 'Status has been updated successfully',
              duration: 5000,
            });
          } else {
            this.toast.error({
              detail: Constantss.ERROR,
              summary: res.message,
              duration: 5000,
            });
          }
        });
    }

    if (type === 'assessment') {
      this.userRoleService
        .changeRoleStatus(type, this.status, this.params.data.assessmentId, 0)
        .subscribe((res) => {
          if (res.status === 'Success') {
            this.toast.success({
              detail: 'Success',
              summary: 'Status has been updated successfully',
              duration: 5000,
            });
          } else {
            this.toast.error({
              detail: Constantss.ERROR,
              summary: res.message,
              duration: 5000,
            });
          }
        });
    }
    if (type === 'group') {
      this.userRoleService
        .changeRoleStatus(type, this.status, this.params.data.groupId, 0)
        .subscribe((res) => {
          if (res.status === 'Success') {
            this.toast.success({
              detail: 'Success',
              summary: 'Status has been updated successfully',
              duration: 5000,
            });
          } else {
            this.toast.error({
              detail: Constantss.ERROR,
              summary: res.message,
              duration: 5000,
            });
          }
        });
    }
    if (type === 'Training.GroupMaster') {
      this.userRoleService.changeRoleStatus(type, this.status, this.params.data.groupId, 0)
        .subscribe((res) => {
          if (res.status === 'Success') {
            this.toast.success({
              detail: 'Success',
              summary: 'Status has been updated successfully',
              duration: 5000,
            });
          } else {
            this.toast.error({
              detail: Constantss.ERROR,
              summary: res.message,
              duration: 5000,
            });
          }
        });
    }
    if (type === 'Training.SubGroupMaster') {
      this.userRoleService.changeRoleStatus(type, this.status, this.params.data.subGroupId, 0)
        .subscribe((res) => {
          if (res.status === 'Success') {
            this.toast.success({
              detail: 'Success',
              summary: 'Status has been updated successfully',
              duration: 5000,
            });
          } else {
            this.toast.error({
              detail: Constantss.ERROR,
              summary: res.message,
              duration: 5000,
            });
          }
        });
    }
    if (type === 'Training.TrainingMaster') {
      this.userRoleService.changeRoleStatus(type, this.status, this.params.data.trainingId, 0)
        .subscribe((res) => {
          if (res.status === 'Success') {
            this.toast.success({
              detail: 'Success',
              summary: 'Status has been updated successfully',
              duration: 5000,
            });
          } else {
            this.toast.error({
              detail: Constantss.ERROR,
              summary: res.message,
              duration: 5000,
            });
          }
        });
    }
  }
}
