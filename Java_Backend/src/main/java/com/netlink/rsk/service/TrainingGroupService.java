package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TrainingGroupMaster;
import com.netlink.rsk.repository.TrainingGroupMasterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class TrainingGroupService implements ITrainingGroup {

    private static final Logger LOGGER = LogManager.getLogger(TrainingGroupService.class);

    @Autowired
    private TrainingGroupMasterRepository trainingGroupRepository;

    private List<TrainingGroupMaster> trainingGroupMasterList;
    private  String text="Training Group ";

    @Override
    public Response getTrainingGroups(Long id) {
        if(id!=null){
            LOGGER.info("Fetching training group for id:  "+id);
            TrainingGroupMaster trainingGroupMaster = trainingGroupRepository.findById(id).get();
            trainingGroupMasterList = new ArrayList<>();
            trainingGroupMasterList.add(trainingGroupMaster);
        }else{
            LOGGER.info("Fetching all training groups");
            trainingGroupMasterList = new ArrayList<>();
            trainingGroupMasterList = trainingGroupRepository.findAll();
        }

        if(trainingGroupMasterList.isEmpty()==true){
            LOGGER.error("No training groups data found");
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }

        List<TrainingGroupMaster> data = sorting(trainingGroupMasterList);
        return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED, data);
    }

    @Override
    public Response saveTrainingGroups(TrainingGroupMaster trainingGroupMaster) {
        if(trainingGroupMaster!=null){
            TrainingGroupMaster persisted = trainingGroupRepository.save(trainingGroupMaster);
            trainingGroupMasterList = new ArrayList<>();
            trainingGroupMasterList.add(persisted);
            if(trainingGroupMaster.getGroupId()!=null){
                LOGGER.info("Updating Training Group Data ....");
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.UPDATE_SUCCESS_MESSAGE,null);
            }else{
                LOGGER.info("Adding Training Group Data....");
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,null);
            }
        }
        else{
            LOGGER.error("Error ...No Data Found ! Could not save Training group data! ");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }


    private List<TrainingGroupMaster> sorting(List<TrainingGroupMaster> list) {
        Collections.sort(list, new Comparator<TrainingGroupMaster>() {
            @Override
            public int compare(TrainingGroupMaster o1, TrainingGroupMaster o2) {
                try {
                    LOGGER.info("Sorting Training Group List...");
                    String currentDate = LocalDateTime.now().toString();
                    return currentDate.compareTo(o1.getUpdatedOn().toString());
                } catch (Exception e) {
                    LOGGER.error("Error (in sorting training group list....)"+" "+e.getMessage());
                    e.printStackTrace();
                    return 0;
                }
            }
        });
        return list;
    }
}
