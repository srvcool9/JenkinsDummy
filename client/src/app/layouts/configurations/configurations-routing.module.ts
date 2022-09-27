import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManagePermissionsComponent} from './component/manage-permissions/manage-permissions.component';
import {ManageUsersComponent} from './component/manage-users/manage-users.component';
import {ManageRolesComponent} from './component/manage-roles/manage-roles.component';
import { AddRoleComponent } from './component/manage-roles/add-role/add-role.component';
import { AddUserComponent } from './component/manage-users/add-user/add-user.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ManageRolesComponent,
  // },
    

{
path: 'UserMgmt',
component: ManageUsersComponent,
data: { title:'Configuration > User Management'},
},
{
  path : 'UserMgmt/add_user',
  component : AddUserComponent,
  data: { title: 'Configuration / User Management / Associated Role' },
},
{
  path : 'UserMgmt/edit_user',
  component : AddUserComponent,
  data: { title: 'Configuration > User Management > Edit Associated Role' },
},
{
path: 'RoleMgmt',
component: ManageRolesComponent,
data: { title: 'Configuration > Role Management' },
},
{
  path : 'RoleMgmt/add_role',
  component : AddRoleComponent,
  data: { title: 'Configuration > Role Management > Add Role' },
},
{
  path:'RoleMgmt/edit_role',
  component : AddRoleComponent,
  data: { title: 'Configuration > Role Management > Edit Role' },
},
{
  path: 'Permission',
component: ManagePermissionsComponent,
data: { title:'Configuration > Permission'},
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationsRoutingModule { }
