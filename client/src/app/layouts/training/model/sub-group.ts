import { User } from "src/app/views/pages/login/model/user.model";
import { Group } from "./group"

export class SubGroup {
    subGroupId: number;
    group: Group;
    description: string;
    subGroupName: string;
    isActive: boolean;
    userId: number;
    createdBy: number;
    createdOn: Date;
    updatedBy: User;
    updatedOn: Date;
}
