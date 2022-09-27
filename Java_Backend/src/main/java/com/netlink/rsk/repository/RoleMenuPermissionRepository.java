package com.netlink.rsk.repository;

import com.netlink.rsk.model.RoleMenuPermission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoleMenuPermissionRepository extends JpaRepository<RoleMenuPermission, Long>, JpaSpecificationExecutor<RoleMenuPermission> {

}