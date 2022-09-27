package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.EntityMaster;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.repository.BatchMasterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class BatchService implements IBatch{
    private static final Logger LOGGER = LogManager.getLogger(BatchService.class);

    @Autowired
    private BatchMasterRepository batchMasterRepository;

    private List<BatchMaster> batchMasterList;
    private String text="Batch";

    @Override
    public Response getBatchList(Long id) {
        if(id!=null){
            LOGGER.info("Fetching data for Batch id...."+id);
            BatchMaster batchMaster=batchMasterRepository.findById(id).get();
            batchMasterList=new ArrayList<>();
            EntityMaster entityMaster = new EntityMaster();
            entityMaster.setName(batchMaster.getTrainerType().getEntityName());
            entityMaster.setId(batchMaster.getTrainerType().getId());
            batchMaster.setTrainerType(entityMaster);
            batchMasterList.add(batchMaster);
        } else {
            batchMasterList=new ArrayList<>();
            LOGGER.info("Fetching all data for Batch ");
            batchMasterList=batchMasterRepository.findAll();
        }
        if(batchMasterList.isEmpty()){
            LOGGER.info("No Data Found for Batch");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }

        //List<batchMaster> data= sorting(batchMasterList);
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,batchMasterList);
    }

    @Override
    public Response saveBatch(BatchMaster batchMaster) throws Exception {
        if(batchMaster!=null){
            LOGGER.info("saving data for batch Initiate:"+batchMaster.getBatchId());
            BatchMaster persisted = batchMasterRepository.save(batchMaster);
            batchMasterList=new ArrayList<>();
            batchMasterList.add(persisted);
            if(batchMasterList.isEmpty()==false){
                LOGGER.info("Data saved successfully for group name : "+batchMaster.getBatchId());
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,batchMasterList);
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
    public Response getBatchByTraining(Long id) {
     Training training = new Training();
     training.setTrainingId(id);
     batchMasterList= new ArrayList<>();
     batchMasterList= batchMasterRepository.findByTraining(training);
     if(batchMasterList.isEmpty()==false){
         return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.DATA_FETCHED,batchMasterList);
     }else{
         LOGGER.info("No data found for training id: "+id);
         return new Response(StaticResponse.FAILURE_Status,StaticResponse.NO_DATA,null);
     }
    }

    @Override
    @Transactional
    public Response getAllBatches() {
    batchMasterList= new ArrayList<>();
    batchMasterList=batchMasterRepository.getUpBatchList();
        if(batchMasterList.isEmpty()==false){
            return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.DATA_FETCHED,batchMasterList);
        }else{
            LOGGER.info("No data found");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.NO_DATA,null);
        }
    }
}
