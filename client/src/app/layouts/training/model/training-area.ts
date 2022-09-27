import { User } from "src/app/views/pages/login/model/user.model";
import { Entity } from "../../baseline/model/entity.model";
import { Training } from "./training";

export class TrainingArea {
    trainingAreaId : number;
    areaId: number;
    training : Training;
    trainingTypeId: Entity;
    createdBy: User;
    trainingArea : Entity;
    status:Entity;
}

