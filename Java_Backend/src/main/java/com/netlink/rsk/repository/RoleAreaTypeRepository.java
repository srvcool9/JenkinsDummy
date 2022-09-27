package com.netlink.rsk.repository;

import com.netlink.rsk.model.RoleAreaType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoleAreaTypeRepository extends JpaRepository<RoleAreaType, Void>, JpaSpecificationExecutor<RoleAreaType> {

}