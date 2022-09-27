import { Bank } from "./bank.model";
import { Entity } from "./entity.model";
import {InstituteDistrict} from "../model/institute-district.model";
import {Institute} from "../model/institute.model";
import {Districtcode} from "../model/districtcode.model";
import {Block} from "../model/block.model";
import { User } from "src/app/views/pages/login/model/user.model";

export class Enumerator {
    enumeratorId:number;
    enumeratorName:string;
    dateOfBirth:Date;
    mobile:string;
    email:string;
    fatherName:string;
    higherQualification:string;
    supportingDocument:string;  
    instituteDistrict= new InstituteDistrict();
    institute= new Institute();
    residentialAddress:string;
    district= new Districtcode();
    block= new Block();
    isActive:boolean;
    verificationStatusId:number;
    verificationStatus:number;
    bank:Bank;
    userId:number;
    acountHolder : string;
    bankAccountNo : string;
    ifsccode:string;
    courseId : number;
    createdBy:User;
    verifiedBy:User;
    createdOn:Date;
}
