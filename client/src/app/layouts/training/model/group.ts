import { User } from "src/app/views/pages/login/model/user.model";

export class Group {
 groupId:number;
  groupName:string;
  description : string;
  isActive: boolean;
  userId: number;
  createdBy: number;
  createdOn: Date;
  updatedBy: User;
  updatedOn: Date;
}
