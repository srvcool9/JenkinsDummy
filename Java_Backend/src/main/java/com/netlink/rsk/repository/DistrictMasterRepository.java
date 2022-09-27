package com.netlink.rsk.repository;

import com.netlink.rsk.model.DistrictMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DistrictMasterRepository extends JpaRepository<DistrictMaster, String>, JpaSpecificationExecutor<DistrictMaster> {

}