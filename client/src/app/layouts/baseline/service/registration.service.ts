import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'angular-slickgrid';
import { UrlFormationService } from '../../shared/services/url-formation.service';
import { OtpDetail } from '../model/otp-detail.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient, private url:UrlFormationService) { }
 
  getAllDistricts():Observable<any>{
   return this.http.get(this.url.fetchInstitutionalDistricts());
  }

  fetchDistrict():Observable<any>{
    return this.http.get(this.url.fetchDistrict());
   }

   fetchBlock():Observable<any>{
    return this.http.get(this.url.fetchBlock());
   }

  fetchDistrictByJava():Observable<any>{
    return this.http.get(this.url.fetchAllDistrictsJava());
  }

  getAllBlocks():Observable<any>{
    return this.http.get(this.url.fetchAllBlocks());
  }

  saveUpdateEnumerator(fdata:FormData):Observable<any>{
   return this.http.post(this.url.saveUpdateEnumerator(),fdata);
  }

  getAllBanks():Observable<any>{
    return this.http.get(this.url.fetchAllBanks());
  }

  getAllEnumerators():Observable<any>{
    return this.http.get(this.url.fetchAllEnumerators());
  }

  otpVerification(otpDetail:OtpDetail):Observable<any>{
    return this.http.get(this.url.verifyOtp().concat(otpDetail.mobile+'/'+otpDetail.otp));
  }

  getEnumeratorsById(id,verificationStatus):Observable<any>{
    return this.http.get(this.url.fetchEnumeratorById().concat(id).concat('/').concat(verificationStatus));
  }

  getInstitutionDistrict(id:any):Observable<any>{
    return this.http.get(this.url.fetchInstitutionalDistricts().concat(id));
  }

  getInstitutionNames():Observable<any>{
    return this.http.get(this.url.fetchAllIntitutionNames());
  }

  getInstitutionNameById(id:any):Observable<any>{
    return this.http.get(this.url.fetchInstitutionNameById().concat(id));
  }

  verifyEnumerator(id:any,userId:any):Observable<any>{
    return this.http.get(this.url.enumeratorVerification().concat(id).concat('/').concat(userId));
  }

  getBankBranchByIfsc(id:any):Observable<any>{
    return this.http.get(this.url.fetchBankBranchByIfsc().concat(id));
  }
}
