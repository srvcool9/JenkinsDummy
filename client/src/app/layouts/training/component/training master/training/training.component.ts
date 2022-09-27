import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ColumnApi,
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
} from 'ag-grid-community';
import { CommonUtilService } from 'src/utils/common-util.service';
import { EditIconComponent } from '../../../../core/edit-icon/edit-icon.component';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { SwitchComponent } from '../../../../core/switch/switch.component';
import { Router } from '@angular/router';
import { DataSharingService } from '../../../../shared/services/data-sharing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupService } from '../../../services/group.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { formatDate } from '@angular/common';
import { LinkComponent } from 'src/app/layouts/core/link/link.component';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
})
export class TrainingComponent implements OnInit {
  @ViewChild('primaryModal', { static: false })
  public primaryModal: ModalDirective;
  groupFilter: any;
  trainingList = [];
  allGroupFromParent;
  recordCount: number;
  columnDefs: any;
  data: any;
  loggedinUserArea: any;
  frameworkComponents;
  id: Number;
  types = [20, 50, 100];
  value: any;
  gridApi: GridApi;
  columnApi: any;
  gridOptions = <GridOptions>{};
  paramsSelectRecord = {
    type: 'gridReady',
    api: GridApi,
    columnApi: ColumnApi,
  };
  paginationPageSize = 20;
  constructor(
    private _commonUtilService: CommonUtilService,
    private router: Router,
    public modalService: NgbModal,
    private _groupService: GroupService,
    private dataSharing: DataSharingService
  ) {
   
    this.getTraining();
    this.frameworkComponents = {
      editIconComponent: EditIconComponent,
      deleteIconComponent: DeleteIconComponent,
      switchComponent: SwitchComponent,
      linkComponent: LinkComponent,
    };
  }

  ngOnInit(): void {
    this.createColumnDefs();
  }

  clearSearch(e) {
    this.groupFilter = '';
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

    header = this._commonUtilService.getColumnHeader(
      'trainingName',
      'Training'
    );
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'groupName',
      'Training Group'
    );
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'subGroupName',
      'Sub-Group'
    );
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader(
      'configured.entityName',
      'Configured'
    );
    header.width = 200;
    header.sortable = true;
    header.filter = true;
    (header.cellRenderer = 'linkComponent'),
      (header.cellRendererParams = {
        inRouterLink: '/training/trainingConfiguration',
        onLinkClick: (params: any) => {
          this.dataSharing.setGlobalEditData(params.rowData);
        },
      });

    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('status', 'Status');
    header.width = 180;
    header.cellRenderer = 'switchComponent';
    header.cellRendererParams = {
      type: 'Training.TrainingMaster',
    };
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Edit');
    header.width = 180;
    header.cellRenderer = 'editIconComponent';
    header.cellRendererParams = {
      inRouterLink: '/training/trainingMaster',
      onEditIconClick: (params: any) => {
        this.onEditBtnClicked(params.rowData.trainingId);
      },
    };

    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Delete');
    header.width = 180;
    header.cellRenderer = 'deleteIconComponent';
    header.cellRendererParams = {
      type: 'Training.TrainingMaster',
      onDeleteIconClick: this.onDeletBtnClicked.bind(this),
    };

    this.columnDefs.push(header);
  }

  onEditBtnClicked(id: number) {
    this.id = id;
    this.primaryModal.show();
  }

  onDeletBtnClicked() {
    this.getTraining();
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

  getTraining() {
    this._groupService.getAllTrainingList().subscribe((response:any)=>{
      if(response && response.data!=null){        
      response.data.forEach((training)=>{
        training.startDate = this.dateFormattergrid(training.startDate);
        training.endDate = this.dateFormattergrid(training.endDate);
        this.trainingList = response.data;
      this.allGroupFromParent = response.data;
      this.recordCount = this.trainingList.length;
      })
      }
    })
  }

  openModal() {}
  addModel() {
    this.id = 0;
    this.primaryModal.show();
    this.dataSharing.setGlobalEditData(null);
  }

  changeIndicator = (callAddRole) => {
    this.id = 0;
    if (callAddRole == 'cancel') {
      this.primaryModal.hide();
    } else {
      this.primaryModal.hide();
      this.getTraining();
    }
  };

  dataLoaded(child: string) {}

  dateFormattergrid(date: Date) {
    const format = 'dd-MM-yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }
}

// const training = [{
//   'trainingId': 1,
//   'trainingName': 'Diam',
//   'subGroup': {
//     'subGroupId': 2,
//     'subGroupName': 'Sub Group Test'
//   },
//   'group': {
//     'groupId': 1,
//     'groupName': 'Aces'
//   },
//   'configured': 'Pending',
//   'isActive': true,
//   'trainingLevel' : {
//     id:40,
//     'name':'State'
//   },
//   'approxTrainee':30,
//   'startDate':'2022-08-02',
//   'endDate':'2022-08-09',
//   'description':"Training Description"

// }]
