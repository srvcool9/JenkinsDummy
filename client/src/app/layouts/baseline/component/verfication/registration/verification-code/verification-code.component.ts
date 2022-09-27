import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { OtpDetail } from 'src/app/layouts/baseline/model/otp-detail.model';
import { RegistrationService } from 'src/app/layouts/baseline/service/registration.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit {

  otpDetail = new OtpDetail();
  mobileNumber;
  asterik = "******";
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  otpForm: FormGroup;

  constructor(private router: Router,
    private activeModal: NgbActiveModal,
    private registrationService: RegistrationService,
    private toast: NgToastService,
    private dataSharing: DataSharingService, private fb: FormBuilder) {
    this.dataSharing.getOTP().subscribe(res => {      
      if (res && res !== null) {
      this.otpDetail = res
      this.otpDetail.otp="1234"
      this.mobileNumber = "+91 "+this.asterik.concat(this.otpDetail.mobile.slice(6,10));
      }
    });
  }

  otpDetailForm() {
    this.otpForm = this.fb.group({
      digit1: [],
      digit2: [],
      digit3: [],
      digit4: []

    });
  }
  ngOnInit(): void {
    this.otpDetailForm();
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }
  
  digitValidate(ele) {
    ele.value = ele.target.value.replace(/[^0-9]/g, '');
  }

  tabChange(val) {
    let ele = document.querySelectorAll('input');
    if (ele[val - 1].value != '') {
      ele[val].focus()
    } else if (ele[val - 1].value == '') {
      ele[val - 2].focus()
    }
  }

  resendOTP(){
    this.dataSharing.getOTP().subscribe(res => {
      if (res && res !== null) {
      this.otpDetail = res
      this.mobileNumber = this.otpDetail.mobile;
      }
    });
  }

  validate() {
    let otp = this.otpForm.value.digit1 + this.otpForm.value.digit2 + this.otpForm.value.digit3 + this.otpForm.value.digit4;
    if (this.otpDetail.otp === otp) {
      this.registrationService.otpVerification(this.otpDetail).subscribe(res => {
        if(res.status==='200'){
         this.router.navigate(['/registration-success']);
         this.accept();
        }
      })
     
    } else {
      this.toast.info({
        detail: 'Incorrect Otp',
        summary: 'Please enter correct Otp',
        duration: 10000,
      })
    }
  }
}
