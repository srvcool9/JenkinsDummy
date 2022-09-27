import { User } from "src/app/views/pages/login/model/user.model";
import { Entity } from "../../baseline/model/entity.model";
import { UserRole } from "../../configurations/model/manage role model/user-role";
import { BatchMaster } from "./batch-master";
import { Group } from "./group";
import { SubGroup } from "./sub-group";

export class Training {
  trainingId: number;
  trainingName : string;
  subGroupId : SubGroup;
  group: Group;
  isActive: true;
  trainingLevelId : Entity;
  approxTrainees: number;
  startDate: any;
  endDate : any;
  description: string;
  status : Entity;
  maximumBatchSize : number;
  updatedOn : Date;
  createdOn : Date;
  createdBy : User;
  updatedBy : User;
  noOfDays : number;
  minimumTrainer : number;
  initiateTrainingStatus : Entity;
}

