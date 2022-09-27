package com.netlink.rsk.repository;

import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.EmployeeMaster;
import com.netlink.rsk.model.Trainee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface TraineeRepository  extends JpaRepository<Trainee, Long>,JpaSpecificationExecutor<Trainee> {
    public List<Trainee> findByBatchId(BatchMaster batch);
    public List<Trainee> findByEmpCode(EmployeeMaster employeeMaster);
}

