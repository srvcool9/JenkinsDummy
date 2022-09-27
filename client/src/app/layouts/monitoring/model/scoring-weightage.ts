import { User } from "src/app/views/pages/login/model/user.model";

export class ScoringWeightage {
    scoringWeightageId: number;
    academic: number;
    administration: number;
    infrastructure: number;
    overAllWeightage: number;
    createdBy: User;
    createdOn: Date;
    updatedBy: User;
    updatedOn: Date;
}
