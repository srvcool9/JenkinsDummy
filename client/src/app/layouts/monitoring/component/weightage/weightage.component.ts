import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { Constantss } from 'src/utils/constantss';
import { SectionsService } from '../../service/sections.service';
import { ScoringWeightage } from '../../model/scoring-weightage';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { User } from 'src/app/views/pages/login/model/user.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-weightage',
  templateUrl: './weightage.component.html',
  styleUrls: ['./weightage.component.scss'],
})
export class WeightageComponent implements OnInit {
  scoringWeightageForm: FormGroup;
  colorvariable = false;
  academicCtrl: any = 0;
  adminCtrl: any = 0;
  infraCtrl: any = 0;
  userId: any;
  data: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private confirmationDialogueService: ConfirmationDialogService,
    private _sectionService: SectionsService,
    private clientStorage: ClientSideStorageService,
    private toast: NgToastService
  ) {
    this.createFormAdd();
    this.userId = this.clientStorage.get('userId');
    this._sectionService.getScoringWeightage().subscribe((response) => {
      if (response && response != null) {
        this.data = response.data[0];
        console.log(this.data);
        this.createFormEdit();
      } else {
        this.createFormAdd();
      }
    })
  }

  ngOnInit(): void { }

  createFormAdd() {
    this.scoringWeightageForm = this.fb.group({
      scoringWeightageId: [null],
      academic: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      administraion: ['', [Validators.required]],
      infra: ['', [Validators.required]],
      overallPercent: [],
    });
  }

  createFormEdit() {
    this.scoringWeightageForm = this.fb.group({
      scoringWeightageId: [this.data.scoringWeightageId],
      academic: [
        this.data.academic,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      administraion: [this.data.administration, [Validators.required]],
      infra: [this.data.infrastructure, [Validators.required]],
      overallPercent: [this.data.overAllWeightage],
    });
    if(this.scoringWeightageForm.get('overallPercent').value===100){
      this.colorvariable = true;
    }
  }

  sum() {
    var num = 0;
    var inputFirstNumberValue = (<HTMLInputElement>(
      document.getElementById('input1')
    )).value;
    var inputSecondNumberValue = (<HTMLInputElement>(
      document.getElementById('input2')
    )).value;
    var inputThirdNumberValue = (<HTMLInputElement>(
      document.getElementById('input3')
    )).value;
    if (inputFirstNumberValue == '') {
      inputFirstNumberValue = num.toString();
    }
    if (inputSecondNumberValue == '') {
      inputSecondNumberValue = num.toString();
    }
    if (inputThirdNumberValue == '') {
      inputThirdNumberValue = num.toString();
    }
    var outputs =
      parseFloat(inputFirstNumberValue) +
      parseFloat(inputSecondNumberValue) +
      parseFloat(inputThirdNumberValue);
    if (!isNaN(outputs)) {
      this.scoringWeightageForm.controls['overallPercent'].setValue(outputs);
      this.colorChange(outputs);
    }
  }

  get academic() {
    return this.scoringWeightageForm.get('academic');
  }

  get administraion() {
    return this.scoringWeightageForm.get('administraion');
  }

  get infra() {
    return this.scoringWeightageForm.get('infra');
  }

  colorChange(overall: number) {
    if (overall === 100) {
      this.colorvariable = true;
    } else {
      this.colorvariable = false;
    }
  }

  save() {
    this.confirmationDialogueService.confirm('Confirmation', 'Do you want to save this information ?').then((confirmed) => {
      if (confirmed) {
        let scoringWeightage = new ScoringWeightage();
        scoringWeightage = this.mapToModel(this.scoringWeightageForm.value);
        this._sectionService.saveScoringWeightage(scoringWeightage).subscribe((response) => {
          if (response.status === '200') {
            this.toast.success({
              detail: Constantss.SUCCESS,
              summary: Constantss.SAVED_SUCCESSFULLY,
              duration: 10000,
            });
            this.router.navigate(['/monitoring/sections']);
          }
        }, (error) => {
          this.toast.error({
            detail: 'Error',
            summary: error.error,
            duration: 10000,
          });
        })
      }
    })
  }

  mapToModel(data: any) {
    let scoringWeightage = new ScoringWeightage();
    scoringWeightage.scoringWeightageId = data.scoringWeightageId;
    scoringWeightage.academic = data.academic;
    scoringWeightage.administration = data.administraion;
    scoringWeightage.infrastructure = data.infra;
    scoringWeightage.overAllWeightage = data.overallPercent;
    scoringWeightage.createdOn = new Date();
    scoringWeightage.updatedOn = new Date();
    let user1 = new User();
    user1.userId = this.userId;
    scoringWeightage.createdBy = user1;
    let user2 = new User();
    user2.userId = this.userId;
    scoringWeightage.updatedBy = user2;
    return scoringWeightage;
  }

  cancel() {
    this.confirmationDialogueService
      .confirm(Constantss.CONFIRMATION, Constantss.SURE_CANCEL)
      .then((confirmed) => {
        if (confirmed) {
          this.scoringWeightageForm.reset();
          this.router.navigate(['/monitoring/sections']);
        }
      });
  }
}
