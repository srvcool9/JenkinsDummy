package com.netlink.rsk.repository;

import com.netlink.rsk.model.SchoolMaster;
import com.netlink.rsk.model.UserRole;
import com.netlink.rsk.model.VisitAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitAssessmentRepository extends JpaRepository<VisitAssessment, Long>, JpaSpecificationExecutor<VisitAssessment> {
    VisitAssessment findByYear(Long year);
    VisitAssessment findByUdiseCode(SchoolMaster udiseCode);
}