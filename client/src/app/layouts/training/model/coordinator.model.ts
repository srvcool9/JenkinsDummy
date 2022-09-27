import { User } from "src/app/views/pages/login/model/user.model";
import { EmpCode } from "src/app/views/pages/model/emp-code";
import { BatchMaster } from "./batch-master";

export class Coordinator {

    coordinatorId:number;
    batch:BatchMaster;
    empCode:EmpCode
}
