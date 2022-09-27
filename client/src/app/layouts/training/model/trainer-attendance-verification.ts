import { User } from "src/app/views/pages/login/model/user.model";
import { BatchMaster } from "./batch-master";
import { TrainerAttendance } from "./trainer-attendance";
import { TrainerMaster } from "./trainer-master";

export class TrainerAttendanceVerification {
    trainerVerificationId: number;
    trainerAttendance: TrainerAttendance;
    verify: boolean;
    verificationRemark: string;
    rating: number;
    ratingRemark: string;
    createdBy: number;
    createdOn: Date;
    updatedBy: User;
    updatedOn: Date;
    trainer:TrainerMaster;
    batch:BatchMaster;
}
