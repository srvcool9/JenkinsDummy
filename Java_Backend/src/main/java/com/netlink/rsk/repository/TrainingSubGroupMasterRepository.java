package com.netlink.rsk.repository;

import com.netlink.rsk.model.TrainingGroupMaster;
import com.netlink.rsk.model.TrainingSubGroupMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingSubGroupMasterRepository extends
        JpaRepository<TrainingSubGroupMaster,Long>,
        JpaSpecificationExecutor<TrainingSubGroupMaster>
{


    public List<TrainingSubGroupMaster> findByGroup(TrainingGroupMaster id);
}
