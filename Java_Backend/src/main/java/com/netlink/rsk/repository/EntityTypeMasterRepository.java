package com.netlink.rsk.repository;

import com.netlink.rsk.model.EntityTypeMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EntityTypeMasterRepository extends JpaRepository<EntityTypeMaster, Integer>, JpaSpecificationExecutor<EntityTypeMaster> {

}