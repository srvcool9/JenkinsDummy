package com.netlink.rsk.repository;

import com.netlink.rsk.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long>, JpaSpecificationExecutor<UserRole> {

}