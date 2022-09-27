package com.netlink.rsk.service;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TrainerAttendanceVerification;
import java.util.List;

public interface ITrainerAttendanceVerification {
    //public Response getTrainerAttendanceVerification(Long batchId);
    public Response addUpdateTrainerAttendanceVerification(List<TrainerAttendanceVerification> trainerAttendanceVerificationList);
}
