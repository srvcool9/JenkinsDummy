package com.netlink.rsk.repository;

import com.netlink.rsk.model.TrainingGroup;
import com.netlink.rsk.model.TrainingGroupMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingGroupRepository extends JpaRepository<TrainingGroupMaster, Long>,
        JpaSpecificationExecutor<TrainingGroupMaster> {
}
