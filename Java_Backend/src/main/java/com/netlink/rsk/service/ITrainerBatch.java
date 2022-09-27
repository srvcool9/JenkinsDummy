package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;

public interface ITrainerBatch {
    public Response getTrainerByBatch(Long trainingId,Integer batchNumber);
    public Response getTrainers(Long batchId);
}
