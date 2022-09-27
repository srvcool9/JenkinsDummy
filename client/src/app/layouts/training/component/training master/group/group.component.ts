import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnApi, FirstDataRenderedEvent, GridApi, GridOptions } from 'ag-grid-community';
import { CommonUtilService } from 'src/utils/common-util.service';
import { EditIconComponent } from '../../../../core/edit-icon/edit-icon.component';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { SwitchComponent } from '../../../../core/switch/switch.component';
import { Router } from '@angular/router';
import { DataSharingService } from '../../../../shared/services/data-sharing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddGroupComponent } from './add-group/add-group.component';
import { GroupService } from '../../../services/group.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {


  @ViewChild("primaryModal", { static: false })
  public primaryModal: ModalDirective;
  addChild: AddGroupComponent;
  groupFilter: any;
  trainingGroupList = [];
  allGroupFromParent;
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
  constructor(private _commonUtilService: CommonUtilService, private router: Router,
    public modalService: NgbModal, private _groupService: GroupService,
    private dataSharing: DataSharingService) {
    this.getTrainingGroups();
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

    header = this._commonUtilService.getColumnHeader('groupName', 'Training Group');
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('description', 'Description');
    header.width = 180;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('isActive', 'Status');
    header.width = 180;
    header.cellRenderer = 'switchComponent';
    header.cellRendererParams = {
      type: 'Training.GroupMaster',
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Edit');
    header.width = 180;
    header.cellRenderer = 'editIconComponent';
    header.cellRendererParams = {
      inRouterLink: '/training/group',
      onEditIconClick: (params: any) => {
        this.onEditBtnClicked(params.rowData.groupId);
      }
    };

    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Delete');
    header.width = 180;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'Training.GroupMaster',
      onDeleteIconClick: this.onDeletBtnClicked.bind(this),
    };

    this.columnDefs.push(header);
  }

  onEditBtnClicked = (id: number) => {
    this.id = id;
    this.primaryModal.show();
  }

  getTrainingGroups() {
    this._groupService.getTrainingGroups().subscribe((response) => {
      if (response && response.data !== null) {
      this.trainingGroupList = response.data;
      this.allGroupFromParent = response.data;
      this.recordCount = this.trainingGroupList.length;
      }
    });

  }

  onDeletBtnClicked() {
    this.getTrainingGroups();
  }

  addGroup() {
    this.dataSharing.setGlobalEditData(null);
    this.router.navigate(['training/trainingMaster/add_group'])
  }

  groupRoute() {
    this.router.navigate(['/training/group']);
  }
  subGroupRoute() {
    this.router.navigate(['/training/subGroup']);
  }

  trainingRoute() {
    this.router.navigate(['/training/trainingMaster']);
  }


  openModal() {
    const modalRef = this.modalService.open(AddGroupComponent);
    modalRef.result.then((result) => {
    }).catch((error) => {

    });
  }
  addModel() {
    this.id = 0;
    this.primaryModal.show();
    this.dataSharing.setGlobalEditData(null);
  }

  changeIndicator = (callAddRole) => {
    this.id = 0;
    if (callAddRole == "cancel") {
      this.primaryModal.hide();
    } else {
      this.primaryModal.hide();
      this.getTrainingGroups();
    }
  };

  dataLoaded(child: string) {

  }

}


const trainingGrp = [{
  'groupId': 1,
  'groupName': 'Training Group',
  'description': 'Description',
  'isActive': true
}]