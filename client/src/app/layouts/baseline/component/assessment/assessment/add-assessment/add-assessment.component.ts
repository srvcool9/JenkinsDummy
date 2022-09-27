import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import {Assessment} from '../../../../model/assessment model/assessment'
import {Group} from '../../../../model/assessment model/group'
import {Entity} from '../../../../model/entity.model'
import {Enumerator} from '../../../../model/assessment model/enumerator'
import {AssementService} from '../../../../service/assement.service'
import { SchoolLocation } from 'src/app/layouts/baseline/model/assessment model/school-location';
import { GroupService } from 'src/app/layouts/baseline/service/assessment service/group service/group.service';
import * as moment from 'moment';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { User } from 'src/app/views/pages/login/model/user.model';
import { formatDate } from '@angular/common';
import { Constantss } from 'src/utils/constantss';


declare var bootbox: any;
@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.component.html',
  styleUrls: ['./add-assessment.component.scss'],
})
export class AddAssessmentComponent implements OnInit {
  addAssessmentForm: FormGroup;
  startDateCheck = false;
  endDateCheck = false;
  editAssmt = new Assessment() ;
  checkedRural = true;
  dis = true;
  groups = [];
  criterias = [];
  types = [];
  mode = [];
  enumerator = [];
  level = [];
  class;
  classList = [];
  schoolType = [];
  selectedType: number;
  startDate;
  startDateCal;
  show = false;
  endDate;
  endDateCal;
  numofDays;
  calnumofDays;
  checkStart;
  checkEnd;
  check;
  disabledStart = true;
  disabledEnd = true;
  disabledLocation = true;
  disabledRural = true;
  disabledUrban = true;
  rural;
  urban;
  disableRuralPercent = true;
  disableUrbanPercent = true;
  hideRuralPercent = true;
  hideUrbanPercent = true;
  checkRural = false;
  checkUrban = false;
  overallPercent = false;
  colorvariable = false;
  assmtTitle: string;
  dropdownList = [];
  dropdownSettings:IDropdownSettings={};
  userId;
  constructor(
    private fb: FormBuilder,
    private confirmationDialogueService : ConfirmationDialogService,
    private dataSharing: DataSharingService,
    private groupService:GroupService,
    private assesmentService:AssementService,
    private toast : NgToastService,
    private router : Router,
    private clientStorage:ClientSideStorageService

  ) {
    this.createFormAdd();
   this.userId=this.clientStorage.get('userId');
    this.dataSharing.getGlobalEditData().subscribe((response) => {
      if (response != null) {
        this.assmtTitle = 'Edit Assessment';
        this.editAssmt = response;
        this.editAssmt.startDate =this.dateFormattergrid(this.editAssmt.startDate);
        this.editAssmt.endDate =this.dateFormattergrid(this.editAssmt.endDate);
        this.createForm();
      } else {
        this.assmtTitle = 'Add Assessment';
        this.createFormAdd();
      }
    });
  }

