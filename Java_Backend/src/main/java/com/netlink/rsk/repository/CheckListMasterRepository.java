package com.netlink.rsk.repository;

import com.netlink.rsk.model.CheckListMaster;
import com.netlink.rsk.model.ClusterMaster;
import com.netlink.rsk.model.TrainerMaster;
import com.netlink.rsk.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckListMasterRepository extends JpaRepository<CheckListMaster,Long>, JpaSpecificationExecutor<CheckListMaster> {

    public List<CheckListMaster> findByTraining(Training training);
}