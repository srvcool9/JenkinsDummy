package com.netlink.rsk.repository;

import com.netlink.rsk.model.SectionMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SectionMasterRepository extends JpaRepository<SectionMaster, Long>, JpaSpecificationExecutor<SectionMaster> {

}
