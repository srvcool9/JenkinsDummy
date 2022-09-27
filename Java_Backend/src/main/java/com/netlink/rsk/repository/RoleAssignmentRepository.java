package com.netlink.rsk.repository;

import com.netlink.rsk.model.RoleAssignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoleAssignmentRepository extends JpaRepository<RoleAssignment, Void>, JpaSpecificationExecutor<RoleAssignment> {

}