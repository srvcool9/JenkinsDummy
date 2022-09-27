package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.GroupMaster;
import com.netlink.rsk.repository.GroupMasterRepository;
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
public class GroupService implements IGroup{

    private static final Logger LOGGER = LogManager.getLogger(GroupService.class);

    @Autowired
    private GroupMasterRepository groupMasterRepository;

    private  List<GroupMaster> groupMasterList;
    private  String text="Group ";

    @Override
    public Response getGroups(Long id) {
        if(id!=null){
            LOGGER.info("Fetching data for group id...."+id);
            GroupMaster groupMaster= groupMasterRepository.findById(id).get();
            groupMasterList= new ArrayList<>();
            groupMasterList.add(groupMaster);
        }else{
            groupMasterList=new ArrayList<>();
            LOGGER.info("Fetching all data for groups");
            groupMasterList= groupMasterRepository.findAll();
        }

        if(groupMasterList.isEmpty()==true){
            LOGGER.info("No data found for groups");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }
        Collections.sort(groupMasterList);
       // List<GroupMaster> data= sorting(groupMasterList);
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,groupMasterList);
    }

    @Override
    public Response saveGroup(GroupMaster groupMaster) {
        if(groupMaster!=null){
            LOGGER.info("Saving data for group name : "+groupMaster.getGroupName());
            GroupMaster persisted = groupMasterRepository.save(groupMaster);
            groupMasterList=new ArrayList<>();
            groupMasterList.add(persisted);
            if(groupMaster.getGroupId()!=null){
                LOGGER.info("Data saved successfully for group name : "+groupMaster.getGroupName());
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.UPDATE_SUCCESS_MESSAGE,null);
            }else{
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,null);
            }
        }
        else{
            LOGGER.info("No data found for saving...");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }
    private List<GroupMaster> sorting(List<GroupMaster> list) {
        LOGGER.info("Sorting group list....");
        //sorting data by time
        Collections.sort(list, new Comparator<GroupMaster>() {
            @Override
            public int compare(GroupMaster o1, GroupMaster o2) {
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
