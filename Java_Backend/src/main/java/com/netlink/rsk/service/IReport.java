package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;

public interface IReport {

    public Response getStateLevelEnumerator(Long reportId,Long assessmentId);
}
