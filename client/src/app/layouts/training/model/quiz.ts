import { User } from "src/app/views/pages/model/user";
import { Entity } from "../../baseline/model/entity.model";
import { Training } from "./training";

export class Quiz {
    quizId:number;
    day:number;
    noOfQuestions: number;
    trainingId: Training;
    quizTypeId: Entity;
    createdBy: User;
}
