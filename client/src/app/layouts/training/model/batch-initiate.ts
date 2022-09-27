import { User } from "src/app/views/pages/login/model/user.model";
import { Entity } from "../../baseline/model/entity.model";
import { EntityMaster } from "./entity-master";
import { Training } from "./training";
import { TrainingArea } from "./training-area";

export class BatchInitiate {
   
    batchinitiateId : number;
    training : Training;
    maxBatchSize : number;
    trainerType:Entity;
    tentitiveParticipants:number;
    noOfRooms:number;
    calculatedBatch:number;
    cycle:number;
    createdBy:User;
    createdOn:Date;
    updatedBy:number;
    updatedOn:Date;
    initiateTrainingStatus : Entity;
    trainingArea:TrainingArea;
}
