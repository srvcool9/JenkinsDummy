import { Injectable } from '@angular/core';
// import * as CryptoJS from 'crypto-js';
import { User } from '../app/views/pages/model/user';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilService {
  userData = new User();

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');
  options = { headers: this.headers };

  constructor(private storageService: SessionStorageService, private router: Router,
    private http: HttpClient) {

  }

  getPosts():Observable<any>{
    return this.http.get("https://jsonplaceholder.typicode.com/posts");
  }

  testApi(data : any):Observable<any>{
    return this.http.post("http://184.168.124.155/api/CommonDropdown",data,this.options);
  }

  testPost(data : any):Observable<any>{
    return this.http.post("https://jsonplaceholder.typicode.com/posts",data);
  }

  // testNavigableMenu(data:any):Observable<any>{
  //   return this.http.post("http://184.168.124.155/User/NavigableMenu",data);
  // }

  /**
  * Function to check input has value or not
  * It checks input for - null,undefined,NaN,empty string (""),0,false
  * If not return --
  * @param moduleName
  */
  isControlAuthorized(moduleName): boolean {

    if (moduleName) {
      this.userData = JSON.parse(this.storageService.retrieve('user'));
      return this.userData.roles.filter(item => item.module.toLocaleLowerCase() === moduleName.toLocaleLowerCase()).filter(item => (item.permission.toLocaleLowerCase() === 'edit')).length !== 0
    }
    return false;
  }

  /**
   * 
   * @param moduleName 
   */
  isUserEditable(moduleName) {
    if (moduleName) {
      var userData = JSON.parse(this.storageService.retrieve('user'));
      var isTenantOwner = userData?.isTenantOwner;
      if(!isTenantOwner) {
        return false;
      }
      return isTenantOwner && this.userData.roles.filter(item => item.module.toLocaleLowerCase() === moduleName.toLocaleLowerCase()).filter(item => (item.permission.toLocaleLowerCase() === 'edit')).length !== 0
    }
    return false;
  }

  /**
* Function to check input has value or not
* It checks input for - null,undefined,NaN,empty string (""),0,false
* If not return --
* @param moduleName
*/
  isControlRestriction(moduleName):boolean {
    let isRestriction: boolean = false;
    if (moduleName) {
      this.userData = JSON.parse(this.storageService.retrieve('user'));
      isRestriction = this.userData.roles.filter(item => item.module.toLocaleLowerCase() === moduleName.toLocaleLowerCase()).filter(item => (item.permission.toLocaleLowerCase() === 'restricted')).length !== 0
      return isRestriction
    }
      return false;
  }
  flag: boolean;
  isUrlAuthenticated() {
    var str = new String(window.location.href);

    var text = '';
    var i = 0;
    for (i = str.length - 1; i >= 0; i--) {
      if (str.charAt(i) == '/') {
        this.isControlRestriction(text.split('').reverse().join(''));
        break;
       

      }

      text += str.charAt(i);
    }
  }

 
  isControlRestrictionAuth1(moduleName): boolean {

    if (moduleName) {
      this.userData = JSON.parse(this.storageService.retrieve('user'));
      

      if (this.userData.roles.filter(item => item.module.toLocaleLowerCase() === moduleName.toLocaleLowerCase()).length == 0) {
        return false
      }

      if ( this.userData.roles.filter(item => item.module.toLocaleLowerCase() === moduleName.toLocaleLowerCase()).filter(item => (item.permission.toLocaleLowerCase() === 'restricted')).length !== 0) {
        return false
      }else if(this.userData.roles.filter(item => item.module.toLocaleLowerCase() === moduleName.toLocaleLowerCase()).filter(item => (item.permission.toLocaleLowerCase() === 'edit')).length !== 0){
        return true
      }else{
        false
      }
  
    }
    return false;
  }


  /**
* Function to check input has value or not
* It checks input for - null,undefined,NaN,empty string (""),0,false
* If not return --
* @param moduleName
*/
isRestrictionAuth: boolean = false;
isControlRestrictionAuth(moduleName): boolean {

  if (moduleName) {
    this.userData = JSON.parse(this.storageService.retrieve('user'));
 
    if (this.userData.roles.filter(item => item.module.toLocaleLowerCase() === moduleName.toLocaleLowerCase()).length == 0) {
      return false
    }
  
    this.isRestrictionAuth = this.userData.roles.filter(item => item.module.toLocaleLowerCase() === moduleName.toLocaleLowerCase()).filter(item => (item.permission.toLocaleLowerCase() === 'restricted')).length == 0
    return this.isRestrictionAuth;

  }
  return false;
}

  isUrlAuthenticatedAuth(url: any): boolean {
    var str = new String(url);
    if (str.charAt(str.length - 1) == '/') {
      return true;
    }

    var text = '';
    var i = 0;
    for (i = str.length - 1; i >= 0; i--) {
      if (str.charAt(i) == '/') {

        return this.isControlRestrictionAuth(text.split('').reverse().join(''));


      }

      text += str.charAt(i);
      
    }
    return false;
  }

  /**
   * Function to check input has value or not
   * It checks input for - null,undefined,NaN,empty string (""),0,false
   * If not return --
   * @param input
   */
  replaceBlankWithHiphen(input) {
    if (!input) {
      return '--';
    } else {
      return input;
    }
  }

  /**
   * Encrypt the input string
   * @param input
   */
  // encrypt(input) {
  //   var wordArray = CryptoJS.enc.Utf8.parse(input);
  //   return CryptoJS.enc.Base64.stringify(wordArray);
  // }
  // /**
  //  * Decrypt the encrypted string
  //  * @param encryptedInput
  //  */
  // decrypt(encryptedInput) {
  //   if (encryptedInput != null && encryptedInput != undefined) {
  //     encryptedInput = encryptedInput.replace('%3D', '=');
  //     var parsedWordArray = CryptoJS.enc.Base64.parse(encryptedInput);
  //     return parsedWordArray.toString(CryptoJS.enc.Utf8);
  //   }
  // }

 
  getColumnHeader(field: string, headerName: string) {
    let obj = {};
    obj['field'] = field;
    obj['headerName'] = headerName;    
    obj['tooltipField'] = field;
    obj['headerTooltip'] = headerName;
    return obj;
  }

  getDefaultColumnDef() {
    return {
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      tooltipShowDelay: 0,
      autoHeight: false,
    }
  }

  getCommaSeparatedFilter() {
    return [
         'contains',
              'notContains',
              'equals',
              'notEqual',
              'startsWith',
              'endsWith',
              {
                displayKey: 'commaSeparated',
                displayName: 'Comma Separated',
                test: (filterValue, cellValue) => {
                  return filterValue.split(/\s*,\s*/).some(function(v) { return v && v.toLowerCase() == cellValue });
                }
              },
                  
              
            ]
  }

  getCommaSeparatedFilterWithSpaces() {
    return [
      {
        displayKey: 'commaSeparated',
        displayName: 'Comma Separated',
        test: (filterValue, cellValue) => {
          return filterValue.includes(cellValue);
        }
      },
              'contains',
              'notContains',
              'equals',
              'notEqual',
              'startsWith',
              'endsWith',
              
            ]
  }

  getFilterButtons(){
    return  {
      buttons: ['cancel', 'clear'],
      closeOnApply: true,
    }
  }

}
