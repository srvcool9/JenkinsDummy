import { User } from "src/app/views/pages/model/user";
import { Quiz } from "./quiz";

export class Question {
    questionId:number;
    quizId:Quiz;
    displayOrder:number;
    question:string;
    option1:string;
    option2:string;
    option3:string;
    option4:string;
    answer:string;
    createdBy:User
}
