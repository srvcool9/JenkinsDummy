package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Parameter;
import com.netlink.rsk.model.TrainerMaster;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.model.TypeMaster;
import com.netlink.rsk.repository.TypeMasterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TypeMasterService implements ITypeMasterService{

    private static final Logger LOGGER = LogManager.getLogger(TypeMasterService.class);

    private List<TypeMaster> typeMasterList;
    private  String text="TypeMaster";

    @Autowired
    TypeMasterRepository typeMasterRepository;

    @Override
    public Response getAllTypes() {
            LOGGER.info("Fetching all TypeMaster");
            typeMasterList=new ArrayList<>();
            typeMasterList = typeMasterRepository.findAll();
        if(typeMasterList.isEmpty()){
            LOGGER.info("No data found for TypeMaster");
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }else{
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,typeMasterList);
        }
    }

    @Override
    public Response saveTypes(List<TypeMaster> typeMasters) {
        typeMasterList = new ArrayList<>();
        if(typeMasters!=null){
            for(TypeMaster typeMaster: typeMasters){
                LOGGER.info("Saving data for type : "+typeMaster.getTypeName());
                TypeMaster persisted = typeMasterRepository.save(typeMaster);
                LOGGER.info("Data saved successfully for Type : "+persisted.getTypeName());
                typeMasterList.add(persisted);
            };
            if(!typeMasterList.isEmpty()){
                LOGGER.info("Data saved successfully for TypeMaster");
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,typeMasterList);
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
