export const constants = {
    port: ':81',
    auth: 'authenticate',
    saveRoleModulePermissiom:'Role/AddUpdateRoleMenuPermission',
    fetchAllRole:'Role/GetRoleList',
    fetchAllRoleType:'Dropdown/GetData/RoleType',
    fetchAllRolePermission:'User/GetMenuforRole',
    testRoleExistence:'Role/RoleExists/',
    fetchEmpDataByEmpCode:'User/GetUserByEmpCode/',
    fetchAllDivision:'dropdown/getdata/division',
    fetchDistrictById:'dropdown/getdata/district/',
    fetchDistrict:'dropdown/getdata/district',
    fetchBlock:'dropdown/getdata/block',
    fetchBlockById:'dropdown/getdata/block/',
    fetchClusterById:'dropdown/getdata/cluster/',
    fetchSchoolById:'dropdown/getdata/school/',
    fetchNavByRoleUserId:'User/GetMenuforRole',
    fetchSchoolByBlock:'Dropdown/GetData/Block-School/',
    saveRoleAssosciation:'Role/AddUpdateRoleAssociation',
    getGroupList : 'Group/GetGroupList',
    postGroupList : 'Group/AddUpdateGroup',
    changeRoleStatus:'Status/ChangeStatus/',
    deleteUserRole:'Delete/DeleteRecord/',
    fetchEntity:'DropDown/GetData/entity/',
    saveUpdateAssesment:"Assessment/AddUpdateAssessment",
    fetchAssessment:"Assessment/GetAssessmentList",
    saveUpdateEnumerator:"Enumerator/AddUpdateEnumerator",
    allDistricts:"District/GetDistrictList",
    allBlocks:"Block/GetBlockList",
    allBanks:"dropdown/getdata/bank",
    allEnumerators:"Enumerator/GetEnumeratorList",
    verifyOtp:"Enumerator/OTPVerification/",
    fetchEnumeratorById:"Enumerator/GetEnumeratorList/",
    fetchNavigationMenu:"User/NavigableMenu",
    fetchjwtToken : "Jwt/JwtToken",
    fetchInstitutionalDistricts : "DropDown/GetData/District/",
    fetchEnumeratorVerification:"Enumerator/EnumeratorVerification/",
    fetchAllIntitutionNames : "Institute/GetInstituteList",
    fetchInstitutionNameById : "Institute/GetInstituteList/",
    fetchBankBranchByIfsc : "Enumerator/GetBranch/",
    assessmentGroups:"Group/GetGroupList",
    groupAssessment:"Assessment/GetAssessmentsByGroup/",
    fetchRolesPermissionByMenu :"Role/GetRolePermissionMenuWise/",
    saveRolesPermissionByMenu : "Role/AddUpdateRolePermission",
    roleArea:"User/GetUserRoleArea/",
    addUpdateAllocation:"Allocation/AddUpdateAllocation",
    allAllocation:"Allocation/GetAllocationList",
    fetchAssessmentByGroupId : "Assessment/GetAssessmentsByGroup/",
    report:"Report/getReport/",
    fetchTrainingGroup:"TrainingGroup/GetTrainingGroupList",
    fetchTrainingSubGroup:"TrainingSubGroup/GetTrainingSubGroupList",
    saveTrainingGroup:"TrainingGroup/AddUpdateTrainingGroup",
    saveTrainingSubGroup:"TrainingSubGroup/AddUpdateTrainingSubGroup",
    fetchSubGroupByGroupId:"TrainingSubGroup/GetSubGroupByGroup/",
    fetchAllTrainingList:"Training/GetTrainingList",
    fetchAllUserRespectiveTraining:"TrainingArea/GetUsersTraining",
    saveTraining:"Training/AddUpdateTraining",
    saevUpdateQuiz:"Quiz/AddUpdateQuiz",
    saveTrainingArea : "TrainingArea/AddUpdateTrainingArea",
    saveUpdateQuestion:"Question/AddUpdateQuestions",
    saveTrainingMaterial:"TrainingMaterial/saveTrainingDocument",
    fetchStateAll : "DropDown/GetData/State/",
    deleteQuestion:"Question/DeleteQuestion/",
    fetchQuestions:"Question/GetQuestionsList/",
    fetchTrainingAreas:"TrainingArea/GetTrainingAreas/",
    getQuizData:"Quiz/GetQuizData/",    
    deleteArea:"TrainingArea/DeleteTrainingArea/",
    saveBatchInitiate:"BatchInitiate/AddUpdateBatchInitiate",
    fetchTrainingCheckList : "TrainingCheckList/GetCheckListData/",
    getAllBatchInitiate:"BatchInitiate/GetBatchInitiate",
    getBatchInitiateById:"BatchInitiate/GetBatchInitiate",
    getAllBatch : "Batch/GetBatchList",
    getBatchById : "Batch/GetBatchList",
    saveBatch : "Batch/AddUpdateBatch",
    saveCoordinator:"Coordinator/AddUpdateCoordinators",
    saveTrainer : "Trainer/AddUpdateTrainer",
    fetchAllTrainingCheckList:"TrainingCheckList/GetCheckList",
    saveCheckList:"TrainingCheckList/AddUpdateCheckList",
    getCoordinator:"Coordinator/GetCoordinator/",
    getBatches:"Batch/GetBatches",
    saveTraineees:"Trainee/AddUpdateTrainees",
    getTrainingMaterial:"TrainingMaterial/GetTrainingMaterials/",
    deleteTrainingMaterial:"TrainingMaterial/DeleteMaterial/",
    getTrainingByArea:"Training/GetTrainingByArea",
    getBatchInitiate:"BatchInitiate/GetBatch/",
    getTrainingBySubGroupId:"Training/GetTrainingBySubGroup",
    getBatchesByTraining:"Batch/GetBatches/",
    saveMonitoringQuestions:"MonitorQuestions/AddUpdateMonitorQuestions",
    generateQRcode:"Batch/generateQRCode/",
    getTrainersByBatchId : "TrainerBatch/GetTrainers",
    getTraineesByBatchId : "Trainee/GetTrainees",
    getTrainerByBatch:"TrainerBatch/GetTrainerList",
    saveTraineeAttendance : "TraineeAttendance/AddUpdateTraineesAttendance",
    saveTrainerAttendance : "Trainerattendance/AddUpdateTrainerAttendance",
    getTrainersByBatchForAttendance  : "TrainerBatch/GetTrainers",
    saveTrainerAttendanceVerification : "Trainerattendanceverification/AddUpdateTrainerAttendanceVerification",
    qrCodeReader:"Batch/readQRCode",
    getMonitorQuestions:"MonitorQuestions/GetMonitorQuestionsList/",
    getTraineeAttendanceListByBatchId : "TraineeAttendance/GetTraineeAttendanceList",
    saveTraineeAttendanceVerification : "Traineeattendanceverification/AddUpdateTraineeAttendanceVerification",
    getTrainerAttendanceByBatchId : "Trainerattendance/GetTrainerAttendance",
    saveRedFlag:"RedFlag/AddUpdateRedFlag",
    getAllTrainingAssessment:"TrainingAnswerSheet/GetTrainingQuestionList",
    saveTrainingAssessment : "TrainingAnswerSheet/addUpdateTrainingAnswerSheet",
    saveMonitorQuestionVerification : "Monitorquestionsverification/AddUpdateMonitorQuestionsVerification",
    getTraineeByEmpCode :  "Trainee/getTrainee",
    saveMonitorComments : "Monitorcomment/AddUpdateMonitorComments",
    saveMonitorPhotos : "MonitorPhotos/uploadMonitorPhotos/",
    getSectionList : "SectionMaster/getSectionList",
    saveSectionMaster : "SectionMaster/AddUpdateSection",
    getJavaToken:"Token/GetToken/",
    getSectionById:"SectionMaster/getSectionList",
    saveScoringWeightage:"ScoringWeightage/AddUpdateScoringWeightage",
    getScoringWeightage:"ScoringWeightage/GetScoringWeightageList",
    deleteCheckListItem:"TrainingCheckList/DeleteCheckListItem/",
    deleteCheckListMaster:"TrainingCheckList/DeleteCheckListMaster/",
    deleteMonitorQues:"MonitorQuestions/DeleteMonitorQues/",
 }
 
 