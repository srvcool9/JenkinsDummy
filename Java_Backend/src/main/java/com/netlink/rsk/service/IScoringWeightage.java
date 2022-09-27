package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.RedFlag;
import com.netlink.rsk.model.ScoringWeightage;

public interface IScoringWeightage {

    public Response saveUpdateScoringWeightage(ScoringWeightage scoringWeightage);
    public Response getScoringWeightage(Long id);
}
