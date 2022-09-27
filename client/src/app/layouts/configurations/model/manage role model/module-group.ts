import { RowDragLeaveEvent } from "ag-grid-community";
import { UserRoleService } from "../../service/manage role service/user-role.service";
import { Module } from "./module";
import {UserRole} from "./user-role"


export class ModuleGroup {
  name: string;
  url: string;
  icon: string;
  displayOrder: number;
  children: Module[];
}
