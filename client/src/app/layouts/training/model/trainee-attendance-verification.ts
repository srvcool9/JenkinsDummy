import { User } from "src/app/views/pages/login/model/user.model";
import { TraineeAttendance } from "./trainee-attendance";

export class TraineeAttendanceVerification {
 traineeAttendanceId:number;
traineeAttendance:TraineeAttendance;
verify:boolean;
verificationRemark:string;
createdBy:number;
createdOn:Date;
 updatedBy:User;
updatedOn:Date;
}
