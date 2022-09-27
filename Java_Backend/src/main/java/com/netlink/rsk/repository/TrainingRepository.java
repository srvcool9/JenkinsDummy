package com.netlink.rsk.repository;

import com.netlink.rsk.model.Training;
import com.netlink.rsk.model.TrainingGroupMaster;
import com.netlink.rsk.model.TrainingSubGroupMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface TrainingRepository extends
        JpaRepository<Training, Long>,
        JpaSpecificationExecutor<Training> {
    List<Training> findBysubGroupId(TrainingSubGroupMaster id);
  //  @Query(value = "select * from Training.TrainingMaster t where :currentDate BETWEEN StartDate AND EndDate",nativeQuery = true)
  @Query(value = "select * from Training.TrainingMaster t where Status=51",nativeQuery = true)
    List<Training> getCurrentDateTrainings();
}