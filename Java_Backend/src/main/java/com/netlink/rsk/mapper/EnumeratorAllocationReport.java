package com.netlink.rsk.mapper;

import java.time.LocalDateTime;

public interface EnumeratorAllocationReport {
    Long getEnumeratorId();
    String getEnumeratorName();
    String getFatherName();
    String getInstitutionName();
    String getDistrictName();
    Integer getNumberOfSchool();
    String getAllocatedBy();
    LocalDateTime getAllocatedOn();
}
