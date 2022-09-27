package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.TraineeAttendance;
import com.netlink.rsk.repository.TraineeAttendanceRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
@Service
public class TraineeAttendanceService implements ITraineeAttendance{
    @Autowired
    private TraineeAttendanceRepository traineeAttendanceRepository;

    private static final Logger LOGGER = LogManager.getLogger(TraineeAttendanceService.class);
    private List<TraineeAttendance> traineeAttendanceList;
    private String text="Trainee Attendance";

    @Override
    public Response getTrainees(Long batchId) {
        BatchMaster batchMaster = new BatchMaster();
        batchMaster.setBatchId(batchId);
        LOGGER.info("Fetching trainees attendance for batch id: "+batchId);
        traineeAttendanceList = new ArrayList<>();
        traineeAttendanceList = traineeAttendanceRepository.findByBatch(batchMaster);
        if (traineeAttendanceList.isEmpty() == false) {
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.DATA_FETCHED, traineeAttendanceList);
        } else {
            LOGGER.error("No trainees attendance found for batch id: "+batchId);
            return new Response(StaticResponse.SUCCESS_Status,  StaticResponse.NO_DATA, null);
        }
    }

    @Override
    public Response saveTraineeAttendance(List<TraineeAttendance> traineeAttendances) {
        if(traineeAttendances.isEmpty()==false){
         traineeAttendanceList= new ArrayList<>();
         traineeAttendanceList= traineeAttendanceRepository.saveAll(traineeAttendances);
         if(traineeAttendanceList.isEmpty()==false){
             LOGGER.info("Trainee attendance successfully");
             return new Response(StaticResponse.SUCCESS_Status, text+StaticResponse.ADD_SUCCESS_MESSAGE, traineeAttendanceList);
         }
            LOGGER.error("Attendance not saved");
            return new Response(StaticResponse.FAILURE_Status, text+StaticResponse.ADD_FAIL_MESSAGE, null);
        }
        LOGGER.error("No trainees attendance found for save");
        return new Response(StaticResponse.FAILURE_Status, text+StaticResponse.FIELD_MISSING, null);
    }
}
