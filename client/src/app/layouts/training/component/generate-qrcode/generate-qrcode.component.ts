import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-generate-qrcode',
  templateUrl: './generate-qrcode.component.html',
  styleUrls: ['./generate-qrcode.component.scss']
})
export class GenerateQRCodeComponent implements OnInit {
  detailsForm: FormGroup;
  groups;
  subGroups;
  trainingLists;
  batches;
  batchId;
  img ;
  imageVisible = false;
  constructor(private fb: FormBuilder,private groupservice:GroupService) { }

  ngOnInit(): void {
    this.createForm();
    this.groupservice.getTrainingGroups().subscribe(res=> {
      if(res && res.data) {
        const allGroups = res.data;
        this.groups = allGroups.filter((grp)=>grp.isActive===true);
      }
    });
  }

  createForm() {
    this.detailsForm = this.fb.group({
      group: [null,[Validators.required]],
      subGroup: [null,[Validators.required]],
      training: [null,[Validators.required]],
      batch: [null,[Validators.required]]
    })
  }

  forSubMenuItems(e) {
    if(e && e!==null && e!==undefined) {
      this.subGroups = e.trainingSubGroupList.filter((subgrp)=>subgrp.isActive===true);
    }
  }

  forTrainingItems(e) {
    if(e && e!==null && e!==undefined) {
      this.trainingLists = e.trainingList.filter((training)=>training.isActive===true);
    }
  }

  forBatchItems(e) {
    if(e && e!==null && e!==undefined) {
      this.groupservice.getBatchesByTraining(e.trainingId).subscribe((res:any)=> {
        if(res && (res.data !==null || res.data !==undefined)) {
          this.batches = res.data;
        }
      }); 
      // this.trainingLists = e.trainingList.filter((training)=>training.isActive===true);
    }
  }

  batchNumber(e) {
    this.batchId = e.batchId;
  }   

  generateQRcode() {
    this.groupservice.generateQRcode(this.batchId).subscribe(res=> {
    // let file;
    this.imageVisible = true;
    var reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onload = (_event) => {
        this.img = reader.result;
      } 
    });
  }

  printQRcode() {
   window.print();
  }

}
