package com.netlink.rsk.mapper;


public interface StateLevelEnumerator {
    String getDistrictId();
    String getDistrictName();
    Integer getTotalRegistered();
    Integer getVerified();
    Integer getUnVerified();
    Integer getVerificationPer();
    Integer getEnumeratorPer();
}
