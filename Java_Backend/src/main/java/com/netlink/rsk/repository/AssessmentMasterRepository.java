package com.netlink.rsk.repository;

import com.netlink.rsk.model.AssessmentMaster;
import com.netlink.rsk.model.GroupMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface AssessmentMasterRepository extends JpaRepository<AssessmentMaster, Long>, JpaSpecificationExecutor<AssessmentMaster> {

    public List<AssessmentMaster> findByGroup(GroupMaster id);
}