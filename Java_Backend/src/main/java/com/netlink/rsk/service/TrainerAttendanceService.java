package com.netlink.rsk.service;
import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.TrainerAttendance;
import com.netlink.rsk.repository.TrainerAttendanceRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class TrainerAttendanceService implements ITrainerAttendance {

    @Autowired
    private TrainerAttendanceRepository trainerAttendanceRepository;
    private static final Logger LOGGER = LogManager.getLogger(TrainerAttendanceService.class);
    private String text="Trainer Attendance";
    private List<TrainerAttendance> trainerAttendanceList;

    @Override
    public Response addUpdateTrainerAttendance(List<TrainerAttendance> trainerAttendances) {
        if(trainerAttendances.isEmpty()==false) {
            LOGGER.info("Saving all Training Attendance....");
            trainerAttendanceList = new ArrayList<>();
            trainerAttendanceList = trainerAttendanceRepository.saveAll(trainerAttendances);
            if (trainerAttendanceList.isEmpty() == false) {
                LOGGER.info("All Training Attendance saved successfully....");
                return new Response(StaticResponse.SUCCESS_Status, text + StaticResponse.ADD_SUCCESS_MESSAGE, trainerAttendanceList);
            }
                LOGGER.error("Something went wrong! question not saved.");
                return new Response(StaticResponse.FAILURE_Status, StaticResponse.FIELD_MISSING, null);

        }
        return new Response(StaticResponse.FAILURE_Status, StaticResponse.NO_DATA, null);
    }

    @Override
    public Response getTrainerAttendance(Long batchId) {
        BatchMaster batch= new BatchMaster();
        batch.setBatchId(batchId);
        trainerAttendanceList= new ArrayList<>();
        LOGGER.info("Training Attendance for batch id: "+batchId);
        trainerAttendanceList=trainerAttendanceRepository.findByBatch(batch);
        if(trainerAttendanceList.isEmpty()==false){
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.DATA_FETCHED, trainerAttendanceList);
        }else{
            LOGGER.error("No data found for batch id: "+batchId);
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.NO_DATA, null);
        }
    }
}

