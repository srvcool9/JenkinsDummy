package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Coordinator;

import java.util.List;

public interface ICoordinator {
    public Response saveUpdateCoordinator(List<Coordinator> coordinators);
    public Response getCoodinatorData(String empCode, Long batchId);
}
