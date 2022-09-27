package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Trainee;

import java.util.List;

public interface ITrainee {

    public Response saveUpdateTrainee(List<Trainee> traineeList);
    public Response getTraineesData(Long batchId);
    public Response getTrainee(String empId);
}
