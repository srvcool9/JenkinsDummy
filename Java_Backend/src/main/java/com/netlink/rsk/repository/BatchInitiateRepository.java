package com.netlink.rsk.repository;

import com.netlink.rsk.model.BatchInitiate;
import com.netlink.rsk.model.CheckListItems;
import com.netlink.rsk.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchInitiateRepository extends JpaRepository<BatchInitiate,Long>, JpaSpecificationExecutor<BatchInitiate> {

    public BatchInitiate findByTraining(Training training);
}
