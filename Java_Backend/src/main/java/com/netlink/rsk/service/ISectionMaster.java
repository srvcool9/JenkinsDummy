package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.QuizMaster;
import com.netlink.rsk.model.SectionMaster;

public interface ISectionMaster {

    public Response getAllSectionMaster(Long id);
    public Response getAllSelfAssessmentSection(Long id);
    public Response saveUpdateSection(SectionMaster sectionMaster);
}
