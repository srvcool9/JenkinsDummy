package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.GroupMaster;

import java.util.List;

public interface IGroup {

    public Response getGroups(Long id);
    public  Response saveGroup(GroupMaster groupMaster);
}
