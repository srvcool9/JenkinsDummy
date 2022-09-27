package com.netlink.rsk.repository;

import com.netlink.rsk.model.AssessmentGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AssessmentGroupRepository extends
        JpaRepository<AssessmentGroup, Long>, JpaSpecificationExecutor<AssessmentGroup> {
}
