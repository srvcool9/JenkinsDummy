package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.controller.TrainingAnswerSheetController;
import com.netlink.rsk.dto.*;

import java.text.ParseException;
import java.time.LocalDate;

import com.netlink.rsk.model.*;
import com.netlink.rsk.repository.TraineeAnswerSheetRepository;
import com.netlink.rsk.repository.TraineeRepository;
import com.netlink.rsk.utility.DateUtility;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TraineeService implements ITrainee{

    @Autowired
    private TraineeRepository traineeRepository;

    @Autowired
    private TraineeAnswerSheetRepository answerSheetRepository;

    @Autowired
    private IQuestion questionService;

    private static final Logger LOGGER = LogManager.getLogger(TraineeService.class);
    private List<Trainee> traineeList = new ArrayList<>();
    private String text="Trainees";

    @Override
    public Response saveUpdateTrainee(List<Trainee> trainees) {
        if(trainees.isEmpty()==false){
            traineeList  =new ArrayList<>();
            trainees.forEach(trainee -> {
                LOGGER.info("saving data of trainee for batch id: "+trainee.getBatchId().getBatchId());
                Trainee persisted = traineeRepository.save(trainee);
                LOGGER.info("Data saved successfully trainee id : "+persisted.getTraineeId());
                traineeList.add(persisted);
            });
            if(traineeList.isEmpty()==false){
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,traineeList);
            }else{
                return new Response(StaticResponse.FAILURE_Status,text+StaticResponse.ADD_FAIL_MESSAGE,null);
            }
        }
        else{
            LOGGER.info("No data found for saving...");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }

    @Override
    public Response getTraineesData(Long batchId) {
            LOGGER.info("Fetching trainees data for batch id : "+batchId);
            traineeList= new ArrayList<>();
            BatchMaster batchMaster = new BatchMaster();
            batchMaster.setBatchId(batchId);
            traineeList= traineeRepository.findByBatchId(batchMaster);

        if(traineeList.isEmpty()==true){
            LOGGER.error("No data found...");
            return  new Response(StaticResponse.FAILURE_Status,StaticResponse.NO_DATA,null);
        }
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,traineeList);
    }

    @Override
    public Response getTrainee(String empId) {
        List<TraineeTestQuestions> traineeTestQuestionsList = new ArrayList<>();
        LOGGER.info("Fetching trainee data for employee id : "+empId);
        traineeList= new ArrayList<>();
        EmployeeMaster employeeMaster= new EmployeeMaster();
        employeeMaster.setEmployeeCode(empId);
        traineeList = traineeRepository.findByEmpCode(employeeMaster);
        if(traineeList.isEmpty()==false){
            LOGGER.error("No data found...");
            List<Training> trainingList = new ArrayList<>();
            traineeList.stream().forEach(trainee -> {
                if(trainee.getBatchId().getTraining().getInitiateTrainingStatus().getId()==61){
                    Training trainingData = new Training();
                    trainingData=trainee.getBatchId().getTraining();
                    trainingData.setTraineeId(trainee.getTraineeId());
                    trainingList.add(trainingData);
                }
            });
            if(trainingList.isEmpty()==false){
                traineeTestQuestionsList = getTraineeQuestions(trainingList);
            }

            if(traineeTestQuestionsList.isEmpty()==true){
            return  new Response(StaticResponse.FAILURE_Status,StaticResponse.NO_DATA,null);
            }
        }
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,traineeTestQuestionsList);
    }

    public  List<TraineeTestQuestions> getTraineeQuestions(List<Training> trainingList) {
        List<TraineeTestQuestions> traineeTestQuestionsList = new ArrayList<>();
        trainingList.forEach(training -> {
            TraineeTestQuestions traineeTestQuestion= new TraineeTestQuestions();
            List<QuestionMaster> questionMasterList=getQuestionList(training.getTrainingId());
            if(questionMasterList!=null && questionMasterList.isEmpty()==false){
                try {
                    traineeTestQuestion =setQuestionsList(questionMasterList,training);
                } catch (ParseException e) {
                    throw new RuntimeException(e);
                }
            }
            traineeTestQuestion.setTraineeId(training.getTraineeId());
            Trainee traineeData = new Trainee();
            traineeData.setTraineeId(training.getTraineeId());
            List<TraineeAnswerSheet> traineeAnswerSheetData =  answerSheetRepository.findByTrainingAndTrainee(training,traineeData);
           if(traineeAnswerSheetData.isEmpty()==false){
               traineeTestQuestion.setAttendedQuestions(traineeAnswerSheetData);
               traineeTestQuestion.setStatus(traineeAnswerSheetData.get(0).getStatus());
           }
            TrainingDTO trainingDTO = new TrainingDTO();
            trainingDTO.setTrainingId(training.getTrainingId());
            trainingDTO.setTrainingName(training.getTrainingName());
            traineeTestQuestion.setTraining(trainingDTO);
            traineeTestQuestionsList.add(traineeTestQuestion);
        });
        if(traineeTestQuestionsList.isEmpty()==false){
           return  traineeTestQuestionsList;
        }
        return null;
    }

    public List<QuestionMaster> getQuestionList(Long trainingId){
        Response response = questionService.getQuestionListByTraining(0l,trainingId,0);
        List<QuestionMaster> questionMasterList= (List<QuestionMaster>) response.getData();
        return questionMasterList;
    }

    public TraineeTestQuestions setQuestionsList(List<QuestionMaster> list,Training training) throws ParseException {
        TraineeTestQuestions traineeTestQuestion = new TraineeTestQuestions();
        AssessmentQuestionsDTO assessmentQuestionsDTO = new AssessmentQuestionsDTO();
        traineeTestQuestion.setScheduledDate(training.getStartDate());
        List<QuestionMaster> dailyQuestionList= list.stream().filter(q->
                q.getQuizTypeId().equals(56l)).collect(Collectors.toList());
        if(dailyQuestionList!=null){
            EntityMaster dailyType = new EntityMaster();
            dailyType.setId(56l);
            dailyType.setName("Daily");
            traineeTestQuestion.setTestType(dailyType);
           DailyQuestionDTO dailyQuestionDTO= getDailyQuestions(dailyQuestionList);
           assessmentQuestionsDTO.setDailyQuestionDTO(dailyQuestionDTO);
        }
        List<QuestionMaster> postQuestionList= list.stream().filter(q->
                q.getQuizTypeId().equals(55l)).collect(Collectors.toList());

        if(postQuestionList!=null){
            EntityMaster postType = new EntityMaster();
            postType.setId(55l);
            postType.setName("Post");
            traineeTestQuestion.setTestType(postType);
            assessmentQuestionsDTO.setPostQuestionList(postQuestionList);
        }
        List<QuestionMaster> preQuestionList= list.stream().filter(q->
                q.getQuizTypeId().equals(54l)).collect(Collectors.toList());

        if(preQuestionList!=null){
            EntityMaster preType = new EntityMaster();
            preType.setId(54l);
            preType.setName("Pre");
            traineeTestQuestion.setTestType(preType);
            assessmentQuestionsDTO.setPreQuestionList(preQuestionList);
        }
        traineeTestQuestion.setAssessmentQuestions(assessmentQuestionsDTO);
        return traineeTestQuestion;
    }

    public DailyQuestionDTO getDailyQuestions(List<QuestionMaster> list){
    DailyQuestionDTO dailyQuestionDTO = new DailyQuestionDTO();
        Map<String,List<QuestionMaster>> map = new HashMap<>();
        for(int i=1; i<=31; i++)
        {
            List<QuestionMaster> list1 = new ArrayList<>();
            for(QuestionMaster questionMaster: list){
                if(questionMaster.getDay() == i){
                    list1.add(questionMaster);
                }
            }
            if(list1.isEmpty()==false){
            map.put("Day "+String.valueOf(i),list1);
            }
        }
        dailyQuestionDTO.setDailyQuestion(map);
      return dailyQuestionDTO;
    }
}
