package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.CheckListItems;
import com.netlink.rsk.model.CheckListMaster;
import com.netlink.rsk.model.TrainerMaster;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.repository.CheckListItemsRepository;
import com.netlink.rsk.repository.CheckListMasterRepository;
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
public class CheckListService implements ICheckList {

    private static final Logger LOGGER = LogManager.getLogger(CheckListService.class);

    @Autowired
    private CheckListMasterRepository checkListRepository;

    @Autowired
    private CheckListItemsRepository ItemsRepository;

    private List<CheckListMaster> checkListMasterList;
    private  String text="CheckList ";

    @Override
    public Response getCheckList(Long id) {
        if(id!=null){
            LOGGER.info("Fetching data for checklist id...."+id);
            CheckListMaster checkListMaster= checkListRepository.findById(id).get();
            checkListMasterList= new ArrayList<>();
            checkListMasterList.add(checkListMaster);
        }else{
            checkListMasterList=new ArrayList<>();
            LOGGER.info("Fetching all data for checklist");
            checkListMasterList= checkListRepository.findAll();
        }

        if(checkListMasterList.isEmpty()==true){
            LOGGER.info("No data found for checklist");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }
        List<CheckListMaster> data= sorting(checkListMasterList);
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,data);
    }

    @Override
    public Response saveCheckList(List<CheckListMaster> checkList) {
        checkListMasterList=new ArrayList<>();
        if(checkList.isEmpty()==false){
            checkList.forEach(checkListMaster -> {
                LOGGER.info("Saving data for checklist : "+checkListMaster.getCheckListName());
                CheckListMaster persisted = checkListRepository.save(checkListMaster);
                checkListMaster.getCheckListItems().forEach(chi->{
                    chi.setCheckList(persisted);
                    CheckListItems checkListItems = ItemsRepository.save(chi);
                });
                checkListMasterList.add(persisted);
            });
            if(checkListMasterList.isEmpty()==false){
                LOGGER.info("Data saved successfully");
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,checkListMasterList);
            }else{
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,null);
            }
        }
        else{
            LOGGER.info("No data found for saving...");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }

    @Override
    public Response getCheckListByTrainingId(Long trainingId) {
        Training training = new Training();
        training.setTrainingId(trainingId);
        List<CheckListMaster> checkListMasterList = checkListRepository.findByTraining(training);
        if(checkListMasterList.isEmpty()!=true){
            return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.UPDATE_SUCCESS_MESSAGE,checkListMasterList);
        }else{
            return new Response(StaticResponse.FAILURE_Status,text+StaticResponse.NO_DATA,null);
        }
    }

    @Override
    public Response deleteCheckListMaster(Long id) {
        LOGGER.info("Fetching check list items for check list master id: "+id);
        CheckListMaster checkListMaster = checkListRepository.findById(id).get();
        if(checkListMaster!=null && checkListMaster.getCheckListItems().isEmpty()==false){
         checkListMaster.getCheckListItems().forEach(items->{
             LOGGER.info("Deleting items id: "+items.getCheckListItemId()+"of checklist master id: "+id);
             ItemsRepository.deleteById(items.getCheckListItemId());
         });
         checkListRepository.deleteById(id);
        }
        return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.DELETE_SUCCESS,null);
    }

    @Override
    public Response deleteCheckListItem(Long id) {
        LOGGER.info("Deleting checklist items id: "+id);
        ItemsRepository.deleteById(id);
        return new Response(StaticResponse.SUCCESS_Status,"Check list Item removed successfully ",null);
    }


    private List<CheckListMaster> sorting(List<CheckListMaster> list) {
        LOGGER.info("Sorting Checklist....");
        //sorting data by time
        Collections.sort(list, new Comparator<CheckListMaster>() {
            @Override
            public int compare(CheckListMaster o1, CheckListMaster o2) {
                try {
                    String currentDate = LocalDateTime.now().toString();
                    return currentDate.compareTo(o1.getUpdatedOn().toString());
                } catch (Exception e) {
                    e.printStackTrace();
                    return 0;
                }
            }
        });
        return list;
    }
}
