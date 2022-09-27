import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnApi, FirstDataRenderedEvent, GridApi, GridOptions } from 'ag-grid-community';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GroupService } from '../../../services/group.service';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { EditIconComponent } from 'src/app/layouts/core/edit-icon/edit-icon.component';
import { SwitchComponent } from 'src/app/layouts/core/switch/switch.component';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { CommonUtilService } from 'src/utils/common-util.service';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-sub-group',
  templateUrl: './sub-group.component.html',
  styleUrls: ['./sub-group.component.scss']
})
export class SubGroupComponent implements OnInit {
  @ViewChild("primaryModal", { static: false })
  public primaryModal: ModalDirective;
  allSubGroupFromParent;
  groupFilter: any;
  trainingSubGroupList = [];
  recordCount: number;
  columnDefs: any;
  frameworkComponents;
  id: Number;
  types = [20, 50, 100];
  value: any;
  gridApi: GridApi;
  columnApi: any;
  gridOptions = <GridOptions>{}
  paramsSelectRecord = {
    type: 'gridReady',
    api: GridApi,
    columnApi: ColumnApi,
  };
  paginationPageSize = 20;
  constructor(private _commonUtilService: CommonUtilService,
    private _groupService: GroupService,
    private dataSharing: DataSharingService,

    private router: Router) {
    this.getTrainingSubGroups();
    this.frameworkComponents = {
      editIconComponent: EditIconComponent,
      deleteIconComponent: DeleteIconComponent,
      switchComponent: SwitchComponent
    }
  }

  ngOnInit(): void {
    this.createColumnDefs();
  }
  clearSearch(e) {
    this.groupFilter = "";
    this.gridApi.setQuickFilter(this.groupFilter);
  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.groupFilter);
  }

  callType(value) {
    this.onGridReady(this.paramsSelectRecord, value);
  }
  onGridReady(params: any, value: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    if (value != null && value != undefined) {
      this.paginationPageSize = value;
      this.ngOnInit();
    } else {
      this.paginationPageSize = 20;
    }
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('group.groupName', 'Training Group');
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);



    header = this._commonUtilService.getColumnHeader('subGroupName', 'Sub-Group');
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('isActive', 'Status');
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    header.cellRenderer = 'switchComponent';
    header.cellRendererParams = {
      type: 'Training.SubGroupMaster',
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Edit');
    header.width = 180;
    header.cellRenderer = 'editIconComponent';
    header.cellRendererParams = {
      inRouterLink: '/training/subGroup',
      onEditIconClick: (params: any) => {
        this.onEditBtnClicked(params.rowData.subGroupId);
      }

    };

    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Delete');
    header.width = 180;
    
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'Training.SubGroupMaster',
      onDeleteIconClick: this.onDeletBtnClicked.bind(this),
    };

    this.columnDefs.push(header);
  }


  onDeletBtnClicked() { 
    this.getTrainingSubGroups();
  }

  groupRoute() {
    this.router.navigate(['/training/group'])
  }

  subGroupRoute() {
    this.router.navigate(['/training/subGroup']);
  }

  trainingRoute(){
    this.router.navigate(['/training/trainingMaster']);
  }

  getTrainingSubGroups() {
    this._groupService.getTrainingSubGroups().subscribe((response) => {
      if (response && response.data !== null) {
      this.trainingSubGroupList = response.data;
      this.allSubGroupFromParent = response.data;
      this.recordCount = this.trainingSubGroupList.length;
      }
    });

  }


  onEditBtnClicked = (id: number) => {
    this.id = id;
    this.primaryModal.show();
  }

  addModel() {
    this.id = 0;
    this.primaryModal.show();
    this.dataSharing.setGlobalEditData(null);
  }

  dataLoaded(child: string) {

  }

  changeIndicator = (callAddRole) => {
    this.id = 0;
    if (callAddRole == "cancel") {
      this.primaryModal.hide();
    } else {
      this.primaryModal.hide();
      this.getTrainingSubGroups();
    }
  };

}


const trainingSubGrp = [{
  'subGroupId': 1,
  'trainingGrp': {
    'groupId': 1,
    'groupName': 'Training Group'
  },
  'description': 'Sub Group Description',
  'subGroup': 'Training Sub Group',
  'isActive': true
}]