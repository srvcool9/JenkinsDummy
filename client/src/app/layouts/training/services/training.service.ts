import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlFormationService } from '../../shared/services/url-formation.service';
import { Quiz } from '../model/quiz';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http:HttpClient, private url:UrlFormationService) { }


  saveTraining(quiz:Quiz):Observable<any>{
    return this.http.post(this.url.saveUpdateQuiz(),quiz);
  }

  saveQuestions(questions:any):Observable<any>{
    return this.http.post(this.url.saveUpdateQuestion(),questions);
  }

  saveTrainingMaterial(fData:FormData):Observable<any>{
    return this.http.post(this.url.saveTrainingMaterial(),fData);
  }

  deleteQuestion(id:any){
    return this.http.delete(this.url.deleteQuestion().concat(id));
  }

  getQuestionList(quizId,trainingId,day){
    return this.http.get(this.url.getQuestions().concat(quizId+'/'+trainingId+'/'+day));
  }

  getQuizData(trainingId:any){
    return this.http.get(this.url.getQuizData().concat(trainingId));
  }
  deleteTrainingArea(id:any){
    return this.http.delete(this.url.deleteArea().concat(id));
  }

  saveCheckList(checkList:any):Observable<any>{
    return this.http.post(this.url.saveCheckList(),checkList);
  }
  
  getTrainingMaterial(id:any):Observable<any>{
    return this.http.get(this.url.getTrainingMaterial().concat(id));
  }

  deleteMaterial(id:any):Observable<any>{
    return this.http.delete(this.url.deleteTrainingMaterial().concat(id));
  }

  getTrainingCheckList(id:any):Observable<any>{
    return this.http.get(this.url.fetchTrainingCheckList()+id);
  }

  saveMonitoringQuestions(questions:any):Observable<any>{
    return this.http.post(this.url.saveMonitoringQuestions(),questions);
  }

  readQrCode(fdata:FormData):Observable<any>{
    return this.http.post(this.url.QRcodeReader(),fdata);
  }

  getMonitorQuestions(trainingId:any):Observable<any>{
    return this.http.get(this.url.getMonitorQuestions().concat(trainingId));
  }
  
  saveMonitorQuesVerification(monitorQuestion:any):Observable<any>{
    return this.http.post(this.url.saveMonitorQuesVerification(),monitorQuestion);
  }
  


  saveMonitorPhotos(monitorPhotos:any, id:any):Observable<any>{
    return this.http.post(this.url.saveMonitorPhotos().concat(id),monitorPhotos);
  }

  saveMonitorComments(monitorComments:any):Observable<any>{
    return this.http.post(this.url.saveMonitorComments(),monitorComments);
  }

  deleteCheckListItem(id:any):Observable<any>{
    return this.http.delete(this.url.deleteCheckListItem().concat(id));
  }

  deleteCheckListMaster(id:any):Observable<any>{
    return this.http.delete(this.url.deleteCheckListMaster().concat(id));
  }

  deleteMonitorQuestion(id:any):Observable<any>{
    return this.http.delete(this.url.deleteMonitorQuestion().concat(id));
  }


}
