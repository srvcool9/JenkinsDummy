import { CheckListItems } from './check-list-items';
import { Training } from './training';

export class ChecklistMaster {
  checkListId: number;
  training: Training;
  checkListName: string;
  createdBy: number;
  createdOn: Date;
  updatedBy: number;
  updatedOn: Date;
  checkListItems: CheckListItems[];
}
