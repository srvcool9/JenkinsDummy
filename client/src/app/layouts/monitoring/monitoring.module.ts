import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoringRoutingModule } from './monitoring-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SectionsComponent } from './component/sessions/sections.component';
import { AddSectionsComponent } from './component/sessions/add-sections/add-sections.component';
import { WeightageComponent } from './component/weightage/weightage.component';
import { ParameterComponent } from './component/parameter/parameter.component';
import { AddParameterComponent } from './component/parameter/add-parameter/add-parameter.component';
import { AllocationComponent } from './component/allocation/allocation.component';
import { SelfAssessmentComponent } from './component/self-assessment/self-assessment.component';
import { FormSelfAssessmentComponent } from './component/self-assessment/form-self-assessment/form-self-assessment.component';


@NgModule({
  declarations: [
    SectionsComponent,
    AddSectionsComponent,
    WeightageComponent,
    ParameterComponent,
    AddParameterComponent,
    AllocationComponent,
    SelfAssessmentComponent,
    FormSelfAssessmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    TranslateModule,
    ModalModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    MonitoringRoutingModule
  ]
})
export class MonitoringModule { }
