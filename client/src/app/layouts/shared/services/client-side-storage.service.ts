import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientSideStorageService {

  constructor() { }

  checkLocalStorageSupport():boolean{
    if(typeof(Storage)!=="undefined"){
      return true;
    }
    return false;
  }

  get(key?:string):any{
    return localStorage.getItem(key);
  }
  set(key :string,value :any):void{
    localStorage.setItem(key,value);
  }

  delete(key :string):void{
    localStorage.removeItem(key);
  }
}

