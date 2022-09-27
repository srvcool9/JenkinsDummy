package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.MonitorQuestionsVerification;

import java.util.List;

public interface IMonitorQuestionsVerification {
    public Response addUpdateMonitorQuestionsVerification(List<MonitorQuestionsVerification> monitorQuestionsVerification);
    public Response getMonitorQuestionsVerification(Long trainingId);
}
