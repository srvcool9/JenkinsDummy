package com.netlink.rsk.repository;

import com.netlink.rsk.model.Trainee;
import com.netlink.rsk.model.TraineeAnswerSheet;
import com.netlink.rsk.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TraineeAnswerSheetRepository extends JpaRepository<TraineeAnswerSheet, Long>, JpaSpecificationExecutor<TraineeAnswerSheet> {
    public List<TraineeAnswerSheet> findByTrainingAndTrainee(Training training,Trainee trainee);
}