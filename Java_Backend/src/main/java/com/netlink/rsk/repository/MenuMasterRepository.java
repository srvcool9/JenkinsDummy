package com.netlink.rsk.repository;

import com.netlink.rsk.model.MenuMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MenuMasterRepository extends JpaRepository<MenuMaster, Long>, JpaSpecificationExecutor<MenuMaster> {

}