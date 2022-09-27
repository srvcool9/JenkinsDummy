package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Parameter;
import com.netlink.rsk.repository.ParameterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParameterService implements IParameterService{

    private static final Logger LOGGER = LogManager.getLogger(ParameterService.class);

    private String text="Parameter";
    private List<Parameter> parameterList;

    @Autowired
    ParameterRepository parameterRepository;

    @Override
    public Response getParameterBySection(Long id) {
        if(id!=null){
            LOGGER.info("Fetching data for section id...."+id);
            parameterList = new ArrayList<>();
            parameterList = parameterRepository.findBySection(id);
        }else{
            LOGGER.info("Fetching all section data");
            parameterList=new ArrayList<>();
            parameterList = parameterRepository.findAll();
        }
        if(parameterList.isEmpty()){
            LOGGER.info("No data found for section");
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }else{
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,parameterList);
        }
    }

    @Override
    public Response saveParameter(Parameter parameter) {
        if(parameter!=null){
            LOGGER.info("Saving data for section  : "+parameter.getSection());
            Parameter persisted = parameterRepository.save(parameter);
            parameterList=new ArrayList<>();
            parameterList.add(persisted);
            if(parameterList.isEmpty()==false){
                LOGGER.info("Data saved successfully for section");
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,parameterList);
            }else{
                return new Response(StaticResponse.FAILURE_Status,text+StaticResponse.ADD_FAIL_MESSAGE,null);
            }
        }
        else{
            LOGGER.info("No data found for saving...");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }

    @Override
    public Response deleteParameter(Long id) {
        if(id!=null){
            parameterRepository.deleteById(id);
            LOGGER.info("Data has been deleted successfully");
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.DELETE_SUCCESS,null);
        }
        LOGGER.info("No data found for deleting...");
        return new Response(StaticResponse.FAILURE_Status, StaticResponse.FIELD_MISSING, null);
    }
}
