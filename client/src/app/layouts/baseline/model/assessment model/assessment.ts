import { Group } from "./group";
import {Criteria} from "./criteria";
import { Type } from "./type";
import { Mode } from "./mode";
import {Enumerator} from "./enumerator";
import {SchoolType} from './school-type';
import {SchoolLocation} from "./school-location";
import { RoleType } from "src/app/layouts/configurations/model/manage role model/role-type";
import { Entity } from "../entity.model";
import { User } from "src/app/views/pages/login/model/user.model";

export class Assessment {
    assessmentId:number ;
    assessmentName : string;
    description : string;
    group  = new Group();
    criteria =new Entity();
    typeId=new Entity();
    modeId=  new Entity();
    enumerator= new Entity();
    numberOfSchool : number;
    startDate : any;
    endDate : any;
    totalNumberofDays : number;
    classes : Entity[];
    isActive : boolean;
    roleTypeId = new Entity();
    schoolTypeId = new Entity();
    minStudents : number;
    ruralRatio : number;
    urbanRatio : number;
    schoolLocation= new SchoolLocation();
    overallPercent : number;
    updatedBy:User
    updatedOn:Date;
}
