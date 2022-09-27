package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TypeMaster;

import java.util.List;

public interface ITypeMasterService {
    public Response getAllTypes();
    public Response saveTypes(List<TypeMaster> typeMasterList);
}
