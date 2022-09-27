package com.netlink.rsk.repository;

import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.Coordinator;
import com.netlink.rsk.model.EmployeeMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface CoordinatorRepository extends JpaRepository<Coordinator, String>, JpaSpecificationExecutor<Coordinator> {

   public List<Coordinator> findByEmpCode(EmployeeMaster employeeMaster);
   public List<Coordinator> findByBatch(BatchMaster batchMaster);
}