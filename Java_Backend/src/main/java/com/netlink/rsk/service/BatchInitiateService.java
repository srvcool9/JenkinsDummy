package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchInitiate;
import com.netlink.rsk.model.CheckListItems;
import com.netlink.rsk.model.Trainee;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.repository.BatchInitiateRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BatchInitiateService implements IBatchInitiate {
    private static final Logger LOGGER = LogManager.getLogger(BatchInitiateService.class);

    @Autowired
    private BatchInitiateRepository batchInitiateRepository;

    private List<BatchInitiate> batchInitiateList;
    private String text="BatchInitiate";


    @Override
    public Response getBatchInitiate(Long id) {
        if(id!=null){
            LOGGER.info("Fetching data for Batch Initiate id...."+id);
            BatchInitiate batchInitiate=batchInitiateRepository.findById(id).get();
            batchInitiateList=new ArrayList<>();
            batchInitiateList.add(batchInitiate);
        } else {
            batchInitiateList=new ArrayList<>();
            LOGGER.info("Fetching all data for Batch Initiate");
            batchInitiateList=batchInitiateRepository.findAll();
        }
        if(batchInitiateList.isEmpty()){
            LOGGER.info("No Data Found for Batch Initiate");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }

        //List<batchInitiate> data= sorting(batchInitiateList);
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,batchInitiateList);
    }

    @Override
    public Response saveBatchInitiate(BatchInitiate batchInitiate) throws Exception {
        if(batchInitiate!=null){
            LOGGER.info("saving data for batch Initiate:"+batchInitiate.getBatchinitiateId());
            BatchInitiate persisted = batchInitiateRepository.save(batchInitiate);
            batchInitiateList=new ArrayList<>();
            batchInitiateList.add(persisted);
            if(batchInitiate.getBatchinitiateId()!=null){
                LOGGER.info("Data saved successfully for group name : "+batchInitiate.getBatchinitiateId());
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

    @Override
    public Response getBatchByTrainingId(Long trainingId) {
        batchInitiateList=new ArrayList<>();
        Training training = new Training();
        training.setTrainingId(trainingId);
        LOGGER.info("Fetching data for BatchInitiate for training id: "+trainingId);
        BatchInitiate batchInitiate = batchInitiateRepository.findByTraining(training);
        batchInitiateList.add(batchInitiate);
        if(batchInitiate!=null){
            return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.DATA_FETCHED, batchInitiateList);
        }
        LOGGER.info("No Data found for training id: "+trainingId);
        return new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
    }
}
