import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from '../training/component/training master/group/group.component';
import { SubGroupComponent } from '../training/component/training master/sub-group/sub-group.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { FormInitiateTrainingComponent } from './component/form-initiate-training/form-initiate-training.component';
import { GenerateQRCodeComponent } from './component/generate-qrcode/generate-qrcode.component';
import { InitiateTrainingComponent } from './component/initiate-training/initiate-training.component';
import { LaunchTrainingComponent } from './component/launch-training/launch-training.component';
import { TrainingComponent } from './component/training master/training/training.component';
import { TrainingAssessmentComponent } from './component/training-assessment/training-assessment.component';
import { TrainingTestComponent } from './component/training-assessment/training-test/training-test.component';
import { TrainingConfigurationComponent } from './component/training-configuration/training-configuration.component';
import { TrainingMonitorComponent } from './component/training-monitor/training-monitor.component';

const routes: Routes = [
  {
    path: 'group',
    component: GroupComponent,
    data: { title: 'Training > Training Master > Training Group' },
  },
  {
    path: 'subGroup',
    component: SubGroupComponent,
    data: { title: 'Training > Training Master > Training Sub-Group' },
  },

  {
    path: 'trainingMaster',
    component: TrainingComponent,
    data: { title: 'Training > Training Master > Training' },
  },
  {
    path: 'trainingConfiguration',
    component: TrainingConfigurationComponent,
    data: { title: 'Training > Training Configuration' },
  },

  {
    path: 'initiateTraining',
    component: InitiateTrainingComponent,
    data: { title: 'Training > Initiate Training' }
  }

  ,
  {
    path: 'initiateTrainingForm',
    component: FormInitiateTrainingComponent,
    data: { title: 'Training > Initiate Training' }
  },

  {

    path: 'launchTraining',
    component: LaunchTrainingComponent,
    data: { title: 'Training > Launch Training' }
  },

  {
    path: 'attendance',
    component: AttendanceComponent,
    data: { title: 'Training > Attendance' }
  },
  {
    path: 'code',
    component: GenerateQRCodeComponent,
    data: { title: 'Training > Generate QR Code' },
  },
  {
    path: 'trainingMonitor',
    component: TrainingMonitorComponent,
    data: { title: 'Training > Monitor' },
  },
  {
    path: 'trainingAssmt',
    component: TrainingAssessmentComponent,
    data: { title: 'Training > Training Test' },
  },
  {
    path: 'TestAssessment/edit_assessment',
    component:TrainingTestComponent,
    data: { title: 'Training > Training Test' }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
