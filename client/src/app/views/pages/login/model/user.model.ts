import { UserRole } from "src/app/layouts/configurations/model/manage role model/user-role";
import { Login } from "../../model/login";

export class User {
    userId:string;
    username : string;
    password : string;
    roles:UserRole[];


}
