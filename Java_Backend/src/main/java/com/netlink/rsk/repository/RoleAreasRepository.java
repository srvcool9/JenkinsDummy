package com.netlink.rsk.repository;

import com.netlink.rsk.model.RoleAreas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RoleAreasRepository extends JpaRepository<RoleAreas, Void>, JpaSpecificationExecutor<RoleAreas> {

}