package com.netlink.rsk.repository;

import com.netlink.rsk.model.DistrictMaster;
import com.netlink.rsk.model.InstitutionMaster;
import org.apache.catalina.LifecycleState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface InstitutionMasterRepository extends JpaRepository<InstitutionMaster, Long>, JpaSpecificationExecutor<InstitutionMaster> {

    public List<InstitutionMaster> findAllByDistrictCode(DistrictMaster id);
}