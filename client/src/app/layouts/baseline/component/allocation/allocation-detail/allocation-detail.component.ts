import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DeleteIconComponent } from 'src/app/layouts/core/delete-icon/delete-icon.component';
import { RemoveIconComponent } from 'src/app/layouts/core/remove-icon/remove-icon.component';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { CommonUtilService } from 'src/utils/common-util.service';
import { Allocation } from '../../../model/allocation.model';
import { RegistrationService } from '../../../service/registration.service';
import {AssementService} from '../../../service/assement.service'
import { Assessment } from '../../../model/assessment model/assessment';
import { formatDate } from '@angular/common';
import { District } from 'src/app/layouts/configurations/model/manage role model/district.model';
import { UserArea } from 'src/app/layouts/configurations/model/manage role model/user-area.model';
import { ManageUserService } from 'src/app/layouts/configurations/service/manage user service/manage-user.service';
import { Enumerator } from '../../../model/enumerator.model';
import { Group } from '../../../model/assessment model/group';
import { Block } from '../../../model/block.model';
import { School } from 'src/app/layouts/configurations/model/manage role model/school.model';
import {AllocationService} from '../../../service/allocation.service';
import { NgToastService } from 'ng-angular-popup';
import { Router, RouterOutlet } from '@angular/router';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { User } from 'src/app/views/pages/login/model/user.model';
import {Constantss} from '../../../../../../utils/constantss';

@Component({
  selector: 'app-allocation-detail',
  templateUrl: './allocation-detail.component.html',
  styleUrls: ['./allocation-detail.component.scss'],
})
export class AllocationDetailComponent implements OnInit {
  allocationdDetailForm: FormGroup;
  editData : any;
  dropdownSettings: IDropdownSettings = {};
  readonly = true;
  group = [];
  value : any;
  detaiList= [];
  institutionName=[];
  blocks = [];
  asmtNames = [];
  dob:any;
  class = [];
  district = [];
  districtList= [];
  block = [];
  columnApi;
  institutionDistrict = [];
  cluster = [];
  school = [];
  activeIndex: number = -1;
  getHide: boolean;
  isButtonVisible = false;
  List;
  gridOptions = <GridOptions>{};
  paginationPageSize = 20;
  columnDefs;
  frameworkComponents;
  recordCount;
  gridApi: any;
  assessment= new Assessment();
  startDate: any;
  endDate:any;
  classList=[];
  loggedInUserData;
  userDistrictList:District[];
  db=new Date();
  loggedInUserRoleTypeId:any;

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

  divisionCheck: boolean = false;
  listDivision: string;
  allocated : boolean = false;
  unallocated : boolean = false;
  editDataRes:any;
  userIds : any
  
  constructor(
    private _commonUtilService : CommonUtilService,
    private fb: FormBuilder,
    private dataSharing: DataSharingService,
    private registrationService: RegistrationService,
    private assessmentService:AssementService,
    private manageUserService:ManageUserService,
    private allocationService:AllocationService,
    private toast: NgToastService,
    private router:Router,
    private clientStorage:ClientSideStorageService,
    private confirmationDialogueService:ConfirmationDialogService
  ) {
    const userId=this.clientStorage.get('userId');
    this.userIds= Number(userId);
    this.createForm();
    this.dataSharing.getMenuList().subscribe(data=>{
        if(data!=null){
          this.loggedInUserData=data;
          this.getLoggedInUserRoles();
        }
    })

    this.editDataRes = this.dataSharing.getGlobalEditData();
    this.editDataRes = this.editDataRes.source._value;
    this.editData = this.editDataRes;
    // this.dataSharing.getGlobalEditData().subscribe((response) => {
      // this.editData = response;
      if(this.editData.allocationId && this.editData.allocationId!==null ){
        this.dob = this.dateFormatter(this.editData.enumerator.dateOfBirth);
        this.startDate = this.dateFormatters(this.editData.assessment.startDate);
        this.endDate = this.dateFormatters(this.editData.assessment.endDate);
        this.allocated = true;
        this.unallocated = false;
        if(this.editData.district.districtId && this.editData.district.districtId!=null){
             this.editData.district.id=Number(this.editData.district.districtId);
             this.editData.block.id=Number(this.editData.block.blockId);
             this.editData.school.id=Number(this.editData.school.udisecode)
             this.getDistrict(); 
             this.getBlockByDistrict(this.editData.district); 
        }
        this.createFormEdit();
      }else{
        this.unallocated = true;
        this.allocated = false;
        this.dob = this.dateFormatter(this.editData.dateOfBirth);
        this.createForm();
      }
    
    // });

 
    this.frameworkComponents = {
      removeIconComponent: RemoveIconComponent,
    }
  }

