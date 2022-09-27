import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';
import { Constantss } from 'src/utils/constantss';
// import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { LoginService } from '../login/services/login.service';
import { LoggedinUserData } from './model/loggedin-user-data.model';
// import { SessionStorageService } from 'ngx-webstorage';
// import { CookieService } from 'ngx-cookie-service';
// import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isActive: boolean = true;
  captchaInput: any;
  UserName: String = '';
  Password: String = '';
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  randomString = '';
  rskLogo = '../../../../assets/img/brand/rsk.png';
  bsLogo = '../../../../assets/img/brand/bs_logo.jpeg';
  private token1: string;
  private loggedIn: boolean = false;
  loggedinUserData= new LoggedinUserData();

  constructor(
    private fb: FormBuilder,
    private _loginUser: LoginService,
    private router: Router,
    private toast: NgToastService,
    private dataSharing:DataSharingService,
    private clientStorage: ClientSideStorageService
  ) // private storageService: SessionStorageService,
  // private dataSharing: DataSharingService,
  // private cookieService: CookieService
  {}

  loginForm() {
    this.form = this.fb.group({
      username: [
        this.UserName,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^[A-Za-z0-9]+$'),
        ],
      ],
      password: [
        this.Password,
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9!@#$%^&*]{4,20}$'),
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.loginForm();
    this.generateCaptha();
  }

  generateCaptha(): String {
    for (let i = 0; i < 6; i++) {
      this.randomString += this.characters.charAt(
        Math.floor(Math.random() * this.characters.length)
      );
    }
    return this.randomString;
  }

  refreshCaptcha() {
    this.randomString = '';
    this.generateCaptha();
  }

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  setLoggedIn(loggedIn: boolean, token?: string) {
    this.loggedIn = loggedIn;
    this.token1 = token;
  }

  onSubmit() {
    this.captchaInput = (
      document.getElementById('textBox') as HTMLInputElement
    ).value;

    if (this.captchaInput == this.randomString) {
      document.getElementById('output').innerHTML = ' ';
      this._loginUser.loginUser(this.form.value).subscribe((response) => {
        if (response.jwtToken != undefined) {
          this._loginUser.getJavaToken(response.user.userName).subscribe(res=>{
            if(res!=null){
              this.clientStorage.set('JavaToken',JSON.stringify(res));
            }
          });
          this.token1 = response.jwtToken;
          this.loggedinUserData=response;
          this.setLoggedIn(true, this.token1);
          this.clientStorage.set('loggedInUser',JSON.stringify(response));
          this.clientStorage.set('userId',JSON.stringify(this.loggedinUserData.user.userId));
          this.clientStorage.set('roleId',this.loggedinUserData.user.roles[0].roleId);
          this.clientStorage.set('roleTypeId',this.loggedinUserData.user.roles[0].roleTypeId);
          this.dataSharing.setToken(response);
          const loginStatus = {
            status: this.loggedIn,
            token: this.token1,
          };
          this.clientStorage.set('user', JSON.stringify(loginStatus));
          this.toast.success({
            detail: 'Success',
            summary: 'Login Successfully',
            duration: 5000,
          });
          this.router.navigate(['/dashboard']);
        }
      },
      (httpErrorRes) => {
           this.toast.error({
            detail: Constantss.ERROR,
            summary: 'Incorrect Username or Password',
            duration: 5000,
           })
           this.refreshCaptcha();
           this.password.reset();
          }
      );
    } else if (
      this.captchaInput == null ||
      this.captchaInput == '' ||
      this.captchaInput == undefined
    ) {
      document.getElementById('output').innerHTML = 'Please enter captcha';
    } else if (this.captchaInput != this.randomString) {
      document.getElementById('output').innerHTML =
        'Incorrect captcha, please try again';
    } else {
      this.toast.error({
        detail: 'Error Message',
        summary: 'Incorrect Username & Password. Please contact Super Admin',
        duration: 50000,
      });
      this.refreshCaptcha();
      this.password.reset();
    }
  }

  getJavaToken(userName){
    this._loginUser.getJavaToken(userName).subscribe(res=>{
      if(res!=null){
        this.clientStorage.set('JavaToken',JSON.stringify(res));
      }
    })
  }
  onForgotPwdClick(){
window.location.href="http://www.educationportal.mp.gov.in/Login/Public/RequestPin.aspx";
  }
}
