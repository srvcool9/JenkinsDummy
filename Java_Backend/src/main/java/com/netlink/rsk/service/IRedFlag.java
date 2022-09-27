package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.RedFlag;

import java.util.List;

public interface IRedFlag {
    public Response saveUpdateRedFlag(RedFlag redFlag) throws Exception;
}