  ngOnInit(): void {
    this.getGroup();
    this.getDistrict();
    this.getBlock();
    this.getInstitutionName();
    this.createColumnDefs();
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };
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
          this.divisionStaticSet.add(roleArea.divisionName);
          this.divisionStaticList = Array.from(this.divisionStaticSet).join(',');
          this.districtStaticSet.add(roleArea.districtName);
          this.districtStaticList = Array.from(this.districtStaticSet).join(',');
          this.blockStaticSet.add(roleArea.blockName);
          this.blockStaticList = Array.from(this.blockStaticSet).join(',');
          this.cluserStaticSet.add(roleArea.clusterName);
          this.cluserStaticList = Array.from(this.cluserStaticSet).join(',');
          let school = new UserArea();
          this.disableBelowSchool();
          school.name = roleArea.schoolName;
          school.id = roleArea.schoolId;
          this.schoolData.push(school);
        }
      });
    }


    disableBelowState() {
      this.divisionCheck = false;
      this.districtCheck = false;
      this.blockCheck = false;
      this.clusterCheck = false;
      this.disableDivision = false;
      this.disableDistrict = false;
      this.disableBlock = false;
      this.disableCluster = false;
      this.disableSchool = false;
    }
  
    disableBelowDivision() {
      this.disableDistrict = true;
      this.disableBlock = true;
      this.disableCluster = true;
      this.disableSchool = true;
    }
  
    disableBelowDistrict() {
      this.divisionCheck = true;
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
    ngAfterViewInit() {
      var acc = document.getElementsByClassName("accordion");
      var i;
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }
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


createFormEdit(){
  // this.getBlock(); this.getGroup();
  // this.getDistrict(); 
  this.getClass();
  this.getSchoolByBlock(this.editData.block);
  this.getAssessment();
  if(this.editData){
    this.allocationdDetailForm = this.fb.group({
      allocationId: [this.editData.allocationId],
      enumeratorId: [this.editData.enumerator.enumeratorId],
      enumeratorName: [this.editData.enumerator.enumeratorName],
      dateOfBirth: [this.editData.enumerator.dateOfBirth],
      mobile: [this.editData.enumerator.mobile],
      email: [this.editData.enumerator.email],
      fatherName: [this.editData.enumerator.fatherName],
      higherQualification: [this.editData.enumerator.higherQualification],
      institutionDistrict: [this.editData.enumerator.instituteDistrict.districtId],
      institutionName: [this.editData.enumerator.institute.institutonId],
      grade: [this.editData.enumerator.grade],
      residentialAddress: [this.editData.enumerator.residentialAddress],
       district: [this.editData.enumerator.district.districtId],
      block: [this.editData.enumerator.block.blockId],
      supportingDocument: [this.editData.enumerator.supportingDocument],
      group: [this.editData.group.groupId],
      assessmentId: [this.editData.assessment.assessmentId],
      startDate: [this.editData.assessment.startDate],
      schoolId:[this.editData.school.id],
      endDate: [this.editData.assessment.endDate],
      class: [this.editData.classList],
      asmtDistrict: [this.editData.district.id],
      asmtBlock: [this.editData.block.id]
    });
  }
}




  createForm() {
    if (this.editData) {
      this.allocationdDetailForm = this.fb.group({
        allocationId: [],
        enumeratorId: [this.editData.enumeratorId],
        enumeratorName: [this.editData.enumeratorName],
        dateOfBirth: [this.editData.dateOfBirth],
        mobile: [this.editData.mobile],
        email: [this.editData.email],
        fatherName: [this.editData.fatherName],
        higherQualification: [this.editData.higherQualification],
        institutionDistrict: [this.editData.instituteDistrict.districtId],
        institutionName: [this.editData.institute.institutonId],
        grade: [this.editData.grade],
        residentialAddress: [this.editData.residentialAddress],
        district: [this.editData.district.districtId],
        block: [this.editData.block.blockId],
        supportingDocument: [this.editData.supportingDocument],

        group: [],
        assessmentId: [],
        startDate: [],
        schoolId:[],
        endDate: [],
        class: [],
        asmtDistrict: [],
        asmtBlock: []

      });
    } else {
      this.allocationdDetailForm = this.fb.group({
        allocationId: [],
        enumeratorId: [],
        enumeratorName: [],
        dateOfBirth: [],
        mobile: [],
        email: [],
        fatherName: [],
        higherQualification: [],
        institutionDistrict: [],
        institutionName: [],
        grade: [],
        residentialAddress: [],
        district: [],
        block: [],
        supportingDocument: [],
        schoolId:[],
        group: [],
        assessmentId: [],
        startDate: [],
        endDate: [],
        class: [],
        asmtDistrict: [],
        asmtBlock: [],
        cluster: [],
      });
    }
  }

  allocate() {
    let allocation= new Allocation();
    allocation=this.mapToModel(this.allocationdDetailForm.value);
    this.allocationService.addUpdateAllocation(allocation).subscribe(res=>{
      if(res.status==='200'){
        this.toast.success({
          detail: Constantss.SUCCESS,
          summary: res.message,
          duration: 10000,
        });
        this.router.navigate(['/baseline/allocated']);
      }
    },  (error) => {
      this.toast.error({
        detail: 'Error',
        summary: error.error,
        duration: 10000,
      });
    })
  }

  mapToModel(data):Allocation{
    let allocation = new Allocation();
    let enumerator = new Enumerator();
    allocation.allocationId = data.allocationId;
    enumerator.enumeratorId=data.enumeratorId;
    allocation.enumerator=enumerator;
    let group= new Group();
    group.groupId= data.group;
    allocation.group=group;
    let district= new District();
    district.districtId=data.district;
    allocation.district=district;
    let block = new Block();
    block.blockId=data.block;
    allocation.block=block;
    let school = new School();
    school.udisecode=data.schoolId;
    allocation.school=school;
    allocation.classList=data.class;
    let user = new User();
    user.userId=this.userIds;
    allocation.createdBy = user;
    allocation.createdOn = new Date();
    let assement = new Assessment();
    assement.assessmentId= data.assessmentId;
    allocation.assessment=assement;
    return allocation;
  }

  cancel() {
    this.confirmationDialogueService
    .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
    .then((confirmed) => {
      if (confirmed) {
        this.router.navigate(['/baseline/Allocation']);
      }
    });
  }

  cancelBtn(){
    this.confirmationDialogueService
    .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
    .then((confirmed) => {
      if (confirmed) {
        this.router.navigate(['/baseline/allocated']);
      }
    });
  }

  getGroup() {
    this.assessmentService.getAllGroups().subscribe(res=>{
      if (res && res.data !== null) {
        this.group= res.data;
      }
    });
  }

  getAssessmentNames(e) {
    this.assessmentService.getAssessmentByGroup(e.groupId).subscribe(res=>{
      if (res && res.data !== null) {
      this.asmtNames=res.data;
      }
    });
  }

  getClass(){
    this.dataSharing.fetchEntityById(6).subscribe((res)=>{
      if (res && res.data !== null) {
      this.class= res.data;
      }
    });
  }

  getAssessment(){
    this.assessmentService.getAssessment().subscribe((resp)=>{
      if (resp && resp.data !== null) {
      this.asmtNames=resp.data;
      }
    });
  }

  getAssessmentDetail(e){
   this.assessment=e;
   this.startDate=this.dateFormatters(this.assessment.startDate);
   this.endDate=this.dateFormatters(this.assessment.endDate);
   this.classList=this.assessment.classes;
  }


  getDistrict() {
    this.registrationService.getAllDistricts().subscribe((res) => {
      if (res && res.data !== null) {
      this.district = res.data;
      }
    });

    this.registrationService.fetchDistrictByJava().subscribe((res) => {
      if (res && res.data !== null) {
      this.districtList = res.data;
      }
    });
  }



  getBlock() {
    this.registrationService.getAllBlocks().subscribe((resp) => {
      if (resp && resp.data !== null) {
      this.blocks = resp.data;
      }
    });
  }

  getBlockByDistrict(data){
  this.manageUserService.getBlockData(data.id).subscribe(res=>{
    if (res && res.data !== null) {
    this.blockData=res.data;
    }
  });
  }

  getSchoolByBlock(data){
    this.manageUserService.getSchoolByBlockId(data.id).subscribe(res=>{
      if (res && res.data !== null) {
      this.school=res.data;
      }
    });
  }

  getInstitutionName(){
    this.registrationService.getInstitutionNames().subscribe((res)=>{
      if (res && res.data !== null) {
      this.institutionName= res.data;
      }
    });
  }

  getCluster() {
    this.cluster;
  }

  getSchool() {
    this.school;
  }

  dateFormatter(date:any){ 
    let formatedDate;
    if (typeof(date)=== "string") {
      const [day, month, year] = date.split('-');
      formatedDate = new Date(+year, +month - 1, +day);
    } 
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
   return formatedDate ? formatDate(formatedDate, format, locale) : formatDate(date, format, locale);
    
  }

  dateFormatters(date:any){ 
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
   return formatDate(date, format, locale);
    
  }

  save(){

  }

  createColumnDefs() {
    this.columnDefs = [];
    let header: any;

    header = this._commonUtilService.getColumnHeader('school', 'School');
    header.width = 200;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('class', 'Class');
    header.width = 180;
    this.columnDefs.push(header);

    header = this._commonUtilService.getColumnHeader('', 'Remove');
    header.width = 180;
    header.cellRenderer = 'removeIconComponent';
    header.cellRendererParams = {
      type:'removeAllocationSchoolClass',
      onRemoveIconClick : this.onRemoveBtnClicked.bind(this)
    }
    this.columnDefs.push(header);

  }

  onRemoveBtnClicked(params){
   this.detaiList.forEach((params,index)=>{
    if(params.data.id==params.data.id){
      this.detaiList.splice(index, 1);
    }
   });
   this.gridApi.setRowData(this.detaiList);
    }


}
