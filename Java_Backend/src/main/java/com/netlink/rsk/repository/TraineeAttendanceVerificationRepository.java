package com.netlink.rsk.repository;

import com.netlink.rsk.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TraineeAttendanceVerificationRepository  extends JpaRepository<TraineeAttendanceVerification, Long>, JpaSpecificationExecutor<TraineeAttendanceVerification> {
    //public List<TraineeAttendanceVerification> findByBatch(BatchMaster batch);
    //public List<TraineeAttendanceVerification> findByTraineeAttendanceId(TraineeAttendance traineeAttendance);
}