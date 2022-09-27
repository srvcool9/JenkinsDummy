import { User } from 'src/app/views/pages/login/model/user.model';
import { ChecklistMaster } from './checklist-master';

export class CheckListItems {
  checkListItemId: number;
  checkList: ChecklistMaster;
  checkListItemName: string;
  createdBy: number;
  createdOn: Date;
  updatedBy: User;
  updatedOn: Date;
}
