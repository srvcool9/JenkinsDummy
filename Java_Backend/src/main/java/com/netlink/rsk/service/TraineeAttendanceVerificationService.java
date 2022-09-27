package com.netlink.rsk.service;
import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.TraineeAttendance;
import com.netlink.rsk.model.TraineeAttendanceVerification;
import com.netlink.rsk.model.TrainerAttendance;
import com.netlink.rsk.repository.TraineeAttendanceVerificationRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class TraineeAttendanceVerificationService implements ITraineeAttendanceVerification {

    @Autowired
    private TraineeAttendanceVerificationRepository traineeAttendanceVerificationRepository;
    private static final Logger LOGGER = LogManager.getLogger(TraineeAttendanceVerification.class);
    private String text="Trainee Attendance Verification";
    private List<TraineeAttendanceVerification> traineeAttendanceVerificationList;

    @Override
    public Response addUpdateTraineeAttendanceVerification(List<TraineeAttendanceVerification> traineeAttendanceVerifications) {
        if(traineeAttendanceVerifications.isEmpty()==false){
            LOGGER.info("Saving all Training Attendance verification ....");
            traineeAttendanceVerificationList= new ArrayList<>();
            traineeAttendanceVerificationList= traineeAttendanceVerificationRepository.saveAll(traineeAttendanceVerifications);
        }
        if(traineeAttendanceVerificationList.isEmpty()==false){
            LOGGER.info("All Training Attendance verification saved successfully....");
            return new Response(StaticResponse.SUCCESS_Status, text+StaticResponse.ADD_SUCCESS_MESSAGE, traineeAttendanceVerificationList);
        }else {
            LOGGER.error("Something went wrong! question not saved.");
            return new Response(StaticResponse.FAILURE_Status, StaticResponse.FIELD_MISSING, null);
        }
    }

//    @Override
//    public Response getTraineeAttendanceVerification(Long batchId) {
//        BatchMaster batch= new BatchMaster();
//        batch.setBatchId(batchId);
//        TraineeAttendance traineeAttendance=new TraineeAttendance();
//        traineeAttendance.setBatch(batch);
//        traineeAttendanceVerificationList= new ArrayList<>();
//        LOGGER.info("Training Attendance verification for batch id: "+batchId);
//        traineeAttendanceVerificationList=traineeAttendanceVerificationRepository.findByTraineeAttendanceId(traineeAttendance);
//        if(traineeAttendanceVerificationList.isEmpty()==false){
//            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.DATA_FETCHED, traineeAttendanceVerificationList);
//        }else{
//            LOGGER.error("No data found for batch id: "+batchId);
//            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.NO_DATA, null);
//        }
//    }
}


