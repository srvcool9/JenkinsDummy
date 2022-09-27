package com.netlink.rsk.repository;

import com.netlink.rsk.model.GroupMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupMasterRepository extends JpaRepository<GroupMaster, Long>, JpaSpecificationExecutor<GroupMaster> {

}