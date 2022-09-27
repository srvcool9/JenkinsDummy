package com.netlink.rsk.repository;

import com.netlink.rsk.model.RoleMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoleMasterRepository extends JpaRepository<RoleMaster, Long>, JpaSpecificationExecutor<RoleMaster> {

}