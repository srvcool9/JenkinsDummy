import { User } from "src/app/views/pages/login/model/user.model";
import { BatchMaster } from "./batch-master";

export class RedFlag {
   redFlagId:number;
   batchId:BatchMaster;
   remark:string;
   createdBy:User;
   createdOn:Date;
   updatedBy:User;
   updatedOn:Date;
}
