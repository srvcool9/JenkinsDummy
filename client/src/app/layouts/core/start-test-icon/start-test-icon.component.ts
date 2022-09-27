import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { User } from 'src/app/views/pages/login/model/user.model';
import { Entity } from '../../baseline/model/entity.model';
import { ClientSideStorageService } from '../../shared/services/client-side-storage.service';
import { DataSharingService } from '../../shared/services/data-sharing.service';
import { Question } from '../../training/model/question';
import { Trainee } from '../../training/model/trainee';
import { TraineeAnswerSheet } from '../../training/model/trainee-answer-sheet';
import { Training } from '../../training/model/training';
import { TrainingAssessmentService } from '../../training/services/training-assessment.service';

@Component({
  selector: 'app-start-test-icon',
  templateUrl: './start-test-icon.component.html',
  styleUrls: ['./start-test-icon.component.scss']
})
export class StartTestIconComponent implements ICellRendererAngularComp {

  userId: any;
  public params: any;
  traineeAnsSheet: any[];
  constructor(
    private dataSharing: DataSharingService,
    private router: Router,
    private ngZone: NgZone,
    private _trainingAssmtService: TrainingAssessmentService,
    private clientSideStorage: ClientSideStorageService
  ) { }

  agInit(params: any): void {
    this.params = params;
    this.userId = this.clientSideStorage.get('userId');
  }

  refresh(params?: any): boolean {
    return true;
  }

  navigate(link) {
    this.ngZone.run(() => {
      this.router.navigate([link, this.params.value]);
    });
  }

  onClick($event, link) {
    let traineeAnswerSheet;
    traineeAnswerSheet = this.mapToModelTraineeAnsSheet(this.params.data);
    this._trainingAssmtService.saveTrainingAssessment(traineeAnswerSheet).subscribe((response)=>{
      if(response.status==='200'){
      }
    });
    this.ngZone.run(() => {
      this.router.navigate([link]);
    });
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.dataSharing.setGlobalEditData(this.params.node.data);
      this.params.onClick(params);
    }
  }

  mapToModelTraineeAnsSheet(data) {
    let arr = [];
    let traineeAnswerSheet = new TraineeAnswerSheet();
    traineeAnswerSheet.answer = null;
    let createdBy = new User();
    createdBy.userId = this.userId;
    traineeAnswerSheet.createdBy = createdBy;
    traineeAnswerSheet.createdOn = new Date();
    let trainee = new Trainee();
    trainee.traineeId = data.traineeId;
    traineeAnswerSheet.trainee = trainee;
    let training = new Training();
    training.trainingId = data.training.trainingId;
    traineeAnswerSheet.training = training;
    let updatedBy = new User();
    updatedBy.userId = this.userId;
    traineeAnswerSheet.updatedBy = updatedBy;
    traineeAnswerSheet.updatedOn = new Date();
    let entity = new Entity();
    entity.id = 66;
    traineeAnswerSheet.status = entity;

    arr.push(traineeAnswerSheet);
    this.traineeAnsSheet = arr;
    return this.traineeAnsSheet;
  }

}
