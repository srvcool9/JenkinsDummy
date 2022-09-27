package com.netlink.rsk.repository;

import com.netlink.rsk.model.SchoolMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolMasterRepository extends JpaRepository<SchoolMaster, String>, JpaSpecificationExecutor<SchoolMaster> {

}