  ngOnInit(): void {
    this.getallGroups();
    this.getAllCriteria();
    this.getAllType();
    this.getPaperMode();
    this.getClass();
    this.getEnumerators();
    this.getLevel();
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };
  }
  dateFormattergrid(date:any){
    let formatedDate;
    if (typeof(date)=== "string") {
      const [day, month, year] = date.split('-');
      formatedDate = new Date(+year, +month - 1, +day);
    }
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
   return formatedDate ? formatDate(formatedDate, format, locale) : formatDate(date, format, locale);
  }

  createForm() {
    this.disabledStart = null;
    this.disabledEnd = null;
    this.disableRuralPercent = null;
    this.disableUrbanPercent = null;
    this.addAssessmentForm = this.fb.group({
      id: [this.editAssmt.assessmentId],
      name: [
        this.editAssmt.assessmentName,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9- ]+$'),
        ],
      ],
      description: [this.editAssmt.description, [Validators.maxLength(200)]],
      group: [this.editAssmt.group.groupId],
      criteria: [this.editAssmt.criteria.id, [Validators.required]],
      type: [this.editAssmt.typeId.id, [Validators.required]],
      mode: [this.editAssmt.modeId.id,[Validators.required]],
      schoolTypeCheck : [true],
      enumerator: [this.editAssmt.enumerator.id],
      numberOfSchool: [
        this.editAssmt.numberOfSchool,
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      startDate: [this.editAssmt.startDate],
      endDate: [this.editAssmt.endDate],
      totalNumberOfDay: ['', [Validators.required]],
      class: [this.editAssmt.classes,[Validators.required]],
      status: [this.editAssmt.isActive],
      level: [this.editAssmt.roleTypeId.id],
      schoolType: [this.editAssmt.schoolTypeId.id],
      minStudentsPerClass: [this.editAssmt.minStudents,[Validators.required, Validators.pattern('^[0-9]+$')]],
      schoolLoaction: [true],
      rural: [this.editAssmt.ruralRatio],
      urban: [this.editAssmt.urbanRatio],
      overallPercent: [this.editAssmt.urbanRatio+this.editAssmt.ruralRatio, [Validators.pattern('100')]],
    });
   
    this.startDateCheck=true; this.endDateCheck=true;
    let start = new Date(this.editAssmt.startDate).getTime();
    let end = new Date(this.editAssmt.endDate).getTime();
    this.totalDays(start,end);
    let checkBoxSchoolType = this.addAssessmentForm.get('schoolTypeCheck').value;
   if(checkBoxSchoolType==true){
      this.getSchoolType();
   }
   this.show=true;
   this.overallPercent = true;
   this.hideRuralPercent = false;
   this.hideUrbanPercent = false;
   this.disabledLocation = null;
   this.checkRural = true;
   this.checkUrban = true;
   let overallPercentageValue = this.addAssessmentForm.get('overallPercent').value;
   if(overallPercentageValue=='100'){
    this.colorvariable = true;
   }else{
    this.colorvariable = false;
   }
  }

  createFormAdd() {
    // this.disabledStart = false;
    // this.disabledEnd = false;
    this.addAssessmentForm = this.fb.group({
      id: [],
      name: ['',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9- ]+$'),
        ],
      ],
      description: ['', [Validators.maxLength(200)]],
      group: [],
      criteria: [null, [Validators.required]],
      type: [null, [Validators.required]],
      mode: [null,[Validators.required]],
      enumerator: [],
      numberOfSchool: [
        null,
        [Validators.required, Validators.pattern('^[0-9]+$')],
      ],
      schoolTypeCheck : [false],
      startDate: [],
      endDate: [],
      totalNumberOfDay: [this.calnumofDays, [Validators.required]],
      class: [null,[Validators.required]],
      status: [true],
      level: [],
      schoolType: [],
      minStudentsPerClass: [ null,
        [Validators.required, Validators.pattern('^[0-9]+$')]],
      schoolLoaction: [],
      rural: [],
      urban: [],
      overallPercent: [0, [Validators.pattern('100')]],
    });
    this.addAssessmentForm.controls['schoolType'].disable();
  }

  get assessmentName() {
    return this.addAssessmentForm.get('name');
  }

  get overallPercentage() {
    return this.addAssessmentForm.get('overallPercent');
  }

  get assessmentDescription() {
    return this.addAssessmentForm.get('description');
  }
  get criteria() {
    return this.addAssessmentForm.get('criteria');
  }
  get type() {
    return this.addAssessmentForm.get('type');
  }
  get numberOfSchool() {
    return this.addAssessmentForm.get('numberOfSchool');
  }

  get minStudentsPerClass(){
    return this.addAssessmentForm.get('minStudentsPerClass');

  }

  get modes() {
    return this.addAssessmentForm.get('mode');
  }

  get classesReq() {
    return this.addAssessmentForm.get('class');
  }



  getStartDate(e) {
    this.startDate = e.target.value;
    this.startDateCal = new Date(this.startDate).getTime();
    if (this.checkStart == true && this.checkEnd == true) {
      this.getTotalDays();
    }
  }

  getEndDate(e) {
    this.endDate = e.target.value;
    this.endDateCal = new Date(this.endDate).getTime();
    this.getTotalDays();
  }

  getTotalDays() {
    if (
      this.startDateCal !== '' &&
      this.endDateCal !== '' &&
      this.startDateCal != null &&
      this.endDateCal != null &&
      this.startDateCal !== undefined &&
      this.endDateCal !== undefined &&
      this.endDateCal >= this.startDateCal
    ) {
      document.getElementById('error').innerHTML = '';
      this.totalDays(this.startDateCal, this.endDateCal);
    } else {
      if (this.endDateCal < this.startDateCal) {
        this.addAssessmentForm.controls['totalNumberOfDay'].setValue(null);
        document.getElementById('error').innerHTML =
          'End Date must be greater than or equal to Start Date';
        document.getElementById('error').style.color = 'red';
        this.show = false;
      }
    }
  }

  totalDays(start, end) {
    this.numofDays = end - start;
    this.calnumofDays = this.numofDays / 8.64e7;
    if (
      this.startDateCheck==true && this.endDateCheck==true
    ) {
      this.show = true;
      this.addAssessmentForm.controls['totalNumberOfDay'].setValue(
        this.calnumofDays + 1
      );
    } else {
      this.show = false;
    }
  }

  checkBoxStart(e) {
    this.checkStart = e.target.checked;
    if (this.checkStart == true) {
      this.disabledStart = null;
    } else {
      this.disabledStart = true;
    }
    if (this.checkStart == true && this.checkEnd == true) {
      this.getTotalDays();
    } else {
      this.addAssessmentForm.controls['totalNumberOfDay'].setValue(null);
      this.show = false;
    }
  }

  checkBoxEnd(e) {
    this.checkEnd = e.target.checked;
    if (this.checkEnd == true) {
      this.disabledEnd = null;
    } else {
      this.disabledEnd = true;
    }
    if (this.checkStart == true && this.checkEnd == true) {
      this.getTotalDays();
    } else {
      this.addAssessmentForm.controls['totalNumberOfDay'].setValue(null);
      this.show = false;
    }
  }

  schoolTypeCheckbox(e) {
    this.check = e.target.checked;
    if (this.check == true) {
      this.addAssessmentForm.controls['schoolType'].enable();
      this.getSchoolType();
    }
    else {
      this.addAssessmentForm.controls['schoolType'].disable();
    }
  }

  onSchoolLocationCheck(e) {
    let schoolLoactionCheck = e.target.checked;
    if (schoolLoactionCheck == true) {
      this.disabledLocation = null;
    } else {
      this.disabledLocation = true;
    }
  }

  colorChange(overall: number) {
    if (overall === 100) {
      this.colorvariable = true;
    } else {
      this.colorvariable = false;
    }
  }

  onRuralClick(e) {
    let ans;
    let ruralCheck = e.target.checked;
    // this.startDateCheck = true;
    if (ruralCheck == true) {
      this.checkRural = true;
      bootbox.prompt({
        title: 'Enter Ratio',
        color:'#005391',
        closeButton: false,
        required: true,
        size: 'small',
        centerVertical: true,
        inputType: 'number',
        placeholder: 'Ratio must be within 1 to 100',
        max: 100,
        min: 1,
        buttons: {
          cancel: {
            label: '<i class="fa fa-times"></i>',
            className: 'btn-danger',
          },
          confirm: {
            label: '<i class="fa fa-check"></i>',
            className: 'btn-success',
          },
        },
        callback: (result: number) => {
          ans = result;

          if (ans == null) {
            this.disableRuralPercent = true;
            this.hideRuralPercent = true;
            this.checkRural = false;
          } else {
            this.rural = ans;
            this.addAssessmentForm.controls['rural'].setValue(ans);
            this.disableRuralPercent = null;
            this.hideRuralPercent = false;
            this.overallPercent = true;
            let urban = this.addAssessmentForm.get('urban').value;
            if (urban == null) {
              urban = 0;
            }
            let overall = parseInt(urban) + parseInt(ans);
            this.addAssessmentForm.controls['overallPercent'].setValue(overall);
            this.colorChange(overall);
          }
        },
      });
    } else {
      this.addAssessmentForm.controls['rural'].setValue(null);
      // this.addAssessmentForm.controls['overallPercent'].setValue(0);
      let urban = this.addAssessmentForm.get('urban').value;
      let overall = parseInt(urban);
      if(urban==null){
        this.addAssessmentForm.controls['rural'].setValue(null);
        this.addAssessmentForm.controls['overallPercent'].setValue(0);
        this.disableRuralPercent = true;
        this.hideRuralPercent = true;
        this.overallPercent = false;
      }else{
      this.addAssessmentForm.controls['overallPercent'].setValue(overall);
      this.disableRuralPercent = true;
      this.hideRuralPercent = true;
      this.overallPercent = true;
      }

    }
  }

  onRuralFocus() {
    let ans;
    bootbox.prompt({
      title: 'Enter Ratio',
      closeButton: false,
      required: true,
      value: this.addAssessmentForm.get('rural').value,
      size: 'small',
      centerVertical: true,
      inputType: 'number',
      placeholder: 'Ratio must be within 1 to 100',
      max: 100,
      min: 1,
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i>',
          className: 'btn-danger',
        },
        confirm: {
          label: '<i class="fa fa-check"></i>',
          className: 'btn-success',
        },
      },
      callback: (result: number) => {
        ans = result;
        if (ans == null) {
          this.disableRuralPercent = null;
          this.hideRuralPercent = false;
        } else {
          this.rural = ans;
          this.addAssessmentForm.controls['rural'].setValue(ans);
          this.hideRuralPercent = false;

          let urban = this.addAssessmentForm.get('urban').value;
          if (urban == null) {
            urban = 0;
          }
          let overall = parseInt(urban) + parseInt(ans);
          this.addAssessmentForm.controls['overallPercent'].setValue(overall);
          this.colorChange(overall);
        }
      },
    });
  }

  onUrbanClick(e) {
    // this.endDateCheck = true;
    let ans;
    let urbanCheck = e.target.checked;
    if (urbanCheck == true) {
      this.checkUrban = true;
      bootbox.prompt({
        title: 'Enter Ratio',
        closeButton: false,
        required: true,
        size: 'small',
        centerVertical: true,
        inputType: 'number',
        placeholder: 'Ratio must be within 1 to 100',
        max: 100,
        min: 1,
        buttons: {
          cancel: {
            label: '<i class="fa fa-times"></i>',
            className: 'btn-danger',
          },
          confirm: {
            label: '<i class="fa fa-check"></i>',
            className: 'btn-success',
          },
        },
        callback: (result: number) => {
          ans = result;
          if (ans == null) {
            this.disableUrbanPercent = true;
            this.hideUrbanPercent = true;
            this.checkUrban = false;
          } else {
            this.addAssessmentForm.controls['urban'].setValue(ans);
            this.disableUrbanPercent = null;
            this.hideUrbanPercent = false;
            this.overallPercent = true;
            let rural = this.addAssessmentForm.get('rural').value;
            if (rural == null) {
              rural = 0;
            }
            let overall = parseInt(rural) + parseInt(ans);
            this.addAssessmentForm.controls['overallPercent'].setValue(overall);
            this.colorChange(overall);
          }
        },
      });
    } else {
      this.addAssessmentForm.controls['urban'].setValue(null);
      let rural = this.addAssessmentForm.get('rural').value;
      let overall = parseInt(rural);
      if(rural==null){
        this.addAssessmentForm.controls['urban'].setValue(null);
        this.addAssessmentForm.controls['overallPercent'].setValue(0);
        this.disableUrbanPercent = true;
        this.hideUrbanPercent = true;
        this.overallPercent = false;
      }else{
     this.addAssessmentForm.controls['overallPercent'].setValue(overall);
      this.disableUrbanPercent = true;
      this.hideUrbanPercent = true;
      this.overallPercent = true;
      }
    }
  }

  onUrbanFocus() {
    let ans;
    bootbox.prompt({
      title: 'Enter Ratio',
      closeButton: false,
      required: true,
      size: 'small',
      value: this.addAssessmentForm.get('urban').value,
      centerVertical: true,
      inputType: 'number',
      placeholder: 'Ratio must be within 1 to 100',
      max: 100,
      min: 1,
      buttons: {
        cancel: {
          label: '<i class="fa fa-times"></i>',
          className: 'btn-danger',
        },
        confirm: {
          label: '<i class="fa fa-check"></i>',
          className: 'btn-success',
        },
      },
      callback: (result: number) => {
        ans = result;
        if (ans == null) {
          this.disableUrbanPercent = null;
          this.hideUrbanPercent = false;
        } else {
          this.rural = ans;
          this.addAssessmentForm.controls['urban'].setValue(ans);
          this.hideUrbanPercent = false;

          let rural = this.addAssessmentForm.get('rural').value;
          if (rural == null) {
            rural = 0;
          }
          let overall = parseInt(rural) + parseInt(ans);
          this.addAssessmentForm.controls['overallPercent'].setValue(overall);
          this.colorChange(overall);
        }
      },
    });
  }

  getallGroups() {
    this.groupService.getGroupList().subscribe((res)=>{      
      if (res && res.data !== null) {
      const groupList=res.data;
      this.groups=groupList.filter((g)=> g.isActive===true);
      }
    });
  }

  getAllCriteria() {
    this.dataSharing.fetchEntityById(4).subscribe((res)=>{      
      if (res && res.data !== null) {
      this.criterias= res.data;
      }
    });
  }

  getAllType() {
    this.dataSharing.fetchEntityById(5).subscribe((res)=>{      
      if (res && res.data !== null) {
      this.types= res.data;
      }
    });
  }

  getPaperMode() {
     this.dataSharing.fetchEntityById(7).subscribe((res)=>{
      if (res && res.data !== null) {
      this.mode= res.data;
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

  getEnumerators() {
    //subs
    this.enumerator = enumeratorList;
  }

  getLevel() {
    this.dataSharing.fetchEntityById(8).subscribe((res)=>{
      if (res && res.data !== null) {
      this.level= res.data;
      }
    });
  }

  getSchoolType() {
    this.dataSharing.fetchEntityById(2).subscribe((res)=>{
      if (res && res.data !== null) {
      this.schoolType = res.data;
      }
    });
  }

  save() {
    this.confirmationDialogueService
    .confirm('Confirmation', 'Do you want to save this information ?')
    .then((confirmed) => {
     if(confirmed){
      let assesment= new Assessment();
      assesment= this.mapToModel(this.addAssessmentForm.value);
      this.assesmentService.addUpdateAssesment(assesment).subscribe((res)=>{
       if(res.status==='200'){
         this.toast.success({
           detail: Constantss.SUCCESS,
           summary: Constantss.SAVED_SUCCESSFULLY,
           duration: 10000,
         });
         this.router.navigate(['/baseline/assessment']);
       }
      },(error) => {
       this.toast.error({
         detail: 'Error',
         summary: error.error,
         duration: 10000,
       });
     })
     }

    });
   
  }

  cancel() {
    this.confirmationDialogueService
    .confirm(
      Constantss.CONFIRMATION,
      Constantss.SURE_CANCEL
    )
    .then((confirmed) => {
      if (confirmed) {
        this.addAssessmentForm.reset();
        this.router.navigate(['/baseline/assessment']);
      }
    });
    
  }

  mapToModel(data:any):Assessment{
    let assesment= new Assessment();
    assesment.assessmentId= data.id;
    assesment.assessmentName= data.name;
    assesment.description= data.description;
    let group= new Group();
    group.groupId= data.group;
    assesment.group= group;
    let criteria = new Entity();
    criteria.id= data.criteria;
    assesment.criteria=criteria;
    let type = new Entity();
    type.id= data.type;
    assesment.typeId=type;
    let mode= new Entity();
    mode.id= data.mode;
    assesment.modeId=mode;
    let enumerator = new Entity();
    enumerator.id= data.enumerator;
    assesment.enumerator= enumerator;
    let level= new Entity();
    level.id= data.level;
    assesment.roleTypeId= level;
    let schoolType= new Entity();
    schoolType.id= data.schoolType;
    assesment.schoolTypeId=schoolType;
    let classList:Entity[];
    classList=data.class;
    // let schoolLoaction= new SchoolLocation();
    assesment.ruralRatio= parseInt(data.rural);
    assesment.urbanRatio= parseInt(data.urban);
    assesment.overallPercent=assesment.ruralRatio+assesment.urbanRatio;
    assesment.minStudents=data.minStudentsPerClass;
    assesment.classes=classList;
    assesment.isActive= data.status;
    assesment.totalNumberofDays= data.totalNumberofDays;
    assesment.startDate= data.startDate;
    assesment.endDate=data.endDate;
    assesment.numberOfSchool= data.numberOfSchool;
    let user= new User();
    user.userId=this.userId;
    assesment.updatedOn= new Date();
    assesment.updatedBy=this.userId;

   return assesment;
  }
}

export const enumeratorList = [{
  'id': 1,
  'name':'Employee'
},{
  'id': 2,
  'name':'D.El.Ed'
},{
  'id': 3,
  'name':'Others'
}]

export const schoolTypeList = [{
  'id': 1,
  'name':'Primary(1-5)'
},{
  'id': 2,
  'name':'Middle (6-8)'
},{
  'id': 3,
  'name':'Middle (1-8) '
}]



