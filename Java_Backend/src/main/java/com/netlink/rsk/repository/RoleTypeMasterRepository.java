package com.netlink.rsk.repository;

import com.netlink.rsk.model.RoleTypeMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoleTypeMasterRepository extends JpaRepository<RoleTypeMaster, Long>, JpaSpecificationExecutor<RoleTypeMaster> {

}