package com.netlink.rsk.service;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TrainerMaster;

import java.util.List;

public interface ITrainer {
    public Response getTrainerList(Long id);
    public Response saveTrainer(List<TrainerMaster> trainerMasterList,Long batchId) throws Exception;

}
