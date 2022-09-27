import { User } from "src/app/views/pages/login/model/user.model";
import { Training } from "./training";

export class TrainingMaterial {
    trainingId : Training;
    documentName : any;
    documentPath : any;
    linkName : any;
    linkPath : any;
    createdBy : User;
    createdOn : Date;
    updatedBy : User;
    updatedOn : Date;
}
