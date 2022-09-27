import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationsRoutingModule } from './configurations-routing.module';
import { ManageUsersComponent } from './component/manage-users/manage-users.component';
import { ManageRolesComponent } from './component/manage-roles/manage-roles.component';
import { ManagePermissionsComponent } from './component/manage-permissions/manage-permissions.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoleComponent } from './component/manage-roles/add-role/add-role.component';
import { AddUserComponent } from './component/manage-users/add-user/add-user.component';
import {ToasterModule} from "angular2-toaster";
import { ToastrModule } from 'ngx-toastr';
import { AvatarModule } from 'ngx-avatar';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToasterService } from 'angular2-toaster';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ManageUsersComponent,
    ManageRolesComponent,
    ManagePermissionsComponent,
    AddRoleComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    ConfigurationsRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule.forRoot(),
    ToastrModule.forRoot(),
    AvatarModule,
    ModalModule.forRoot(),
    NgSelectModule,
    TranslateModule
  
  ],
  providers: [
    ToasterService
  ]
})
export class ConfigurationsModule { }
