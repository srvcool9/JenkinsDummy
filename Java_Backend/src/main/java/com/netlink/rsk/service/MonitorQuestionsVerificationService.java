package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.MonitorQuestionsVerification;
import com.netlink.rsk.repository.MonitorQuestionsVerificationRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class MonitorQuestionsVerificationService implements IMonitorQuestionsVerification {

    @Autowired
    private MonitorQuestionsVerificationRepository monitorQuestionsVerificationRepository;
    private static final Logger LOGGER = LogManager.getLogger(MonitorQuestionsVerification.class);
    private String text="Monitor Questions Verification";
    private List<MonitorQuestionsVerification> monitorQuestionsVerificationList;

    @Override
    public Response addUpdateMonitorQuestionsVerification(List<MonitorQuestionsVerification> monitorQuestionsVerifications) {
        if(monitorQuestionsVerifications.isEmpty()==false){
            LOGGER.info("Saving all Monitor Questions verification ....");
            monitorQuestionsVerificationList= new ArrayList<>();
            monitorQuestionsVerificationList= monitorQuestionsVerificationRepository.saveAll(monitorQuestionsVerifications);
        }
        if(monitorQuestionsVerificationList.isEmpty()==false){
            LOGGER.info("All Training Monitor Questions verification saved successfully....");
            return new Response(StaticResponse.SUCCESS_Status, text+StaticResponse.ADD_SUCCESS_MESSAGE, monitorQuestionsVerificationList);
        }else {
            LOGGER.error("Something went wrong! question not saved.");
            return new Response(StaticResponse.FAILURE_Status, StaticResponse.FIELD_MISSING, null);
        }
    }

    @Override
    public Response getMonitorQuestionsVerification(Long trainingId) {
        monitorQuestionsVerificationList= new ArrayList<>();
        LOGGER.info("Training Monitor Questions verification for training id: "+trainingId);
        monitorQuestionsVerificationList=monitorQuestionsVerificationRepository.findByTraining(trainingId);
        if(monitorQuestionsVerificationList.isEmpty()==false){
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.DATA_FETCHED, monitorQuestionsVerificationList);
        }else{
            LOGGER.error("No data found for training id: "+trainingId);
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.NO_DATA, null);
        }
    }


}

