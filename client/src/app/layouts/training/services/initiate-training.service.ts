import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../shared/services/url-formation.service';

@Injectable({
  providedIn: 'root'
})
export class InitiateTrainingService {

  constructor(private http:HttpClient, private url:UrlFormationService) { }

  saveBatchInitiate(batch:any):Observable<any>{
    return this.http.post(this.url.saveBatchInitiate(),batch);
  }

  getTrainingCheckLis(id:any):Observable<any>{
    return this.http.get(this.url.fetchTrainingCheckList()+id);
  }

  getAllBatchInitiate():Observable<any>{
    return this.http.get(this.url.fetchAllBatchInitiate());
  }

  getBatchInitiateById(id:any):Observable<any>{
    return this.http.get(this.url.fetchAllBatchInitiateById()+"/"+id);
  }

  getAllBatch():Observable<any>{
    return this.http.get(this.url.fetchAllBatch());
  }

  getBatchById(id:any):Observable<any>{
    return this.http.get(this.url.fetchBatchById()+"/"+id);
  }

  saveBatch(batch:any):Observable<any>{
    return this.http.post(this.url.saveBatch(),batch);
  }

  saveCoordinator(coordinators:any):Observable<any>{
    return this.http.post(this.url.saveCoordinator(),coordinators);
  }

  saveTrainer(trainer:any,id:any):Observable<any>{
    return this.http.post(this.url.saveTrainer()+"/"+id,trainer);
  }

  getCoordinator(id:any):Observable<any>{
    return this.http.get(this.url.getCoordinator().concat(id));
  }

  getBatches(trainingId:any):Observable<any>{
    return this.http.get(this.url.getBatches()+"/"+trainingId);
  }
  
  saveTraineees(traineees:any):Observable<any>{
    return this.http.post(this.url.saveTraineees(),traineees);
  }

  getBatchInititate(trainingId:any):Observable<any>{
    return this.http.get(this.url.getBatchInitiate().concat(trainingId));
  }

  getTrainersByBatchId(Id:any):Observable<any>{
    return this.http.get(this.url.getTrainersByBatchId()+"/"+Id);
  }

  getTrainersByBatch(trainingId:any,batchNumber:any):Observable<any>{
    return this.http.get(this.url.getTrainersByBatch()+"/"+trainingId+"/"+batchNumber);
  }

  getTraineesByBatch(batchId:any):Observable<any>{
    return this.http.get(this.url.getTraineesByBatchId()+"/"+batchId);
  }

  saveMonitorQuestionsVerification(monitorQuestionVerification:any):Observable<any>{
    return this.http.post(this.url.saveMonitorQuesVerification(),monitorQuestionVerification);
  }

  saveTrainingArea(trainingArea:any):Observable<any>{
    return this.http.post(this.url.saveTrainingArea(),trainingArea);
  }


}
