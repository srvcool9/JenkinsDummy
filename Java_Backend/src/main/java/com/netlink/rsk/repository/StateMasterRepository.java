package com.netlink.rsk.repository;

import com.netlink.rsk.model.StateMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface StateMasterRepository extends JpaRepository<StateMaster, Long>, JpaSpecificationExecutor<StateMaster> {

}