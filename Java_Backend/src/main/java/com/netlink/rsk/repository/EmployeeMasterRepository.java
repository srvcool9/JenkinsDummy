package com.netlink.rsk.repository;

import com.netlink.rsk.model.EmployeeMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EmployeeMasterRepository extends JpaRepository<EmployeeMaster, String>, JpaSpecificationExecutor<EmployeeMaster> {

}