package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.MonitorQuestions;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.model.TrainingArea;
import com.netlink.rsk.repository.MonitorQuestionsRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MonitorQuestionsService implements IMonitorQuestions {

    @Autowired
    private MonitorQuestionsRepository monitorQuestionsRepository;

    private static final Logger LOGGER = LogManager.getLogger(MonitorQuestionsService.class);
    private String text="Monitor Questions";
    private List<MonitorQuestions> monitorQuestionsList;


    @Override
    public Response addUpdateMonitorQuestions(List<MonitorQuestions> monitorQuestions) {
        if(monitorQuestions.isEmpty()==false){
            LOGGER.info("Saving all monitor questions....");
           monitorQuestionsList= new ArrayList<>();
           monitorQuestionsList= monitorQuestionsRepository.saveAll(monitorQuestions);
        }
        if(monitorQuestionsList.isEmpty()==false){
            LOGGER.info("All monitor questions saved successfully....");
            return new Response(StaticResponse.SUCCESS_Status, text+StaticResponse.ADD_SUCCESS_MESSAGE, monitorQuestionsList);
        }else {
            LOGGER.error("Something went wrong! question not saved.");
            return new Response(StaticResponse.FAILURE_Status, StaticResponse.FIELD_MISSING, null);
        }
    }

    @Override
    public Response getMonitorQues(Long trainingId) {
        Training training= new Training();
        training.setTrainingId(trainingId);
        monitorQuestionsList= new ArrayList<>();
        LOGGER.info("Fetching monitoring questions for training id: "+trainingId);
        monitorQuestionsList=monitorQuestionsRepository.findByTraining(training);
        if(monitorQuestionsList.isEmpty()==false){
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.DATA_FETCHED, monitorQuestionsList);
        }else{
            LOGGER.error("No data found for training id: "+trainingId);
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.NO_DATA, null);
        }
    }

    @Override
    public Response deleteMonitorQues(Long id) {
        monitorQuestionsRepository.deleteById(id);
        LOGGER.info("Question deleted successfully");
        return new Response(StaticResponse.SUCCESS_Status,"Question has been deleted successfully",null);
    }
}
