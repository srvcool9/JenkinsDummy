package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.QuizMaster;
import com.netlink.rsk.model.ScoringWeightage;
import com.netlink.rsk.model.TraineeAnswerSheet;
import com.netlink.rsk.repository.ScoringWeightageRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ScoringWeightageService implements IScoringWeightage {

    private static final Logger LOGGER = LogManager.getLogger(ScoringWeightageService.class);
    private List<ScoringWeightage> scoringWeightageList;
    private String text="Scoring Weightage data";

    @Autowired
    private ScoringWeightageRepository weightageRepository;

    @Override
    public Response saveUpdateScoringWeightage(ScoringWeightage scoringWeightage) {
        if(scoringWeightage!=null){
            scoringWeightageList= new ArrayList<>();
            ScoringWeightage persisted= weightageRepository.save(scoringWeightage);
            scoringWeightageList.add(persisted);
            if(scoringWeightageList.isEmpty()==false){
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,scoringWeightageList);
            }else{
                return new Response(StaticResponse.FAILURE_Status,text+StaticResponse.ADD_FAIL_MESSAGE,null);
            }
        }
        LOGGER.info("No data found for saving...");
        return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
    }

    @Override
    public Response getScoringWeightage(Long id) {
        if(id!=null){
            LOGGER.info("Fetching data for Scoring weightage id...."+id);
            ScoringWeightage scoringWeightage=weightageRepository.findById(id).get();
            scoringWeightageList= new ArrayList<>();
            scoringWeightageList.add(scoringWeightage);
        }else{
            scoringWeightageList=new ArrayList<>();
            LOGGER.info("Fetching all data of scoring weightage");
            scoringWeightageList= weightageRepository.findAll();
        }
        if(scoringWeightageList.isEmpty()==true){
            LOGGER.info("No data found for scoring weightage");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,scoringWeightageList);
    }


}
