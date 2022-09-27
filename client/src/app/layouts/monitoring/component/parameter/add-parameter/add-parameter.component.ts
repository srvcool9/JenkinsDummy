import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { Constantss } from 'src/utils/constantss';

@Component({
  selector: 'app-add-parameter',
  templateUrl: './add-parameter.component.html',
  styleUrls: ['./add-parameter.component.scss']
})
export class AddParameterComponent implements OnInit {

  addParameterForm : FormGroup;
  section = [];
  type = [];
  quarter = [];
  purpose = [];
  gradeGroup = [];
  visitorRole = [];
  dropdownSettings: IDropdownSettings = {};
  sectionName:any;
  sectionData:any;
  constructor(private fb : FormBuilder, private router : Router, private confirmDialogue: ConfirmationDialogService,
    private dataSharing : DataSharingService) { 
    this.sectionData = this.dataSharing.getSectionName();
    this.sectionName = this.sectionData.source._value;
    this.getPurpose();
    this.getType();
    this.getQuarter();
  }

  ngOnInit(): void {
    this.createForm();
    this.dropdownSettings = {
      idField: 'id',
      textField: 'name',
    };
  }

  createForm(){
    this.addParameterForm = this.fb.group({
      id : [],
      section : [null],
      purpose : [null],
      type : [null],
      quarter : [null],
      parameter : [],
      gradeGroup: [null],
      visitorRole: [null],
      description1:[],
      description2:[],
      description3:[],
      action1:[],
      action2:[],
      action3:[]
    })
  }

  getPurpose(){
    this.dataSharing.fetchEntityById(18).subscribe((resp) => {
      if (resp && resp.data !== null) {
      this.purpose = resp.data;
      }
    });
  }

  getType(){
    this.dataSharing.fetchEntityById(16).subscribe((resp) => {
      if (resp && resp.data !== null) {
      this.type = resp.data;
      }
    });
  }

  getQuarter(){
    this.dataSharing.fetchEntityById(17).subscribe((resp) => {
      if (resp && resp.data !== null) {
      this.quarter = resp.data;
      }
    });
  }

  get sections() {
    return this.addParameterForm.get('section');
  }

  get types() {
    return this.addParameterForm.get('type');
  }

  get quarters() {
    return this.addParameterForm.get('quarter');
  }

  getSections(){
    this.section = [];
  }

  save(){

  }

  cancel(){
    this.confirmDialogue
    .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
    .then((confirmed) => {
      if (confirmed) {
        this.router.navigate(['/monitoring/parameters']);
      }
    });
  }

}


