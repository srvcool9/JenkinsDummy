import { UserRole } from "./user-role";
import { Division } from "./division.model";
import { District } from "./district.model";
import { Block } from "./block.model";
import { Cluster } from "./cluster.model";
import { School } from "./school.model";
import { Area } from "./area.model";

export class AddUser {

    userId:number;
    roleId:number;
    roleTypeId:number;
    loginUserId:number;
    area:Array<Area>=[];
}
