import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { constants } from '../static/constants';

@Injectable({
  providedIn: 'root',
})
export class UrlFormationService {


  constructor(private http: HttpClient) { }
  alignmentUrl: string = environment.alignmentUrl;
  appLoginUrl: string = environment.commonUrl;
  appJavaLoginUrl: string = environment.javaCommonUrl;
  // java : string = environment.java;
  authenticateUrl: string = environment.authUrl;

  getLoginUrl() {
    return `${this.appLoginUrl}/${constants.auth}`
  }

  saveUserRolePermission() {
    return `${this.appLoginUrl}/${constants.saveRoleModulePermissiom}`;
  }

  fetchAllRole() {
    return `${this.appLoginUrl}/${constants.fetchAllRole}`;
  }

  fetchAllRoleType() {
    return `${this.appLoginUrl}/${constants.fetchAllRoleType}`;
  }

  fetchAllRolePermission() {
    return `${this.appLoginUrl}/${constants.fetchAllRolePermission}`;
  }

  testRoleExistence() {
    return `${this.appLoginUrl}/${constants.testRoleExistence}`;
  }

  fetchEmpByEmpCode() {
    return `${this.appLoginUrl}/${constants.fetchEmpDataByEmpCode}`;
  }

  fetchAllDivision() {
    return `${this.appLoginUrl}/${constants.fetchAllDivision}`;
  }

  fetchDistrictByDivId() {
    return `${this.appLoginUrl}/${constants.fetchDistrictById}`;
  }

  fetchDistrict() {
    return `${this.appLoginUrl}/${constants.fetchDistrict}`;
  }

  fetchBlockById() {
    return `${this.appLoginUrl}/${constants.fetchBlockById}`;
  }

  fetchBlock() {
    return `${this.appLoginUrl}/${constants.fetchBlock}`;
  }


  fetchClusterById() {
    return `${this.appLoginUrl}/${constants.fetchClusterById}`;
  }

  fetchSchoolById() {
    return `${this.appLoginUrl}/${constants.fetchSchoolById}`;
  }

  fetchNavByUserRoleId() {
    return `${this.appLoginUrl}/${constants.fetchNavByRoleUserId}`;
  }

  saveRoleAssosciation() {
    return `${this.appLoginUrl}/${constants.saveRoleAssosciation}`;
  }

  fetchNavigationMenu() {
    return `${this.appLoginUrl}/${constants.fetchNavigationMenu}`;
  }

  fetchjwtToken() {
    return `${this.appLoginUrl}/${constants.fetchjwtToken}`;
  }

  changeRoleStatus() {
    return `${this.appLoginUrl}/${constants.changeRoleStatus}`;
  }

  deleteUserRole() {
    return `${this.appLoginUrl}/${constants.deleteUserRole}`;
  }

  fetchEntityById() {
    return `${this.appLoginUrl}/${constants.fetchEntity}`;
  }


  fetchAllDistricts() {
    return `${this.appJavaLoginUrl}/${constants.allDistricts}`;
  }

  fetchAllBlocks() {
    return `${this.appJavaLoginUrl}/${constants.allBlocks}`;
  }

  fetchAllBanks() {
    return `${this.appLoginUrl}/${constants.allBanks}`;
  }

  fetchRolesPermissionByMenu() {
    return `${this.appLoginUrl}/${constants.fetchRolesPermissionByMenu}`;
  }

  saveRolesPermissionByMenu() {
    return `${this.appLoginUrl}/${constants.saveRolesPermissionByMenu}`;
  }

  fetchStateList() {
    return `${this.appLoginUrl}/${constants.fetchStateAll}`;
  }

  //java

  fetchGroupList() {
    return `${this.appJavaLoginUrl}/${constants.getGroupList}`;
  }

  saveGroup() {
    return `${this.appJavaLoginUrl}/${constants.postGroupList}`;
  }


  saveUpdateAssesment() {
    return `${this.appJavaLoginUrl}/${constants.saveUpdateAssesment}`;
  }

  getAssessment() {
    return `${this.appJavaLoginUrl}/${constants.fetchAssessment}`;
  }

  saveUpdateEnumerator() {
    return `${this.appJavaLoginUrl}/${constants.saveUpdateEnumerator}`;
  }


  fetchAllEnumerators() {
    return `${this.appJavaLoginUrl}/${constants.allEnumerators}`;
  }

  verifyOtp() {
    return `${this.appJavaLoginUrl}/${constants.verifyOtp}`;
  }

  fetchEnumeratorById() {
    return `${this.appJavaLoginUrl}/${constants.fetchEnumeratorById}`;
  }


  enumeratorVerification() {
    return `${this.appLoginUrl}/${constants.fetchEnumeratorVerification}`;
  }

  fetchAllIntitutionNames() {
    return `${this.appJavaLoginUrl}/${constants.fetchAllIntitutionNames}`;
  }

  fetchInstitutionNameById() {
    return `${this.appJavaLoginUrl}/${constants.fetchInstitutionNameById}`;
  }

