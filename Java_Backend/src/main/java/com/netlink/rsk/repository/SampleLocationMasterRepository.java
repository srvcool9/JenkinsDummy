package com.netlink.rsk.repository;

import com.netlink.rsk.model.SampleLocationMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SampleLocationMasterRepository extends JpaRepository<SampleLocationMaster, Integer>, JpaSpecificationExecutor<SampleLocationMaster> {

}