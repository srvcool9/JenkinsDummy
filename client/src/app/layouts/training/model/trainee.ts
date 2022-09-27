import { User } from 'src/app/views/pages/login/model/user.model';
import { EmpCode } from 'src/app/views/pages/model/emp-code';
import { BatchMaster } from './batch-master';

export class Trainee {
  traineeId: number;
  empCode: EmpCode;
  batchId: BatchMaster;
  createdBy: number;
  createdOn: Date;
  updatedBy: number;
  updatedOn: Date;
}
