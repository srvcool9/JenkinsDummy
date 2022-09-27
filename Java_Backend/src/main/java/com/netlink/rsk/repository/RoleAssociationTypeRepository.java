package com.netlink.rsk.repository;

import com.netlink.rsk.model.RoleAssociationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoleAssociationTypeRepository extends JpaRepository<RoleAssociationType, Void>, JpaSpecificationExecutor<RoleAssociationType> {

}