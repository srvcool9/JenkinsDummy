import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { SwitchComponent } from './switch/switch.component';
import { EditIconComponent } from './edit-icon/edit-icon.component';
import { DeleteIconComponent } from './delete-icon/delete-icon.component';
import { ViewAreaComponent } from './view-area/view-area.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from './detail/detail.component';
import { EyeIconComponent } from './eye-icon/eye-icon.component';
import { RemoveIconComponent } from './remove-icon/remove-icon.component';
import { AllocateIconComponent } from './allocate-icon/allocate-icon.component';
import { TranslateModule } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TrainingModule } from '../training/training.module';
import { LinkComponent } from './link/link.component';
import { PowerIconComponent } from './power-icon/power-icon.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RemarkTextBoxComponent } from './remark-text-box/remark-text-box.component';
import { RatingIconComponent } from './rating-icon/rating-icon.component';
import { TrainingService } from '../training/services/training.service';
import { AttendanceService } from '../training/services/attendance.service';
import { CheckboxDisabledComponent } from './checkbox-disabled/checkbox-disabled.component';
import { VerifyStatusComponent } from './verify-status/verify-status.component';
import { StartTestIconComponent } from './start-test-icon/start-test-icon.component';
import { LinkStatusComponent } from './link-status/link-status.component';
import { TrainingTestStatusComponent } from './training-test-status/training-test-status.component';
import { ParameterIconComponent } from './parameter-icon/parameter-icon.component';
import { SelfAssmtLinkComponent } from './self-assmt-link/self-assmt-link.component';


@NgModule({
  declarations: [
    SwitchComponent,
    EditIconComponent,
    DeleteIconComponent,
    ViewAreaComponent,
    DetailComponent,
    EyeIconComponent,
    RemoveIconComponent,
    AllocateIconComponent,
    LinkComponent,
    PowerIconComponent,
    CheckboxComponent,
    RemarkTextBoxComponent,
    RatingIconComponent,
    CheckboxDisabledComponent,
    VerifyStatusComponent,
    StartTestIconComponent,
    LinkStatusComponent,
    TrainingTestStatusComponent,
    ParameterIconComponent,
    SelfAssmtLinkComponent,
  ],
  imports: [
    CommonModule,
    TrainingModule,
    CoreRoutingModule,
    NgbPopoverModule,
    TranslateModule,
    ModalModule
  ],
  providers:[TrainingService,AttendanceService]

})
export class CoreModule { }
