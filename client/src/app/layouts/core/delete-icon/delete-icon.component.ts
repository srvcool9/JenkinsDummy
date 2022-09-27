import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { NgToastService } from 'ng-angular-popup';
import { Constantss } from 'src/utils/constantss';
import { UserRoleService } from '../../configurations/service/manage role service/user-role.service';
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';

@Component({
  selector: 'app-delete-icon',
  templateUrl: './delete-icon.component.html',
  styleUrls: ['./delete-icon.component.scss'],
})
export class DeleteIconComponent implements ICellRendererAngularComp {
  params: any;
  constructor(
    private userRoleService: UserRoleService,
    private toast: NgToastService,
    private confirmationDialogueService: ConfirmationDialogService
  ) { }

  delete: boolean = false;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onDeleteIconClick($event, type, userId) {

    if (type === 'deleteUser') {
      this.params.onDeleteIconClick(this.params);
    }

    if (type === 'deleteArea'){
      this.params.onDeleteIconClick(this.params);
    }

    if (type === 'deleteDoc'){
      this.params.onDeleteIconClick(this.params);
    }
    
    if (type === 'deleteLink'){
      this.params.onDeleteIconClick(this.params);
    }

    if(type === 'removeEmployee'){
      this.params.onDeleteIconClick(this.params);
    }

    if(type === 'removeOthers'){
      this.params.onDeleteIconClick(this.params);
    }


    if (type === 'role') {

      this.confirmationDialogueService
        .confirm('Confirmation', 'Do you want to delete this information ?')
        .then((confirmed) => {
          if (confirmed) {
            this.userRoleService
              .deleteUserRole(type, this.params.data.roleId, 0)
              .subscribe((res) => {
                if (res.status === Constantss.SUCCESS) {
                  this.toast.success({
                    detail: Constantss.SUCCESS,
                    summary: res.message,
                    duration: 10000,
                  });
                  this.params.onDeleteIconClick(this.params);
                } else {
                  this.toast.error({
                    detail: Constantss.ERROR,
                    summary: res.message,
                    duration: 10000,
                  });
                }
              });

          }
        })

    }
    if (type === 'userrole') {
      this.confirmationDialogueService
        .confirm('Confirmation', 'Do you want to delete this information ?')
        .then((confirmed) => {
          if (confirmed) {
            this.userRoleService
              .deleteUserRole(type, this.params.data.roleId, userId)
              .subscribe((res) => {
                if (res.status === Constantss.SUCCESS) {
                  this.toast.success({
                    detail: Constantss.SUCCESS,
                    summary: res.message,
                    duration: 10000,
                  });
                  this.params.onDeleteIconClick(this.params);
                } else {
                  this.toast.error({
                    detail: Constantss.ERROR,
                    summary: res.message,
                    duration: 10000,
                  });
                }
              });


          }
        })



    }

    if (type === 'assessment') {
      this.confirmationDialogueService
        .confirm('Confirmation', 'Do you want to delete this information ?')
        .then((confirmed) => {
          if (confirmed) {
            this.userRoleService
              .deleteUserRole(type, this.params.data.assessmentId, 0)
              .subscribe((res) => {
                if (res.status === 'Success') {
                  this.toast.success({
                    detail: 'Success',
                    summary: res.message,
                    duration: 10000,
                  });
                  this.params.onDeleteIconClick(this.params);
                } else {
                  this.toast.error({
                    detail: Constantss.ERROR,
                    summary: res.message,
                    duration: 10000,
                  });
                }
              });
          }
        })

    }

    if (type === 'group') {
      this.confirmationDialogueService
        .confirm('Confirmation', 'Do you want to delete this information ?')
        .then((confirmed) => {
          if (confirmed) {

            this.userRoleService
              .deleteUserRole(type, this.params.data.groupId, 0)
              .subscribe((res) => {
                if (res.status === 'Success') {
                  this.toast.success({
                    detail: 'Success',
                    summary: res.message,
                    duration: 10000,
                  });
                  this.params.onDeleteIconClick(this.params);
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

    if (type === 'Training.GroupMaster') {
      this.confirmationDialogueService
        .confirm('Confirmation', 'Do you want to delete this information ?')
        .then((confirmed) => {
          if (confirmed) {

            this.userRoleService
              .deleteUserRole(type, this.params.data.groupId, 0)
              .subscribe((res) => {
                if (res.status === 'Success') {
                  this.toast.success({
                    detail: 'Success',
                    summary: res.message,
                    duration: 10000,
                  });
                  this.params.onDeleteIconClick(this.params);
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
    if (type === 'Training.SubGroupMaster') {
      this.confirmationDialogueService
        .confirm('Confirmation', 'Do you want to delete this information ?')
        .then((confirmed) => {
          if (confirmed) {

            this.userRoleService
              .deleteUserRole(type, this.params.data.subGroupId, 0)
              .subscribe((res) => {
                if (res.status === 'Success') {
                  this.toast.success({
                    detail: 'Success',
                    summary: res.message,
                    duration: 10000,
                  });
                  this.params.onDeleteIconClick(this.params);
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
    if (type === 'Training.TrainingMaster') {
      this.confirmationDialogueService
        .confirm('Confirmation', 'Do you want to delete this information ?')
        .then((confirmed) => {
          if (confirmed) {

            this.userRoleService
              .deleteUserRole(type, this.params.data.trainingId, 0)
              .subscribe((res) => {
                if (res.status === 'Success') {
                  this.toast.success({
                    detail: 'Success',
                    summary: res.message,
                    duration: 10000,
                  });
                  this.params.onDeleteIconClick(this.params);
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
    if (type === 'removeMonitorPhoto') {
      this.confirmationDialogueService
        .confirm('Confirmation', 'Do you want to delete this image ?')
        .then((confirmed) => {
          if (confirmed) {
            this.params.onDeleteIconClick(this.params);
          }
        });
    }
  }
}
