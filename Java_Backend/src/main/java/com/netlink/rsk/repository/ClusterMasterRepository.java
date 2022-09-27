package com.netlink.rsk.repository;

import com.netlink.rsk.model.ClusterMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ClusterMasterRepository extends JpaRepository<ClusterMaster, String>, JpaSpecificationExecutor<ClusterMaster> {

}