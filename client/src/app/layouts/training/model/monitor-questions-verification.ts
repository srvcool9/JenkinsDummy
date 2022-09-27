import { User } from "src/app/views/pages/login/model/user.model";
import { BatchMaster } from "./batch-master";
import { MonitorQuestions } from "./monitor-questions";
import { TrainerMaster } from "./trainer-master";
import { Training } from "./training";

export class MonitorQuestionsVerification {
    questionVerificationId: number;
    monitorQuestions: MonitorQuestions;
    training: Training;
    trainerMaster: TrainerMaster;
    batchMaster: BatchMaster;
    answer: boolean;
    createdBy: number;
    createdOn: Date;
    updatedBy: User;
    updatedOn: Date;
}
