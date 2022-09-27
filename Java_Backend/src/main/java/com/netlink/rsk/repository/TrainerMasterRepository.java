package com.netlink.rsk.repository;

import com.netlink.rsk.model.TrainerMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerMasterRepository extends JpaRepository<TrainerMaster, Long>, JpaSpecificationExecutor<TrainerMaster> {

}