import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../shared/services/url-formation.service';
import { Allocation } from '../model/allocation.model';

@Injectable({
  providedIn: 'root'
})
export class AllocationService {

  constructor(private http:HttpClient, private url:UrlFormationService) { }

  getAllocationList(): Observable<any> {
    return this.http.get(this.url.getAllAllocationList());
  }

  addUpdateAllocation(allocation: Allocation): Observable<any> {
    return this.http.post(this.url.addUpdateAllocation(), allocation);
  }
 
}
