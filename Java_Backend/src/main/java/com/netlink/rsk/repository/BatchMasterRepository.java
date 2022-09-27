package com.netlink.rsk.repository;

import com.netlink.rsk.mapper.StateLevelEnumerator;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface BatchMasterRepository extends JpaRepository<BatchMaster, Long>, JpaSpecificationExecutor<BatchMaster> {

    public List<BatchMaster> findByTraining(Training training);
    public BatchMaster findByTrainingAndBatchNumber(Training training,Integer batchNumber);

    @Transactional
    @Procedure("dbo.up_GetBatchList")
    List<BatchMaster> getUpBatchList();
}