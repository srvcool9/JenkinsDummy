import { User } from "src/app/views/pages/login/model/user.model";
import { Entity } from "../../baseline/model/entity.model";
import { SectionMaster } from "./section-master";

export class Parameter {
    parameterId: number;
    section: SectionMaster;

    purposeId: Entity;
    typeId: Entity;
    quaterId: Entity;
    parameter: string;
    gradeGroupIds: string;
    visitorRoleIds: string;
    mandatory: boolean;
    status: boolean;
    performanceLevelList: [];
    roleList: [];
    gradeList: Entity[];
    createdBy: User;
    createdOn: Date;
    updatedBy: User;
    updatedOn: Date;
}
