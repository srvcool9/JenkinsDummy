package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Allocation;

public interface IAllocation {

    public Response addUpdateAllocation(Allocation allocation);
    public Response getAllAllocation(Long id);
}
