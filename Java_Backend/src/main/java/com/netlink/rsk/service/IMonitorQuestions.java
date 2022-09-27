package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.MonitorQuestions;

import java.util.List;

public interface IMonitorQuestions {

    public Response addUpdateMonitorQuestions(List<MonitorQuestions> monitorQuestions);
    public Response getMonitorQues(Long trainingId);
    public Response deleteMonitorQues(Long id);

}
