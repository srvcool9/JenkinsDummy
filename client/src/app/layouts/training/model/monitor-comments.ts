import { User } from "src/app/views/pages/login/model/user.model";
import { BatchMaster } from "./batch-master";
import { TrainerMaster } from "./trainer-master";

export class MonitorComments {
    monitorCommentId : number;
    batchMaster : BatchMaster;
    comment : string;
    createdBy : number;
    createdOn : Date;
    trainerMaster : TrainerMaster;
    updatedBy : User;
    updatedOn : Date; 
}
