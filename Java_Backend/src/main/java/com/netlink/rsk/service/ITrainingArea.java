package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.dto.RoleAreaDTO;
import com.netlink.rsk.model.TrainingArea;

import java.util.List;

public interface ITrainingArea {

    public Response saveUpdateTrainingArea(List<TrainingArea> trainingAreas);
    public Response getTrainingAreaList(Long id);
    public Response getAreasByTrainingId(Long id);
    public Response deleteArea(Long id);
    public Response getUserRespectiveTraining(List<RoleAreaDTO> roleAreaDTO);

}
