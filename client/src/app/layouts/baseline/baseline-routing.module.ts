import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './component/verfication/registration/registration.component';
import { AddAssessmentComponent } from './component/assessment/assessment/add-assessment/add-assessment.component';
import { AssessmentComponent } from './component/assessment/assessment/assessment.component';
import { AddGroupComponent } from './component/assessment/group/add-group/add-group.component';
import { GroupComponent } from './component/assessment/group/group.component';
import { UnverifiedComponent } from './component/verfication/unverified/unverified.component';
import { VerifiedComponent } from './component/verfication/verified/verified.component';
import { AllocationDetailComponent } from './component/allocation/allocation-detail/allocation-detail.component';
import { AllocatedComponent } from './component/allocation/allocated/allocated.component';
import { UnallocatedComponent } from './component/allocation/unallocated/unallocated.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: GroupComponent,
  // },
  
    {
      path: 'Assessment',
      component: GroupComponent,
      data: { title:'Baseline > Assessment > Group'},
      },
      {
        path: 'group',
        component : GroupComponent,
        data: { title:'Baseline > Assessment > Group'},
      },
      {
          path:'Verification',
          component : UnverifiedComponent,
          data: { title:'Baseline > Verification > Unverified'},
       },
      {
         path:'verified',
         component : VerifiedComponent,
         data: { title:'Baseline > Verification > Verified'},
      },
      {
        path:'unverified',
        component : UnverifiedComponent,
        data: { title:'Baseline > Verification > Unverified'},
     },
      // {
      //   path: 'Assessment/add_group',
      //   component : AddGroupComponent,
      //   data: { title:'Baseline > Assessment > Group > Add Group'},
      // },
      // {
      //   path: 'Assessment/edit_group',
      //   component : AddGroupComponent,
      //   data: { title:'Baseline > Assessment > Group > Edit Group'},
      // },
      {

        path: 'assessment',
        component : AssessmentComponent,
        data: { title:'Baseline > Assessment > Assessment'},
      },
      {
        path: 'assessment/assessment',
        component: AssessmentComponent,
        data: { title:'Baseline > Assessment > Assessment'},
        },
        {
          path: 'Assessment/add_assessment',
          component : AddAssessmentComponent,
          data: { title:'Baseline > Assessment > Add Assessment'},
        },
        {
          path: 'Assessment/edit_assessment',
          component : AddAssessmentComponent,
          data: { title:'Baseline > Assessment > Edit Assessment'},
        },
        {
          path:'Allocation/allocation_detail',
          component : AllocationDetailComponent,
          data: { title:'Baseline > Allocation > Allocation Details'},
        },
        {
          path : 'Registration',
          component : RegistrationComponent,
          data : { title:'Baseline > Registration'}
        },
        {
          path:'verified/details',
          component : RegistrationComponent,
          data : { title:'Baseline > Verification > Verified > Details'}
        },
        {
          path:'allocated',
          component : AllocatedComponent,
          data : { title:'Baseline > Allocation > Allocated '}
        },
        {
          path:'Allocation',
          component : UnallocatedComponent,
          data : { title:'Baseline > Allocation > Unallocated '}
        },
        {
          path:'Allocation/allocation_detail',
          component : AllocationDetailComponent,
          data: { title:'Baseline > Allocation > Allocation Details'},
        }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaselineRoutingModule { }
