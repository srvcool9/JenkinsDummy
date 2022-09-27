package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.AssessmentMaster;

public interface IAssessment {

    public Response getAssessmentList(Long id);
    public Response saveAssessment(AssessmentMaster assessmentMaster);
    public Response getAssessmentByGroup(Long id);
}
