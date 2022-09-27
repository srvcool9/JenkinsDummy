package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.MonitorQuestions;
import com.netlink.rsk.model.TrainerAttendance;

import java.util.List;

public interface ITrainerAttendance {
    public Response getTrainerAttendance(Long batchId);
    public Response addUpdateTrainerAttendance(List<TrainerAttendance> trainerAttendanceList);


}