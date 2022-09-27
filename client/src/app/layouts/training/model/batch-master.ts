import { Time } from "@angular/common";
import { Entity } from "../../baseline/model/entity.model";
import { Training } from "./training";
import { TrainingArea } from "./training-area";

export class BatchMaster {
    batchId : number;
    training : Training;
    trainingArea : TrainingArea;
    batchNumber : number;
    venue : string;
    address : string;
    startDate : any;
    endDate : Date;
    startTime : Time;
    endTime : Time;
    createdBy : number;
    createdOn : Date;
    updatedBy : number;
    updatedOn : Date;
    launchDate : Date;
    launchStatus : Entity;
}
