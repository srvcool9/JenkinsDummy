import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import { BaselineRoutingModule } from './baseline-routing.module';
import { AssessmentComponent } from './component/assessment/assessment/assessment.component';
import { AgGridModule } from 'ag-grid-angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './component/assessment/group/group.component';
import { AddGroupComponent } from './component/assessment/group/add-group/add-group.component';
import { AddAssessmentComponent } from './component/assessment/assessment/add-assessment/add-assessment.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { VerifiedComponent } from './component/verfication/verified/verified.component';
import { UnverifiedComponent } from './component/verfication/unverified/unverified.component';
import { RegistrationComponent } from './component/verfication/registration/registration.component';
import { VerificationCodeComponent } from './component/verfication/registration/verification-code/verification-code.component';
import { RegistrationSuccessComponent } from './component/verfication/registration/registration-success/registration-success.component';
import { UnallocatedComponent } from './component/allocation/unallocated/unallocated.component';
import { AllocatedComponent } from './component/allocation/allocated/allocated.component';
import { AllocationDetailComponent } from './component/allocation/allocation-detail/allocation-detail.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AssessmentComponent,
    GroupComponent,
    AddGroupComponent,
    AddAssessmentComponent,
    VerifiedComponent,
    UnverifiedComponent,
    RegistrationComponent,
    VerificationCodeComponent,
    RegistrationSuccessComponent,
    UnallocatedComponent,
    AllocatedComponent,
    AllocationDetailComponent,
  ],
  imports: [
    CommonModule,
    BaselineRoutingModule,
    AgGridModule.withComponents([]),
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ModalModule,
    NgMultiSelectDropDownModule.forRoot()
  ]
})
export class BaselineModule { }
