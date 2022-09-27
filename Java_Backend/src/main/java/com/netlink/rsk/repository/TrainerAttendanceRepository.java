package com.netlink.rsk.repository;

import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.TrainerAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainerAttendanceRepository extends JpaRepository<TrainerAttendance, Long>, JpaSpecificationExecutor<TrainerAttendance> {
    List<TrainerAttendance> findByBatch(BatchMaster batch);
}
