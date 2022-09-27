
import {Area} from "./area.model"

export class UserRole {
  roleId: number;
  roleName: string;
  roleDescription:string; 
  roleType:string;
  roleTypeId:number;
  createdBy: number;
  createdOn: string;
  updatedBy: string;
  updatedOn: Date;
  isActive: boolean;
  loginUserId:string;
  areas:Area[];
}
