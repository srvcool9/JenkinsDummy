package com.netlink.rsk.repository;

import com.netlink.rsk.model.VisitAssessmentDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitAssessmentDocumentRepository extends JpaRepository<VisitAssessmentDocument, Long>, JpaSpecificationExecutor<VisitAssessmentDocument> {

}