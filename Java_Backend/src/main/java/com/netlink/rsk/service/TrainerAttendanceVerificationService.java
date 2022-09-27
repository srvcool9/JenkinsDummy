

package com.netlink.rsk.service;
        import com.netlink.rsk.constants.StaticResponse;
        import com.netlink.rsk.dto.Response;
        import com.netlink.rsk.model.BatchMaster;
        import com.netlink.rsk.model.TrainerAttendance;
        import com.netlink.rsk.model.TrainerAttendanceVerification;
        import com.netlink.rsk.repository.TrainerAttendanceVerificationRepository;
        import org.apache.logging.log4j.LogManager;
        import org.apache.logging.log4j.Logger;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;
        import java.util.ArrayList;
        import java.util.List;

@Service
public class TrainerAttendanceVerificationService implements ITrainerAttendanceVerification {
    @Autowired
    private TrainerAttendanceVerificationRepository trainerAttendanceVerificationRepository;
    private static final Logger LOGGER = LogManager.getLogger(TrainerAttendanceVerification.class);
    private String text="Trainer Attendance Verification";
    private List<TrainerAttendanceVerification> trainerAttendanceVerificationList;

    @Override
    public Response addUpdateTrainerAttendanceVerification(List<TrainerAttendanceVerification> trainerAttendanceVerificationLst) {
        if(trainerAttendanceVerificationLst.isEmpty()==false){
            LOGGER.info("Saving all Training Attendance verification ....");
            trainerAttendanceVerificationList= new ArrayList<>();
            trainerAttendanceVerificationList= trainerAttendanceVerificationRepository.saveAll(trainerAttendanceVerificationLst);
        }
        if(trainerAttendanceVerificationList.isEmpty()==false){
            LOGGER.info("All Training Attendance verification saved successfully....");
            return new Response(StaticResponse.SUCCESS_Status, text+StaticResponse.ADD_SUCCESS_MESSAGE, trainerAttendanceVerificationList);
        }else {
            LOGGER.error("Something went wrong! question not saved.");
            return new Response(StaticResponse.FAILURE_Status, StaticResponse.FIELD_MISSING, null);
        }
    }

//    @Override
//    public Response getTrainerAttendanceVerification(Long batchId) {
//        BatchMaster batch= new BatchMaster();
//        batch.setBatchId(batchId);
//        TrainerAttendance trainerAttendance=new TrainerAttendance();
//        trainerAttendance.setBatch(batch);
//        trainerAttendanceVerificationList= new ArrayList<>();
//        LOGGER.info("Training Attendance verification for batch id: "+batchId);
//        trainerAttendanceVerificationList=trainerAttendanceVerificationRepository.findByTrainerAttendanceId(trainerAttendance);
//        if(trainerAttendanceVerificationList.isEmpty()==false){
//            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.DATA_FETCHED, trainerAttendanceVerificationList);
//        }else{
//            LOGGER.error("No data found for batch id: "+batchId);
//            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.NO_DATA, null);
//        }
//    }
}


