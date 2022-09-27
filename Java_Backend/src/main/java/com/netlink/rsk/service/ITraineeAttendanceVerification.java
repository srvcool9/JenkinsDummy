package com.netlink.rsk.service;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TraineeAttendanceVerification;
import java.util.List;

public interface ITraineeAttendanceVerification {
   // public Response getTraineeAttendanceVerification(Long batchId);
    public Response addUpdateTraineeAttendanceVerification(List<TraineeAttendanceVerification> traineeAttendanceList);
}
