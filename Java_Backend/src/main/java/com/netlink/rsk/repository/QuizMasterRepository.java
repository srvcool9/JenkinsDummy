package com.netlink.rsk.repository;

import com.netlink.rsk.model.QuizMaster;
import com.netlink.rsk.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface QuizMasterRepository extends JpaRepository<QuizMaster, Long>, JpaSpecificationExecutor<QuizMaster> {

    public List<QuizMaster>  findByQuizIdAndDay(Long quizId,Integer day);
    public List<QuizMaster> findByTrainingId(Training training);
}