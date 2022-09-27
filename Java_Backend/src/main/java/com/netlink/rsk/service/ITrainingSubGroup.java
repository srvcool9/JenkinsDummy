package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TrainingSubGroupMaster;

public interface ITrainingSubGroup {
    public Response getTrainingSubGroupList(Long id);
    public Response saveTrainingSubGroup(TrainingSubGroupMaster trainingSubGroupMaster);
    public Response getSubGroupByGroup(Long id);
}
