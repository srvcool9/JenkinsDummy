import { Permission } from "./permission";

export class Module {
    privilegeOrder: number;
    icon:           string;
    id:             number;
    name:           string;
    itemName:       string;
    url:            string;
    permission:     Permission;
    displayOrder:   number;
    children:       Module[];
}
