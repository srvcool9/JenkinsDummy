package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.SchoolMaster;
import com.netlink.rsk.model.VisitAssessment;

public interface IVisitAssessmentService {
    public Response saveVisitAssessment(VisitAssessment visitAssessment);
    public Response getVisitAssessment(SchoolMaster udiseCode);
}
