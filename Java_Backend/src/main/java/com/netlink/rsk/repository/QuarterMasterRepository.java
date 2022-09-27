package com.netlink.rsk.repository;

import com.netlink.rsk.model.Parameter;
import com.netlink.rsk.model.QuaterMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface QuarterMasterRepository extends JpaRepository<QuaterMaster, Long>, JpaSpecificationExecutor<QuaterMaster> {
}
