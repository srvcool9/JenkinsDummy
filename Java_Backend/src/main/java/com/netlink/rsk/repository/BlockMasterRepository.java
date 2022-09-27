package com.netlink.rsk.repository;

import com.netlink.rsk.model.BlockMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BlockMasterRepository extends JpaRepository<BlockMaster, String>, JpaSpecificationExecutor<BlockMaster> {

}