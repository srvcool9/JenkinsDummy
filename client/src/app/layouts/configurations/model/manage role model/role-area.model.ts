import { Block } from "./block.model";
import { Cluster } from "./cluster.model";
import { District } from "./district.model";
import { Division } from "./division.model";
import { School } from "./school.model";

export class RoleArea {
    roleId:number;
    roleTypeName:string;
    roleTypeId:number;
    status:boolean;
    division:Array<Division>;
    district:Array<District>;
    block:Array<Block>;
    cluster:Array<Cluster>;
    school:Array<School>;

}
