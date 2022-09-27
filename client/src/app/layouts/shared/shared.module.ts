import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NotificationComponent } from './component/notification/notification.component';
import { DialogueComponent } from './component/dialogue/dialogue.component';
import { AddressComponent } from './component/address/address.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { UrlFormationService } from './services/url-formation.service';


@NgModule({
  declarations: [
    NotificationComponent,
    DialogueComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule
    
   
  ],
  exports:[
    AddressComponent
  ], providers:[
    UrlFormationService
  ]
})
export class SharedModule { }
