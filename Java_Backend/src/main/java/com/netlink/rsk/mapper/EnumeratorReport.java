package com.netlink.rsk.mapper;

import java.time.LocalDateTime;

public interface EnumeratorReport {
    Long getEnumeratorId();
    String getEnumeratorName();
    String getMobile();
    String getEmail();
    String getFatherName();
    String getInstitutionName();
    String getDistrictName();
    String getVerificationStatus();
    LocalDateTime getRegistrationDate();
    String getVerifiedBy();
}
