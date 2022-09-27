package com.netlink.rsk.repository;

import com.netlink.rsk.model.EntityMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EntityMasterRepository extends JpaRepository<EntityMaster, Long>, JpaSpecificationExecutor<EntityMaster> {

}