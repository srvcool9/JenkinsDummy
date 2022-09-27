import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { TrainingRoutingModule } from './training-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { TranslateModule } from '@ngx-translate/core';
import { GroupComponent } from '../training/component/training master/group/group.component';
import { SubGroupComponent } from '../training/component/training master/sub-group/sub-group.component';
import { TrainingComponent } from '../training/component/training master/training/training.component';
import { AddGroupComponent } from '../training/component/training master/group/add-group/add-group.component';
import {ToasterModule} from "angular2-toaster";
import { ToastrModule } from 'ngx-toastr';
import { AvatarModule } from 'ngx-avatar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToasterService } from 'angular2-toaster';
import { AddSubGroupComponent } from '../training/component/training master/sub-group/add-sub-group/add-sub-group.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TrainingConfigurationComponent } from './component/training-configuration/training-configuration.component';
import {AddTrainingComponent} from './component/training master/training/add-training/add-training.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InitiateTrainingComponent } from './component/initiate-training/initiate-training.component';
import { FormInitiateTrainingComponent } from './component/form-initiate-training/form-initiate-training.component';
import { LaunchTrainingComponent } from './component/launch-training/launch-training.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { GenerateQRCodeComponent } from './component/generate-qrcode/generate-qrcode.component';
import { LaunchPopUpComponent } from './component/launch-training/launch-pop-up/launch-pop-up.component';
import { RemarkPopUpComponent } from './component/attendance/remark-pop-up/remark-pop-up.component';
import { TrainingMonitorComponent } from './component/training-monitor/training-monitor.component';
import { TrainingAssessmentComponent } from './component/training-assessment/training-assessment.component';
import { TrainingTestComponent } from './component/training-assessment/training-test/training-test.component';
@NgModule({
  declarations: [

  
    GroupComponent,
         SubGroupComponent,
         TrainingComponent,
         AddGroupComponent,
         AddSubGroupComponent,
         AddTrainingComponent,
         TrainingConfigurationComponent,
         InitiateTrainingComponent,
         FormInitiateTrainingComponent,
         LaunchTrainingComponent,
         AttendanceComponent,
         GenerateQRCodeComponent,
         LaunchPopUpComponent,
         RemarkPopUpComponent,
         TrainingMonitorComponent,
         TrainingAssessmentComponent,
         TrainingTestComponent
  ],
  imports: [
    CommonModule,DragDropModule,
    TrainingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    TranslateModule,
    ModalModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports : [
    AddGroupComponent
  ]
})
export class TrainingModule { }
