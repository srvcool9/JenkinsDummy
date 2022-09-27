import { Training } from "./training";

export class MonitorQuestions {

    monitorQuestionId: number;
    training: Training;
    question: string;
    createdBy: number;
    createdOn: Date;
    updatedBy: number;
    updatedOn: Date;
}
