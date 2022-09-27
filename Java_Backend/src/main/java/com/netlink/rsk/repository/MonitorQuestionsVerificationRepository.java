package com.netlink.rsk.repository;

import com.netlink.rsk.model.MonitorQuestionsVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonitorQuestionsVerificationRepository  extends JpaRepository<MonitorQuestionsVerification,Long>
, JpaSpecificationExecutor<MonitorQuestionsVerification> {
    List<MonitorQuestionsVerification> findByTraining(Long trainingId);
    //List<MonitorQuestionsVerification> findBytrainingId(Long trainingId);
}

