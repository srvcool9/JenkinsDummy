package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.dto.RoleAreaDTO;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.model.TrainingGroupMaster;

import java.util.List;

public interface ITraining {
    public Response getTraining(Long id);
    public Response saveTraining(Training training);
    public Response getTrainingByArea(List<RoleAreaDTO> roleAreaDTO);
    public Response getTrainingBySubGroup(Long id);

}
