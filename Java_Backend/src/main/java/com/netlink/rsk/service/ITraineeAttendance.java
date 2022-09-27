package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TraineeAttendance;

import java.util.List;

public interface ITraineeAttendance {

public Response getTrainees(Long batchId);
public Response saveTraineeAttendance(List<TraineeAttendance> traineeAttendanceList);

}
