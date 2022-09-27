package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.Training;

public interface IBatch {
    public Response getBatchList(Long id);
    public Response saveBatch(BatchMaster batchMaster) throws Exception;
    public Response getBatchByTraining(Long id);

    public Response getAllBatches();
}
