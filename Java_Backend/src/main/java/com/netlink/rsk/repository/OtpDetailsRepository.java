package com.netlink.rsk.repository;

import com.netlink.rsk.model.EnumeratorRegistration;
import com.netlink.rsk.model.OtpDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface OtpDetailsRepository extends JpaRepository<OtpDetails, Long>, JpaSpecificationExecutor<OtpDetails> {

    public OtpDetails findByMobile(String mobile);
}