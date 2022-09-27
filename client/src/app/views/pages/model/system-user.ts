export class SystemUser {
    constructor(){}
    systemUserId: any;
    username: string;
    password: string;
    oldPassword : string;
    firstName: string;
    lastName: string;
    email: string;
    contact: number;
    imageId: string;
    isActive: boolean;
    isAccountLocked: boolean;
    accountLocked: string;
    accountLockedDate: Date;
    loginAttempt: BigInteger;
    createdDate: Date;
    createdBy: string;
    updatedBy: string;
    updatedDate: Date;
    otpGenerated: string;
    otpGeneratedDate: string;

}

