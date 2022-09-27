package com.netlink.rsk.repository;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.netlink.rsk.mapper.TrainingMapper;
import com.netlink.rsk.model.MonitorQuestions;
import com.netlink.rsk.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonitorQuestionsRepository extends JpaRepository<MonitorQuestions, Long>, JpaSpecificationExecutor<MonitorQuestions>{

     public List<MonitorQuestions> findByTraining(Training training);
}
