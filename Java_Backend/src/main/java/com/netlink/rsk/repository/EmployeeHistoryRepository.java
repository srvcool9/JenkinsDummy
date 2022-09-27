package com.netlink.rsk.repository;

import com.netlink.rsk.model.EmployeeHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface EmployeeHistoryRepository extends JpaRepository<EmployeeHistory, Void>, JpaSpecificationExecutor<EmployeeHistory> {

}