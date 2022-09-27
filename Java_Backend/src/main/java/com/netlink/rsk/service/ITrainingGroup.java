package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TrainingGroupMaster;

public interface ITrainingGroup {
    public Response getTrainingGroups(Long id);
    public Response saveTrainingGroups(TrainingGroupMaster trainingGroupMaster);

}
