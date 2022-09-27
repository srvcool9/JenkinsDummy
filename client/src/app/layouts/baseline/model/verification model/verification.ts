
import { Bank } from "../bank.model";
import { Entity } from "../entity.model";
import {InstituteDistrict} from "../institute-district.model";
import {Institute} from "../institute.model";
import {Districtcode} from "../districtcode.model";
import {Block} from "../block.model";
import {VerifiedBy} from "src/app/views/pages/model/verified-by"

export class Verification {
    enumeratorId : number;
    enumeratorName : string;
    dateOfBirth : any;
    mobile : number;
    regId : number;
    regDate : Date;
    mobileNumber : string;
    email : string ;
    verifiedBy : VerifiedBy;
    verificationDate : Date;
    verificationStatus : number;
    updatedOn : Date;
    fatherName : string;
    higherQualification : string;
    instituteDistrict : InstituteDistrict;
    institute : Institute;
    grade : number;
    residentialAddress : string;
    district : Districtcode;
    block : Block;
    supportingDocument : string;
    bank : Bank;
    acountHolder : string;
    bankAccountNo : string;
    ifsccode:string;
}
