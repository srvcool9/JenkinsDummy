import { User } from "src/app/views/pages/login/model/user.model";
import { District } from "../../configurations/model/manage role model/district.model";
import { School } from "../../configurations/model/manage role model/school.model";
import { Assessment } from "./assessment model/assessment";
import { Group } from "./assessment model/group";
import { Block } from "./block.model";
import { Entity } from "./entity.model";
import { Enumerator } from "./enumerator.model";
import { Verification } from "./verification model/verification";

export class Allocation {
    allocationId:number;
    enumerator= new Enumerator();
    group= new Group();
    assessment=new Assessment();
    classes:String;
    district= new District();
    block= new Block();
    school= new School();
    createdBy: User;
    createdOn:Date;
    updatedBy: number;
    updatedOn: Date;
    classList:[];
    
}
