import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { TraineeAnswerSheet } from '../../../model/trainee-answer-sheet';
import { Trainee } from '../../../model/trainee';
import { Training } from '../../../model/training';
import { Question } from '../../../model/question';
import { User } from 'src/app/views/pages/login/model/user.model';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { Entity } from 'src/app/layouts/baseline/model/entity.model';
@Component({
  selector: 'app-training-test',
  templateUrl: './training-test.component.html',
  styleUrls: ['./training-test.component.scss'],
})
export class TrainingTestComponent implements OnInit {
  name: string;
  userId: any;
  testForm: FormGroup;
  fields: any;
  edit: any;
  options;
  traineeAnsSheet: any[];
  constructor(
    private dataSharing: DataSharingService,
    private fb: FormBuilder,
    private router: Router,
    private clientSideStorage: ClientSideStorageService,
  ) {
    this.edit = this.dataSharing.getGlobalEditData().source;
    if (this.edit._value.length != 0) {
      this.options = this.edit._value.assessmentQuestions;
    }

    this.userId = this.clientSideStorage.get('userId');

    this.fields = {
      type: {
        options: this.options,
      },
    };

    this.testForm = this.fb.group({
      type: this.fb.group({
        options: this.fb.array([]),
      }),
    });
    this.patch();
  }

  patch() {
    const control = <FormArray>this.testForm.get('type.options');
    this.fields.type.options.forEach((x) => {
      control.push(
        this.patchValues(
          x.question,
          x.option1,
          x.option2,
          x.option3,
          x.option4,
          x.questionId
        )
      );
    });
  }

  ngOnInit(): void {}

  submit(value) {
    let traineeAnswerSheet;
    traineeAnswerSheet = this.mapToModelTraineeAnsSheet(value.type.options);
    // this._trainingAssmtService.saveTrainingAssessment(traineeAnswerSheet).subscribe((response) => {
    //   if (response.status === '200') {
    //     this.toast.success({
    //       detail: Constantss.SUCCESS,
    //       summary: response.message,
    //       duration: 10000,
    //     });
    //     this.router.navigate(['/training/trainingAssmt']);
    //   }
    // }, (error) => {
    //   this.toast.error({
    //     detail: 'Error',
    //     summary: error.error,
    //     duration: 10000,
    //   });
    // })
  }

  mapToModelTraineeAnsSheet(data: any) {
    let arr = [];
    data.forEach((data) => {
      let traineeAnswerSheet = new TraineeAnswerSheet();
      let trainee = new Trainee();
      trainee.traineeId = this.edit._value.traineeId;
      traineeAnswerSheet.trainee = trainee;
      let training = new Training();
      training.trainingId = this.edit._value.training.trainingId;
      traineeAnswerSheet.training = training;
      let question = new Question();
      question.questionId = data.questionId;
      traineeAnswerSheet.question = question;
      traineeAnswerSheet.answer = data.answer;
      let createdBy = new User();
      createdBy.userId = this.userId;
      traineeAnswerSheet.createdBy = createdBy;
      let updatedBy = new User();
      updatedBy.userId = this.userId;
      traineeAnswerSheet.updatedBy = updatedBy;
      traineeAnswerSheet.updatedOn = new Date();
      traineeAnswerSheet.createdOn = new Date();
      let entity = new Entity();
      entity.id = 68;
      traineeAnswerSheet.status = entity;
      arr.push(traineeAnswerSheet);
    });
    this.traineeAnsSheet = arr;
    return this.traineeAnsSheet;
  }

  patchValues(question, option1, option2, option3, option4, questionId) {
    return this.fb.group({
      questionId: [questionId],
      question: [question],
      option1: [option1],
      option2: [option2],
      option3: [option3],
      option4: [option4],
      answer: [],
    });
  }

  cancel() {
    this.router.navigate(['/training/trainingAssmt']);
  }
}
