package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchInitiate;


public interface IBatchInitiate {
    public Response getBatchInitiate(Long id);
    public  Response saveBatchInitiate(BatchInitiate groupMaster) throws Exception;
    public Response getBatchByTrainingId(Long trainingId);
}
