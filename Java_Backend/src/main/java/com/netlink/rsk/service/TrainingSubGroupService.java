package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TrainingGroupMaster;
import com.netlink.rsk.model.TrainingSubGroupMaster;
import com.netlink.rsk.repository.TrainingSubGroupMasterRepository;
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
public class TrainingSubGroupService implements ITrainingSubGroup{

    private static final Logger LOGGER = LogManager.getLogger(TrainingGroupService.class);

    @Autowired
    private TrainingSubGroupMasterRepository trainingSubGroupMasterRepository;

    private List<TrainingSubGroupMaster> trainingSubGroupMasterList;
    private String text="Sub Group ";

    @Override
    public Response getTrainingSubGroupList(Long id) {
        if(id!=null){
            LOGGER.info("Fetching training sub group, for sub group id "+id);
            trainingSubGroupMasterList = new ArrayList<>();
            TrainingSubGroupMaster trainingSubGroupMaster = trainingSubGroupMasterRepository.findById(id).get();
            trainingSubGroupMasterList.add(trainingSubGroupMaster);
        }else{
            LOGGER.info("Fetching all training sub groups ");
            trainingSubGroupMasterList = new ArrayList<>();
            trainingSubGroupMasterList=trainingSubGroupMasterRepository.findAll();
        }

        if(trainingSubGroupMasterList.isEmpty()==true){
            LOGGER.error("No Training sub groups found! ");
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.NO_DATA, null);
        }

        List<TrainingSubGroupMaster> data = sorting(trainingSubGroupMasterList);
        return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,data);
    }

    @Override
    public Response saveTrainingSubGroup(TrainingSubGroupMaster trainingSubGroupMaster) {
        if(trainingSubGroupMaster!=null){
            TrainingSubGroupMaster persisted = trainingSubGroupMasterRepository.save(trainingSubGroupMaster);
            trainingSubGroupMasterList = new ArrayList<>();
            trainingSubGroupMasterList.add(persisted);
            if(trainingSubGroupMaster.getSubGroupId()!=null){
                LOGGER.info("Updating Training Sub Group Data ....");
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.UPDATE_SUCCESS_MESSAGE,null);
            }else {
                LOGGER.info("Adding training sub group data .....");
                return new Response(StaticResponse.SUCCESS_Status, text+StaticResponse.ADD_SUCCESS_MESSAGE,null);
            }

        }
        else{
            LOGGER.error("Error ...No Data Found ! Could not save Training sub group data! ");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }

    @Override
    public Response getSubGroupByGroup(Long id) {
       TrainingGroupMaster trainingGroupMaster = new TrainingGroupMaster();
       trainingGroupMaster.setGroupId(id);
       List<TrainingSubGroupMaster> trainingSubGroupMasterList = trainingSubGroupMasterRepository.findByGroup(trainingGroupMaster);
       if(trainingSubGroupMasterList.isEmpty()==false){
           LOGGER.info("Fetching sub group by group id "+id);
           return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,
                   trainingSubGroupMasterList);
       }
       else {
           LOGGER.error("Error! No data found!");
           return new Response(StaticResponse.FAILURE_Status, StaticResponse.NO_DATA, null);
       }
       }


    private List<TrainingSubGroupMaster> sorting(List<TrainingSubGroupMaster> list) {
        //sorting data by time
        Collections.sort(list, new Comparator<TrainingSubGroupMaster>() {
            @Override
            public int compare(TrainingSubGroupMaster o1, TrainingSubGroupMaster o2) {
                try {
                    LOGGER.info("Sorting Training Sub Group List...");
                    String currentDate = LocalDateTime.now().toString();
                    return currentDate.compareTo(o1.getUpdatedOn().toString());
                } catch (Exception e) {
                    LOGGER.info("Error in Sorting Training Sub Group List... "+e.getMessage());
                    e.printStackTrace();
                    return 0;
                }
            }
        });
        return list;
    }
}
