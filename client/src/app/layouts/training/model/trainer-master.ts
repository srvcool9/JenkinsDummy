import { User } from 'src/app/views/pages/login/model/user.model';
import { Bank } from '../../baseline/model/bank.model';
import { TrainerBatch } from './trainer-batch';

export class TrainerMaster {
  trainerId: number;
  trainerName: string;
  mobile: string;
  email: string;
  organizationName: string;
  aadharNo: string;
  bankId: Bank;
  IFSCcode: string;
  bankAccountNo: string;
  acountHolder: string;
  trainerBatches: TrainerBatch[];
  createdBy: number;
  createdOn: Date;
  updatedBy: User;
  updatedOn: Date;
}
