import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService{

 // counter = 1;
  transName:any="";
  transId:String="";
  subjectTransName: BehaviorSubject<any>;
  subjectTransId: BehaviorSubject<String>;
  constructor() {

    this.subjectTransName  = new BehaviorSubject(this.transName);
    this.subjectTransId  = new BehaviorSubject(this.transId);
  }

  nextValue(value:any) {
    this.subjectTransName.next(value);
    
 }

  nextTransId(value:String) {
    this.subjectTransId.next(value);
    
  }
}
