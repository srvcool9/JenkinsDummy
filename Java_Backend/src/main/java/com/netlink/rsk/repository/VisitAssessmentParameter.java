package com.netlink.rsk.repository;

import com.netlink.rsk.model.VisitAssessmentParameters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitAssessmentParameter extends JpaRepository<VisitAssessmentParameters, Long>, JpaSpecificationExecutor<VisitAssessmentParameters> {

}