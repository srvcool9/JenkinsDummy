import { User } from 'src/app/views/pages/login/model/user.model';
import { BatchMaster } from './batch-master';
import { Trainee } from './trainee';

export class TraineeAttendance {
  trainingAttendanceId: number;
  batch: BatchMaster;
  session: String;
  trainee: Trainee;
  attendance: boolean;
  remark: string;
  createdBy: number;
  createdOn: Date;
  updatedBy: User;
  updatedOn: Date;
}
