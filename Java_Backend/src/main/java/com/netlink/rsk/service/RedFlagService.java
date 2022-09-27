package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.RedFlag;
import com.netlink.rsk.model.RedFlag;
import com.netlink.rsk.model.RedFlag;
import com.netlink.rsk.repository.TrainerBatchRepository;
import com.netlink.rsk.repository.RedFlagRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RedFlagService implements IRedFlag {
    private static final Logger LOGGER = LogManager.getLogger(RedFlag.class);
    @Autowired
    private RedFlagRepository redFlagRepository;

    private List<RedFlag> redFlagList;
    private String text="Redflag";


    @Override
    public Response saveUpdateRedFlag(RedFlag redFlag) throws Exception {
        if(redFlag!=null){
            LOGGER.info("saving data for Red Flag:"+redFlag.getBatchId());
            RedFlag persisted = redFlagRepository.save(redFlag);
            redFlagList=new ArrayList<>();
            redFlagList.add(persisted);
            if(redFlagList.isEmpty()==false){
                LOGGER.info("Data saved successfully for Red Flag : "+redFlag.getBatchId());
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,redFlagList);
            }else{
                return new Response(StaticResponse.FAILURE_Status,text+StaticResponse.ADD_FAIL_MESSAGE,null);
            }
        }
        else{
            LOGGER.info("No data found for saving...");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }
}