  fetchBankBranchByIfsc() {
    return `${this.appJavaLoginUrl}/${constants.fetchBankBranchByIfsc}`;
  }


  fetchInstitutionalDistricts() {
    return `${this.appLoginUrl}/${constants.fetchInstitutionalDistricts}`;
  }

  fetchAllDistrictsJava() {
    return `${this.appJavaLoginUrl}/${constants.allDistricts}`;
  }

  fetchAllAssessmentGroups() {
    return `${this.appJavaLoginUrl}/${constants.assessmentGroups}`;
  }

  fetchAssessmentByGroup() {
    return `${this.appJavaLoginUrl}/${constants.groupAssessment}`;
  }

  fetchRoleArea() {
    return `${this.appLoginUrl}/${constants.roleArea}`;
  }

  fetchSchoolByBlockId() {
    return `${this.appLoginUrl}/${constants.fetchSchoolByBlock}`;
  }

  addUpdateAllocation() {
    return `${this.appJavaLoginUrl}/${constants.addUpdateAllocation}`;
  }

  getAllAllocationList() {
    return `${this.appJavaLoginUrl}/${constants.allAllocation}`;
  }

  getAssessmentsByGroupId() {
    return `${this.appJavaLoginUrl}/${constants.fetchAssessmentByGroupId}`;
  }

  getReport() {
    return `${this.appJavaLoginUrl}/${constants.report}`;
  }

  getTrainingGroup() {
    return `${this.appJavaLoginUrl}/${constants.fetchTrainingGroup}`;
  }

  getTrainingSubGroup() {
    return `${this.appJavaLoginUrl}/${constants.fetchTrainingSubGroup}`;
  }

  saveTrainingGroup() {
    return `${this.appJavaLoginUrl}/${constants.saveTrainingGroup}`;
  }

  saveTrainingSubGroup() {
    return `${this.appJavaLoginUrl}/${constants.saveTrainingSubGroup}`;
  }

  fetchSubGroupByGroupId() {
    return `${this.appJavaLoginUrl}/${constants.fetchSubGroupByGroupId}`;
  }

  fetchAllTrainingList() {
    return `${this.appJavaLoginUrl}/${constants.fetchAllTrainingList}`;
  }
  fetchAllUserRespectiveTraining() {
    return `${this.appJavaLoginUrl}/${constants.fetchAllUserRespectiveTraining}`;
  }

  saveTraining() {
    return `${this.appJavaLoginUrl}/${constants.saveTraining}`;
  }

  saveUpdateQuiz() {
    return `${this.appJavaLoginUrl}/${constants.saevUpdateQuiz}`;
  }
  saveTrainingArea() {
    return `${this.appJavaLoginUrl}/${constants.saveTrainingArea}`;
  }

  saveUpdateQuestion() {
    return `${this.appJavaLoginUrl}/${constants.saveUpdateQuestion}`;
  }

  saveTrainingMaterial() {
    return `${this.appJavaLoginUrl}/${constants.saveTrainingMaterial}`;
  }

  fetchTrainingAreas() {
    return `${this.appJavaLoginUrl}/${constants.fetchTrainingAreas}`;
  }

  deleteQuestion() {
    return `${this.appJavaLoginUrl}/${constants.deleteQuestion}`;
  }

  getQuestions() {
    return `${this.appJavaLoginUrl}/${constants.fetchQuestions}`;
  }

  getQuizData() {
    return `${this.appJavaLoginUrl}/${constants.getQuizData}`;
  }
  deleteArea() {
    return `${this.appJavaLoginUrl}/${constants.deleteArea}`;
  }

  saveBatchInitiate() {
    return `${this.appJavaLoginUrl}/${constants.saveBatchInitiate}`;
  }

  fetchTrainingCheckList() {
    return `${this.appJavaLoginUrl}/${constants.fetchTrainingCheckList}`;
  }

  fetchAllBatchInitiate() {
    return `${this.appJavaLoginUrl}/${constants.getAllBatchInitiate}`;
  }

  fetchAllBatchInitiateById() {
    return `${this.appJavaLoginUrl}/${constants.getBatchInitiateById}`;
  }

  fetchAllBatch() {
    return `${this.appJavaLoginUrl}/${constants.getAllBatch}`;
  }

  fetchBatchById() {
    return `${this.appJavaLoginUrl}/${constants.getBatchById}`;
  }

  saveBatch() {
    return `${this.appJavaLoginUrl}/${constants.saveBatch}`;
  }

  saveCoordinator() {
    return `${this.appJavaLoginUrl}/${constants.saveCoordinator}`;
  }

  saveTrainer() {
    return `${this.appJavaLoginUrl}/${constants.saveTrainer}`;
  }

  saveCheckList() {
    return `${this.appJavaLoginUrl}/${constants.saveCheckList}`;
  }

  saveMonitoringQuestions() {
    return `${this.appJavaLoginUrl}/${constants.saveMonitoringQuestions}`;
  }

  getCoordinator() {
    return `${this.appJavaLoginUrl}/${constants.getCoordinator}`;
  }

