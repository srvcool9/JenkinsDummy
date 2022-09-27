import { User } from "src/app/views/pages/login/model/user.model";
import { BatchMaster } from "./batch-master";
import { TrainerMaster } from "./trainer-master";

export class TrainerAttendance {
    trainerAttendanceId: number;
    batch: BatchMaster;
    session: string;
    trainerMaster: TrainerMaster;
    attendance: boolean;
    remark: string;
    createdBy: number;
    createdOn: Date;
    updatedBy:User;
    updatedOn:Date;
}
