package com.netlink.rsk.repository;

import com.netlink.rsk.model.AssessmentClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AssessmentClassRepository extends JpaRepository<AssessmentClass, Long>, JpaSpecificationExecutor<AssessmentClass> {

}