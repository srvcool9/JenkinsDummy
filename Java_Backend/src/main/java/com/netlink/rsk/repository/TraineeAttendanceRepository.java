package com.netlink.rsk.repository;

import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.TraineeAttendance;
import org.hibernate.engine.jdbc.batch.spi.Batch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TraineeAttendanceRepository extends JpaRepository<TraineeAttendance, Long>, JpaSpecificationExecutor<TraineeAttendance> {

    public List<TraineeAttendance> findByBatch(BatchMaster batch);
}
