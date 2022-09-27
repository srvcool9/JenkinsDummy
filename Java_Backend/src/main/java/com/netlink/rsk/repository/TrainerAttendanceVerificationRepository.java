package com.netlink.rsk.repository;

import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.TraineeAttendanceVerification;
import com.netlink.rsk.model.TrainerAttendance;
import com.netlink.rsk.model.TrainerAttendanceVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainerAttendanceVerificationRepository  extends JpaRepository<TrainerAttendanceVerification, Long>, JpaSpecificationExecutor<TrainerAttendanceVerification> {
    //public List<TrainerAttendanceVerification> findByTrainerAttendanceId(TrainerAttendance trainerAttendance);

}
