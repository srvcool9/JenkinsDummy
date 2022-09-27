package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.TrainerBatch;
import com.netlink.rsk.model.TrainerMaster;
import com.netlink.rsk.repository.BatchMasterRepository;
import com.netlink.rsk.repository.TrainerBatchRepository;
import com.netlink.rsk.repository.TrainerMasterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class TrainerService implements ITrainer{

    private static final Logger LOGGER = LogManager.getLogger(TrainerService.class);

    @Autowired
    private TrainerMasterRepository trainerMasterRepository;

    @Autowired
    private TrainerBatchRepository trainerBatchRepository;
    private List<TrainerMaster> trainerMasterList;
    private String text="Trainer";


    @Override
    public Response getTrainerList(Long id) {
        if(id!=null){
            LOGGER.info("Fetching data for Trainer id...."+id);
            TrainerMaster trainerMaster=trainerMasterRepository.findById(id).get();
            trainerMasterList=new ArrayList<>();
            trainerMasterList.add(trainerMaster);
        } else {
            trainerMasterList=new ArrayList<>();
            LOGGER.info("Fetching all data for Batch ");
            trainerMasterList=trainerMasterRepository.findAll();
        }
        if(trainerMasterList.isEmpty()){
            LOGGER.info("No Data Found for Batch");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }

        //List<batchMaster> data= sorting(batchMasterList);
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,trainerMasterList);
    }

    @Override
    @Transactional
    public Response saveTrainer(List<TrainerMaster> trainerMasters,Long batchId) throws Exception {
        if(trainerMasters.isEmpty()!=true){
            trainerMasterList=new ArrayList<>();
            trainerMasters.forEach(trainerMaster -> {
                LOGGER.info("Saving data for trainer name : "+trainerMaster.getTrainerName());
                TrainerMaster persisted = trainerMasterRepository.save(trainerMaster);
                saveTrainerBatch(persisted,batchId);
                LOGGER.info("Data saved successfully for trainer name : "+persisted.getTrainerName());
                trainerMasterList.add(persisted);
            });
            if(trainerMasterList.isEmpty()==false){
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,trainerMasterList);
            }else{
                return new Response(StaticResponse.FAILURE_Status,text+StaticResponse.FIELD_MISSING,null);
            }
        }
        else{
            LOGGER.info("No data found for saving...");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }

    @Transactional
    public TrainerBatch saveTrainerBatch(TrainerMaster trainerMaster, Long batchId){
        LOGGER.info("Saving batch information of trainer");
        TrainerBatch trainerBatch= new TrainerBatch();
        BatchMaster batchMaster = new BatchMaster();
        batchMaster.setBatchId(batchId);
        trainerBatch.setBatch(batchMaster);
        trainerBatch.setTrainer(trainerMaster);
        trainerBatch.setIsActive(true);
        TrainerBatch persisted=trainerBatchRepository.save(trainerBatch);
        LOGGER.info("Trainer batch saved successfully");
        return persisted;
    }
}
