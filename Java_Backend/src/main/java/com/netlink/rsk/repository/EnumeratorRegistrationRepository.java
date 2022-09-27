package com.netlink.rsk.repository;

import com.netlink.rsk.mapper.EnumeratorAllocationReport;
import com.netlink.rsk.mapper.EnumeratorReport;
import com.netlink.rsk.mapper.StateLevelEnumerator;
import com.netlink.rsk.model.EnumeratorRegistration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public interface EnumeratorRegistrationRepository extends JpaRepository<EnumeratorRegistration, Long>, JpaSpecificationExecutor<EnumeratorRegistration> {

      public EnumeratorRegistration findByMobile(String mobile);
      public EnumeratorRegistration findByEmail(String email);

      @Transactional
      @Procedure("dbo.up_RptStateLevelEnumerator")
      List<StateLevelEnumerator> getUpRptStateLevelEnumerator(@Param("AssessmentId")Long AssessmentId);

      @Transactional
      @Procedure("dbo.up_RptEnumeratorReport")
      List<EnumeratorReport> getUpRptEnumeratorReport();

      @Transactional
      @Procedure("dbo.up_RptAllocationList")
      List<EnumeratorAllocationReport> getUpRptAllocationList(@Param("AssessmentId")Long AssessmentId);


}