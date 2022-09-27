import { User } from "src/app/views/pages/login/model/user.model";
import { Entity } from "../../baseline/model/entity.model";
import { Parameter } from "./parameter";

export class SectionMaster {
    sectionId: number;
    section: string;
    description: string;
    purposeId: Entity;
    status: boolean;
    parameterList: Parameter[];
    createdBy: User;
    createdOn: Date;
    updatedBy: User;
    updatedOn: Date;
}
