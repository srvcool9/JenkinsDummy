package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Parameter;

public interface IParameterService {
    public Response getParameterBySection(Long sectionId);
    public Response saveParameter(Parameter parameter);
    public Response deleteParameter(Long id);
}
