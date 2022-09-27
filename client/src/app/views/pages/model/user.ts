export class User {
    username: string;
    companyId: number;
    tenantId: number;
    roleId: number;
    systemUserId:number;
    userId: number;
    personaName: string;
    firstName : string;
    lastName : string;
    personaId : number;
    isTenantOwner : boolean;
    roles: [{
        moduleId: number;
        permissionId: number;
        moduleGroup: string;
        module: string;
        permission: string;
        displayOrder: string;
    }]
}