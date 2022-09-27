import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { Bank } from '../../../model/bank.model';
import { Entity } from '../../../model/entity.model';
import { Enumerator } from '../../../model/enumerator.model';
import { Verification } from '../../../model/verification model/verification';
import { RegistrationService } from '../../../service/registration.service';
import { ManageUserService } from '../../../../configurations/service/manage user service/manage-user.service';
import { OtpDetail } from '../../../model/otp-detail.model';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmationDialogService } from 'src/app/layouts/shared/services/confirmation-dialog.service';
import { VerificationCodeConfirmationService } from '../../../../shared/services/verification-code-confirmation.service';
import { InstituteDistrict } from '../../../model/institute-district.model';
import { Institute } from '../../../model/institute.model';
import { Districtcode } from "../../../model/districtcode.model";
import { Block } from "../../../model/block.model";
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { User } from 'src/app/views/pages/login/model/user.model';
import { UserArea } from 'src/app/layouts/configurations/model/manage role model/user-area.model';
import { VerifiedBy } from 'src/app/views/pages/model/verified-by';
import { EmpCode } from 'src/app/views/pages/model/emp-code';
import { LoggedinUserData } from 'src/app/views/pages/login/model/loggedin-user-data.model';
import { formatDate } from '@angular/common';
import { Constantss } from 'src/utils/constantss';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  title: string;
  readonly = false;
  institutionDistricts = [];
  institutionNames = [];
  enumeratorId: number;
  disFile = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  detailsForm: FormGroup;
  showReg = false;
  showVerf = false;
  showVerfiedBy = false;
  localRegistrationPath="http://localhost:4200/#/registration";
  appRegistrationPath="http://184.168.124.155/#/registration"
  districts;
  blocks : Entity[];
  path = window.location.href;
  editData = new Verification();
  districtList: Entity[];
  otpDetail = new OtpDetail();
  bankList: Entity[];
  fileUploadplaceHolder;
  ppm: any;
  branchName = "";
  fileName;
  userData:any;
  userId:string;
  fData = new FormData();
  editDataRes:any;
  constructor(
    private fb: FormBuilder,
    private dataSharing: DataSharingService,
    private router: Router,
    private userService: ManageUserService,
    private registrationService: RegistrationService,
    private toast: NgToastService,
    private confirmationDialogueService: ConfirmationDialogService,
    private verficationCodeService: VerificationCodeConfirmationService,
    private clientStorage:ClientSideStorageService
  ) {
    this.userId=this.clientStorage.get('userId');
    this.createFormAdd();
    if (this.path ===this.appRegistrationPath) {
      this.dataSharing.setGlobalEditData(null);
      this.title = 'Registration Form';
    } else {
      this.title = 'Detail';
    }

    this.editDataRes = this.dataSharing.getGlobalEditData();
    this.editDataRes = this.editDataRes.source._value;
      this.editData = this.editDataRes;
      if (this.editDataRes != null) {
        this.showReg = false;
        this.showVerf = true;
        this.editData.dateOfBirth=this.dateFormattergrid(this.editData.dateOfBirth);
        if(this.editDataRes.verifiedBy===null){
          let verifiedBy = new VerifiedBy();
          let empCode = new EmpCode();
          empCode.employeeName="Super Admin"
          verifiedBy.empCode=empCode;
          this.editData.verifiedBy=verifiedBy;
        }
        this.createFormEdit();

        if (this.editDataRes.verificationStatus ==47) {
          this.showVerfiedBy = true;
          this.showVerf = false;
        }
      } else {
        this.showReg = true;
        this.showVerf = false;
        this.createFormAdd();
      }
    // });
  }

  ngOnInit(): void {
    this.getBanks();
    this.getDistrict();
    this.getInstitutionDistrict();
    this.getInstituitionNames();
  }

  createFormAdd() {
    this.disFile = null;
    this.detailsForm = this.fb.group({
      enumeratorId: [],
      enumeratorName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z ]+$'),
        ],
      ],
      dateOfBirth: ['', [Validators.required]],
      mobile: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      email: ['', [Validators.pattern(this.emailPattern)]],
      fatherName: ['', [Validators.required, Validators.maxLength(50)]],
      higherQualification: [
        '',
        [Validators.required, Validators.maxLength(30)],
      ],
      institutionDistrict: [null, [Validators.required]],
      institutionName: [null],
      grade: ['', [Validators.required, Validators.maxLength(1)]],
      residentialAddress: [
        '',
        [
          Validators.required,
          Validators.maxLength(250),
          Validators.pattern("^[A-Za-z0-9- &@/#.']+$"),
        ],
      ],
      district: [null, [Validators.required]],
      block: [null, [Validators.required]],
      supportingDocument: [this.fileName],
      accountHolderName: [
        '',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z ]+$'),
          Validators.maxLength(50),
        ],
      ],
      bankName: [
        null,
        [
          Validators.required
        ],
      ],
      IFSC: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern('^[A-Za-z]{4}0[A-Z0-9a-z]{6}$'),
        ],
      ],
      accountNumber: ['', [Validators.required]],
    });
  }

  createFormEdit() {
    this.readonly = true;
    this.detailsForm = this.fb.group({
      enumeratorId: [this.editData.enumeratorId],
      enumeratorName: [this.editData.enumeratorName],
      dateOfBirth: [this.editData.dateOfBirth],
      mobile: [this.editData.mobile],
      email: [this.editData.email],
      fatherName: [this.editData.fatherName],
      higherQualification: [this.editData.higherQualification],
      institutionDistrict: [parseInt(this.editData.instituteDistrict.districtId)],
      institutionName: [this.editData.institute.institutonId],
      grade: [this.editData.grade],
      residentialAddress: [this.editData.residentialAddress],
      district: [parseInt(this.editData.district.districtId)],
      block: [parseInt(this.editData.block.blockId)],
      supportingDocument: [this.editData.supportingDocument],
      accountHolderName: [this.editData.acountHolder],
      bankName: [this.editData.bank.bankId],
      IFSC: [this.editData.ifsccode],
      accountNumber: [this.editData.bankAccountNo],
      verifiedBy: [this.editData.verifiedBy.empCode.employeeName],
      verificationDate: [this.editData.updatedOn]
    });
    if (this.editData.district.districtId != null) {
      this.getBlock();
    }
    this.disFile = true;
    this.registrationService.getBankBranchByIfsc(this.editData.ifsccode).subscribe((response)=>{
      if(response.status==='200'){
        this.branchName = response.data[0].branchName;
      }
    })
  }

  get enumeratorName() {
    return this.detailsForm.get('enumeratorName');
  }

  get mobile() {
    return this.detailsForm.get('mobile');
  }

  get email() {
    return this.detailsForm.get('email');
  }

  get fatherName() {
    return this.detailsForm.get('fatherName');
  }

  get higherQualification() {
    return this.detailsForm.get('higherQualification');
  }

  get institutionDistrict() {
    return this.detailsForm.get('institutionDistrict');
  }

  // get institutionName() {
  //   return this.detailsForm.get('institutionName');
  // }

  get grade() {
    return this.detailsForm.get('grade');
  }

  get address() {
    return this.detailsForm.get('residentialAddress');
  }

  get district() {
    return this.detailsForm.get('district');
  }

  get block() {
    return this.detailsForm.get('block');
  }

  get document() {
    return this.detailsForm.get('document');
  }

  get accountHolderName() {
    return this.detailsForm.get('accountHolderName');
  }

  get bankName() {
    return this.detailsForm.get('bankName');
  }

  get IFSC() {
    return this.detailsForm.get('IFSC');
  }
  get accountNumber() {
    return this.detailsForm.get('accountNumber');
  }

  get dateOfBirth() {
    return this.detailsForm.get('dateOfBirth');
  }


  uploadDoc(event: any) {
    let files = event.target.files[0];
    let doctype = files.name.split('.');
    let doctypeName = doctype[doctype.length - 1];
    if (doctypeName && (doctypeName) === "pdf" && files.size <= 2097152) {
      this.fileUploadplaceHolder = "";
      this.fData.append("file", files);
      this.fileName = files.name;
    } else {
      this.toast.info({
        detail: 'Invalid File',
        summary: 'Only pdf file formats with maximum size 2MB are allowed',
        duration: 10000,
      })
      event.target.value = '';
    }

  }


  verify() {
    this.confirmationDialogueService
    .confirm('Confirmation', 'Do you want to verify this information ?')
    .then((confirmed) => {
     if(confirmed){
      let enumId = this.editData.enumeratorId;
      this.userData=JSON.parse(this.clientStorage.get("loggedInUser"));
      this.userId = this.userData.user.userId;
      this.registrationService.verifyEnumerator(enumId, this.userId).subscribe((resp) => {
        if (resp.status === Constantss.SUCCESS) {
          this.toast.success({
            detail: Constantss.SUCCESS,
            summary: resp.message,
            duration: 10000,
          })
          this.router.navigate(['/baseline/verified']);
        } else {
          this.toast.error({
            detail: Constantss.ERROR,
            summary: resp.message,
            duration: 10000,
          })
        }
      })
     }
  })
  }
  cancel() {
    this.confirmationDialogueService.confirm(Constantss.CONFIRMATION,
      Constantss.SURE_CANCEL).then((confirmed) => {
        if (confirmed) {
          this.detailsForm.reset();
        }
      })
  }

  next() {
    let enumerator = new Enumerator();
    enumerator = this.initializeModel(this.detailsForm.value);
    this.ppm = new Blob([JSON.stringify(enumerator)], {
      type: "application/json"
    });
    this.fData.append("enumerator", this.ppm);
    this.registrationService.saveUpdateEnumerator(this.fData).subscribe((res)=>{
      if(res.status!=null && res.status==='200'){
      this.resetFormData();
        if(res.data[0].EnumeratorId && res.data[0].EnumeratorId!=null){
          this.enumeratorId=res.data[0].EnumeratorId;
        }
        this.otpDetail.otp=res.data[0].Otp;
        this.otpDetail.mobile=enumerator.mobile;
        this.otpDetail.enumeratorId=res.data[0].EnumeratorId;
        this.dataSharing.setOTP(this.otpDetail);
        this.verficationCodeService
          .confirm('Verification Code', 'A verification code has been sent to your mobile number ')
          .then((confirmed) => {
            if (confirmed) {
            }
          });
      } else if (res.status == '400') {
        this.toast.info({
          detail: 'Info',
          summary: res.message,
          duration: 10000,
        })
      } else {
        this.toast.error({
          detail: Constantss.ERROR,
          summary: 'Could not save your data',
          duration: 10000,
        })
      }
    })
  }

  resetFormData(){
    this.fData.delete("enumerator");
    this.fData.delete("file"); 
  }

  initializeModel(data: any): Enumerator {
    let enumerator = new Enumerator();
    enumerator.enumeratorId = this.enumeratorId;
    enumerator.enumeratorName = data.enumeratorName;
    enumerator.dateOfBirth = data.dateOfBirth;
    enumerator.mobile = data.mobile;
    enumerator.email = data.email;
    enumerator.fatherName = data.fatherName;
    enumerator.higherQualification = data.higherQualification;
    enumerator.createdOn=new Date();
    
    let instituteDistrict = new InstituteDistrict();
    instituteDistrict.districtId = data.institutionDistrict;
    enumerator.instituteDistrict = instituteDistrict;

    let institute = new Institute();
    institute.institutonId = data.institutionName;
    enumerator.institute = institute;

    enumerator.residentialAddress = data.residentialAddress;

    let district = new Districtcode();
    district.districtId = data.district;
    enumerator.district = district;

    let block = new Block();
    block.blockId = data.block;
    enumerator.block = block;

    enumerator.supportingDocument = data.supportingDocument;

    let bank = new Bank();
    bank.bankId = data.bankName;
    enumerator.bank = bank;

    enumerator.acountHolder = data.accountHolderName;
    enumerator.bankAccountNo = data.accountNumber;
    enumerator.ifsccode = data.IFSC;

    this.otpDetail.enumeratorId = enumerator.enumeratorId;
    this.otpDetail.mobile = enumerator.mobile;

    enumerator.isActive = true;
    enumerator.courseId = 1;
    enumerator.verificationStatus = 46;
    if(enumerator.enumeratorId!=null){
      let user= new User();
      user.userId=this.userId;
      enumerator.verifiedBy=user;
    }
    return enumerator;
  }

  back() {
    this.router.navigate(['/baseline/verified']);
  }

  getDistrict() {
    this.registrationService.fetchDistrict().subscribe((res) => {
      if (res && res.data !== null) {
      this.districtList = res.data;
      }
    });
  }

  getInstitutionDistrict() {
    this.registrationService.getInstitutionDistrict(0).subscribe((res) => {
      if (res && res.data !== null) {
      this.institutionDistricts = res.data;
      }
    });
  }

  getBlock() {
    this.registrationService.fetchBlock().subscribe((resp) => {
      if (resp && resp.data !== null) {
      this.blocks = resp.data;
      }
    });
  }


  seletedDistrict(e) {
    this.userService.getBlockData(e.id).subscribe(res => {
      if (res && res.data !== null) {
      this.blocks = res.data;
      }
    });
  }
  seletedBank($event) {

  }


  selectedInstitutionDistrict(e) {
    this.registrationService.getInstitutionNameById(e.id).subscribe((res) => {
      if (res && res.data !== null) {
      this.institutionNames = res.data;
      }
    });
  }


  getBanks() {
    this.registrationService.getAllBanks().subscribe(res => {
      if (res && res.data !== null) {
      this.bankList = res.data;
      }
    });
  }

  getInstituitionNames() {
    this.registrationService.getInstitutionNames().subscribe((res) => {
      if (res && res.data !== null) {
      this.institutionNames = res.data;
      }
    });
  }

  onIFSCEntered(e) {
    this.registrationService.getBankBranchByIfsc(e.target.value).subscribe((response) => {
      if (response.status === '200') {
        this.toast.success({
          detail: Constantss.SUCCESS,
          summary: response.message,
          duration: 10000,
        })
        this.branchName = response.data[0].branchName;
      } else {
        if (this.IFSC.value.length === 11) {
          this.toast.error({
            detail: Constantss.ERROR,
            summary: response.message,
            duration: 10000
          })
          
        }
        this.branchName = "";
      }
    })
  }

  dateFormattergrid(date:any){
    let formatedDate;
    if (typeof(date)=== "string") {
      const [day, month, year] = date.split('-');
      formatedDate = new Date(+year, +month - 1, +day);
    }
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
   return formatedDate ? formatDate(formatedDate, format, locale) : formatDate(date, format, locale);
  }
}


