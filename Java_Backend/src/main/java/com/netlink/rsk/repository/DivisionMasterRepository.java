package com.netlink.rsk.repository;

import com.netlink.rsk.model.DivisionMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DivisionMasterRepository extends JpaRepository<DivisionMaster, Long>, JpaSpecificationExecutor<DivisionMaster> {

}