import { User } from "src/app/views/pages/login/model/user.model";
import { Entity } from "../../baseline/model/entity.model";
import { Question } from "./question";
import { Trainee } from "./trainee";
import { Training } from "./training";

export class TraineeAnswerSheet {
    traineeAnswerSheetId: number;
    trainee: Trainee;
    training: Training;
    question: Question;
    answer: String;
    createdBy: User;
    createdOn: Date;
    updatedBy: User;
    updatedOn: Date;
    status:Entity;
}
