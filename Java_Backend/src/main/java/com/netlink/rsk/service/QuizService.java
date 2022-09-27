package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.EntityDTO;
import com.netlink.rsk.dto.QuizDTO;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.QuizMaster;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.repository.QuizMasterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuizService implements IQuiz{

    private static final Logger LOGGER = LogManager.getLogger(QuizService.class);

    @Autowired
    private QuizMasterRepository quizRepository;

    private String text="Quiz";
    private List<QuizMaster> quizList;

    @Override
    public Response getQuizs(Long id) {
        if(id!=null){
            LOGGER.info("Fetching data for quiz id...."+id);
            QuizMaster quiz= quizRepository.findById(id).get();
            quizList= new ArrayList<>();
            quizList.add(quiz);
        }else{
            quizList=new ArrayList<>();
            LOGGER.info("Fetching all data for quizs");
            quizList= quizRepository.findAll();
        }
        if(quizList.isEmpty()==true){
            LOGGER.info("No data found for quizs");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,quizList);
    }

    @Override
    public Response saveUpdateQuiz(QuizMaster quiz) {
        if(quiz!=null){
            LOGGER.info("Saving data for quiz id : "+quiz.getQuizId());
            QuizMaster persisted = quizRepository.save(quiz);
            quizList=new ArrayList<>();
            quizList.add(persisted);
            if(quiz.getQuizId()!=null){
                LOGGER.info("Data saved successfully for quiz");
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.UPDATE_SUCCESS_MESSAGE,quizList);
            }else{
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,quizList);
            }
        }
        else{
            LOGGER.info("No data found for saving...");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }

    @Override
    public Response getQuizListByTraining(Long id) {
        Training training = new Training();
        training.setTrainingId(id);
        quizList = new ArrayList<>();
        quizList= quizRepository.findByTrainingId(training);
       List<QuizDTO> quizDTOList= quizDTOMapper(quizList);
        if(quizList.isEmpty()==true){
            LOGGER.info("No data found for quizs");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,quizDTOList);
    }

    public List<QuizDTO> quizDTOMapper(List<QuizMaster> quizList){
        List<QuizDTO> quizDTOList= new ArrayList<>();
        quizList.stream().forEach(quizMaster -> {
            QuizDTO quizDTO = new QuizDTO();
            quizDTO.setQuizId(quizMaster.getQuizId());
            quizDTO.setNumberOfQuestions(quizMaster.getNoOfQuestions());
            if(quizMaster.getQuizTypeId().getId().equals(54l) ||quizMaster.getQuizTypeId().getId().equals(55l)){
                EntityDTO entityDTO= new EntityDTO();
                entityDTO.setId(1l);
                entityDTO.setName("Pre-Post Test");
                quizDTO.setSelectedQuiz(entityDTO);
            }else{
                EntityDTO entityDTO= new EntityDTO();
                entityDTO.setId(2l);
                entityDTO.setName("Daily");
                quizDTO.setSelectedQuiz(entityDTO);
                quizDTO.setDay(quizMaster.getDay());
            }
            quizDTOList.add(quizDTO);
        });
        return quizDTOList;
    }
}
