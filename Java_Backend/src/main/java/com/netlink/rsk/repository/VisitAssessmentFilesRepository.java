package com.netlink.rsk.repository;

import com.netlink.rsk.model.VisitAssessmentFiles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitAssessmentFilesRepository extends JpaRepository<VisitAssessmentFiles, Long>, JpaSpecificationExecutor<VisitAssessmentFiles> {

}