package com.netlink.rsk.repository;

import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.TrainerBatch;
import com.netlink.rsk.model.TrainerMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainerBatchRepository extends JpaRepository<TrainerBatch, Long>, JpaSpecificationExecutor<TrainerBatch> {

    public List<TrainerBatch> findByBatch(BatchMaster batchMaster);
}
