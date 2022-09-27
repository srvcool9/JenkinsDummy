package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.MonitorComment;

import java.util.List;

public interface IMonitorComment {
    public Response saveUpdateMonitorComment(MonitorComment monitorComment);
}
