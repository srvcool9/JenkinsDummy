package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.TrainerBatch;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.repository.BatchMasterRepository;
import com.netlink.rsk.repository.TrainerBatchRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TrainerBatchService implements ITrainerBatch{

    @Autowired
    private TrainerBatchRepository trainerBatchRepository;

    @Autowired
    private BatchMasterRepository batchMasterRepository;

    private static final Logger LOGGER = LogManager.getLogger(TrainerBatchService.class);
    private List<TrainerBatch> trainerBatchList = new ArrayList<>();
    private String text="Trainer Batch";

    @Override
    public Response getTrainerByBatch(Long trainingId,Integer batchNumber) {
        trainerBatchList= new ArrayList<>();
        Training training= new Training();
        training.setTrainingId(trainingId);
       BatchMaster batchMaster= batchMasterRepository.findByTrainingAndBatchNumber(training,batchNumber);
       if(batchMaster!=null){
           trainerBatchList= trainerBatchRepository.findByBatch(batchMaster);
       }
        if(trainerBatchList.isEmpty()==false){
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,trainerBatchList);
        }
        else {
            trainerBatchList= new ArrayList<>();
            TrainerBatch trainerBatch = new TrainerBatch();
            trainerBatch.setBatch(batchMaster);
            trainerBatchList.add(trainerBatch);
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.DATA_FETCHED,trainerBatchList);
        }
    }

    @Override
    public Response getTrainers(Long batchId) {
        BatchMaster batchMaster = new BatchMaster();
        batchMaster.setBatchId(batchId);
        LOGGER.info("Fetching trainers list for batch id: "+batchId);
        trainerBatchList= new ArrayList<>();
        trainerBatchList=trainerBatchRepository.findByBatch(batchMaster);
        if(trainerBatchList.isEmpty()==false){
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,trainerBatchList);
        }
        LOGGER.error("No data found");
        return new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
    }
}
