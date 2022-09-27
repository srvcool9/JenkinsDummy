import { User } from 'src/app/views/pages/login/model/user.model';
import { BatchMaster } from './batch-master';
import { TrainerMaster } from './trainer-master';

export class TrainerBatch {
  trainerBatchId: number;
  trainer: TrainerMaster;
  batch: BatchMaster;
  isActive: boolean;
  createdBy: number;
  createdOn: Date;
  updatedBy: User;
  updatedOn: Date;
}
