package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.mapper.QuestionListMapper;
import com.netlink.rsk.model.QuestionMaster;
import com.netlink.rsk.model.QuizMaster;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.model.TrainingArea;
import com.netlink.rsk.repository.QuestionMasterRepository;
import com.netlink.rsk.repository.QuizMasterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService implements IQuestion{

    private static final Logger LOGGER = LogManager.getLogger(QuestionService.class);

    private String text="Question";
    private List<QuestionMaster> questionList;

    @Autowired
    private QuestionMasterRepository questionRepository;

    @Autowired
    private QuizMasterRepository quizRepository;

    @Override
    public Response getQuestions(Long quizId) {
        questionList= new ArrayList<>();
        QuizMaster quiz = new QuizMaster();
        quiz.setQuizId(quizId);
        questionList= questionRepository.findByQuizId(quiz);
        if(questionList.isEmpty()!=true){
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED, questionList);
        }else{
            LOGGER.error("No data found");
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }
    }

    @Override
    public Response getQuestionByDay(Long quizId,Integer day) {
        List<QuizMaster> quizList= quizRepository.findByQuizIdAndDay(quizId,day);
        if(quizList.isEmpty()!=true){
            questionList= new ArrayList<>();
            questionList=questionRepository.findAllByQuizIdIn(quizList);
            if(questionList.isEmpty()!=true){
                return new Response(StaticResponse.SUCCESS_Status, StaticResponse.DATA_FETCHED, questionList);
            }else{
                return new Response(StaticResponse.FAILURE_Status, StaticResponse.NO_DATA, null);
            }
        }
        return new Response(StaticResponse.FAILURE_Status, StaticResponse.NO_DATA, null);
    }

    @Override
    public Response saveUpdateQuestion(List<QuestionMaster> questions) {
        questionList= new ArrayList<>();
        if(questions.isEmpty()!=true){
            questions.forEach(question->{
                QuestionMaster persisted= questionRepository.save(question);
                questionList.add(persisted);
            });
            if(questionList.isEmpty()!=true){
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,questionList);
            }else{
                LOGGER.error("Error! No questions saved..");
                return new Response(StaticResponse.FAILURE_Status, StaticResponse.FIELD_MISSING, null);
            }
        }
            LOGGER.error("Error ...No data found. Could not save question! ");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
    }

    @Override
    public Response deleteQuestion(Long id) {
       questionRepository.deleteById(id);
        return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.DELETE_SUCCESS,null);
    }

    @Override
    @Transactional
    public Response getQuestionListByTraining(Long quiz, Long training, Integer day) {
        List<QuestionListMapper> questionList = questionRepository.getUpGetQuestionList(quiz,training,day);
        List<QuestionMaster> questionMasters= new ArrayList<>();
        questionMasters=questionModelMapper(questionList,training);
        if(questionList.isEmpty()!=true){
            return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.DATA_FETCHED,questionMasters);
        }else{
            LOGGER.error("Error! No Data Found..");
            return new Response(StaticResponse.FAILURE_Status, StaticResponse.FIELD_MISSING, null);
        }
    }

   public List<QuestionMaster> questionModelMapper( List<QuestionListMapper> questionListMappers,Long trainingId){
        questionList= new ArrayList<>();
        Boolean valid=null;
        for(QuestionListMapper questionListMapper :questionListMappers){
            QuestionMaster questionMaster = new QuestionMaster();
            QuizMaster quizMaster = new QuizMaster();
            quizMaster.setQuizId(questionListMapper.getQuizId());
            questionMaster.setQuizId(quizMaster);
            valid= setValidity(questionListMappers,trainingId);
            questionMaster.setFormValid(valid);
            questionMaster.setQuestion(questionListMapper.getQuestion());
            questionMaster.setQuestionId(questionListMapper.getQuestionId());
            questionMaster.setAnswer(questionListMapper.getAnswer());
            questionMaster.setOption1(questionListMapper.getOption1());
            questionMaster.setOption2(questionListMapper.getOption2());
            questionMaster.setOption3(questionListMapper.getOption3());
            questionMaster.setOption4(questionListMapper.getOption4());
            questionMaster.setDay(questionListMapper.getDay());
            questionMaster.setQuizTypeId(Long.valueOf(questionListMapper.getQuizTypeId()));
            questionList.add(questionMaster);
        }
        return  questionList;
    }

    public Boolean setValidity(List<QuestionListMapper> questionListMappers,Long trainingId){
        Boolean dayValidity=false;
        Integer numberOfDays=0;
        Training training= new Training();
        training.setTrainingId(trainingId);
        List<QuizMaster> quizMasterList= quizRepository.findByTrainingId(training);
        if(quizMasterList.get(0).getQuizTypeId().getId().equals(56l)){
             numberOfDays=quizMasterList.size();
        }

        List<QuestionListMapper> preResult = new ArrayList<>();
        questionListMappers.forEach(e->{
            if(e.getQuizTypeId().equals("54")){
                preResult.add(e);
            }
        });

        List<QuestionListMapper> postResult = new ArrayList<>();
        questionListMappers.forEach(e->{
            if(e.getQuizTypeId().equals("55")){
                postResult.add(e);
            }
        });

        if(questionListMappers.size()== numberOfDays){
            dayValidity=true;
        }
     if(preResult.isEmpty()==false && postResult.isEmpty()==false){
         return true;
     }else if(dayValidity==true){
         return true;
     }
     else{
      return false;
     }
    }
}