  getBatches() {
    return `${this.appJavaLoginUrl}/${constants.getBatches}`;
  }

  saveTraineees() {
    return `${this.appJavaLoginUrl}/${constants.saveTraineees}`;
  }

  getTrainingMaterial() {
    return `${this.appJavaLoginUrl}/${constants.getTrainingMaterial}`;
  }

  deleteTrainingMaterial() {
    return `${this.appJavaLoginUrl}/${constants.deleteTrainingMaterial}`;
  }

  getTrainingByArea() {
    return `${this.appJavaLoginUrl}/${constants.getTrainingByArea}`;

  }

  getBatchInitiate() {
    return `${this.appJavaLoginUrl}/${constants.getBatchInitiate}`;
  }

  getTrainingBySubGroupId() {
    return `${this.appJavaLoginUrl}/${constants.getTrainingBySubGroupId}`;
  }

  getBatchesByTraining() {
    return `${this.appJavaLoginUrl}/${constants.getBatchesByTraining}`;
  }

  generateQRcode() {
    return `${this.appJavaLoginUrl}/${constants.generateQRcode}`;
  }

  getBatchInfo() {
    return `${this.appJavaLoginUrl}/${constants.generateQRcode}`;
  }
  getTrainersByBatchId() {
    return `${this.appJavaLoginUrl}/${constants.getTrainersByBatchId}`;
  }

  getTraineesByBatchId() {
    return `${this.appJavaLoginUrl}/${constants.getTraineesByBatchId}`;
  }

  getTrainersByBatch() {
    return `${this.appJavaLoginUrl}/${constants.getTrainerByBatch}`;
  }

  saveTraineeAttendance() {
    return `${this.appJavaLoginUrl}/${constants.saveTraineeAttendance}`;
  }

  saveTrainerAttendance() {
    return `${this.appJavaLoginUrl}/${constants.saveTrainerAttendance}`;
  }

  getTrainersByBatchForAttendance() {
    return `${this.appJavaLoginUrl}/${constants.getTrainersByBatchForAttendance}`;
  }

  saveTrainerAttendanceVerification() {
    return `${this.appJavaLoginUrl}/${constants.saveTrainerAttendanceVerification}`;
  }

  QRcodeReader() {
    return `${this.appJavaLoginUrl}/${constants.qrCodeReader}`;
  }

  getMonitorQuestions() {
    return `${this.appJavaLoginUrl}/${constants.getMonitorQuestions}`;
  }

  getTraineeAttendaceListByBatchId() {
    return `${this.appJavaLoginUrl}/${constants.getTraineeAttendanceListByBatchId}`;
  }

  saveTraineeAttendanceVerification() {
    return `${this.appJavaLoginUrl}/${constants.saveTraineeAttendanceVerification}`;
  }

  getTrainerAttendanceByBatchId() {
    return `${this.appJavaLoginUrl}/${constants.getTrainerAttendanceByBatchId}`;
  }

  saveRedFlag(){
    return `${this.appJavaLoginUrl}/${constants.saveRedFlag}`;
  }

  saveMonitorQuesVerification(){
    return `${this.appJavaLoginUrl}/${constants.saveMonitorQuestionVerification}`;
  }

  getAllTrainingAssessment(){
    return `${this.appJavaLoginUrl}/${constants.getAllTrainingAssessment}`;
  }

  saveTrainingAssessment(){
    return `${this.appJavaLoginUrl}/${constants.saveTrainingAssessment}`;
  }

  saveMonitorComments(){
    return `${this.appJavaLoginUrl}/${constants.saveMonitorComments}`;
  }

  saveMonitorPhotos(){
    return `${this.appJavaLoginUrl}/${constants.saveMonitorPhotos}`;
  }
  getTraineeByEmpCode(){
    return `${this.appJavaLoginUrl}/${constants.getTraineeByEmpCode}`;
  }

  getSectionList(){
    return `${this.appJavaLoginUrl}/${constants.getSectionList}`;
  }

  saveSectionMaster(){
    return `${this.appJavaLoginUrl}/${constants.saveSectionMaster}`;
  }

  getJavaToken(){
    return `${this.appJavaLoginUrl}/${constants.getJavaToken}`;
  }

  getSectionById(){
    return `${this.appJavaLoginUrl}/${constants.getSectionById}`;
  }

  saveScoringWeightage(){
    return `${this.appJavaLoginUrl}/${constants.saveScoringWeightage}`;
  }
  deleteCheckListItem(){
    return `${this.appJavaLoginUrl}/${constants.deleteCheckListItem}`;
  }
  deleteCheckListMaster(){
    return `${this.appJavaLoginUrl}/${constants.deleteCheckListMaster}`;
  }
  deleteMonitorQuestion(){
    return `${this.appJavaLoginUrl}/${constants.deleteMonitorQues}`;
  }
  getScoringWeightage(){
    return `${this.appJavaLoginUrl}/${constants.getScoringWeightage}`;
  }

}


