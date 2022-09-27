package com.netlink.rsk.repository;

import com.netlink.rsk.model.RoleArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoleAreaRepository extends JpaRepository<RoleArea, Void>, JpaSpecificationExecutor<RoleArea> {

}