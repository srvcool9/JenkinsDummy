package com.netlink.rsk.repository;

import com.netlink.rsk.model.TrainingSubGroupMaster;
import com.netlink.rsk.model.TypeMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeMasterRepository extends
        JpaRepository<TypeMaster,Long>,
        JpaSpecificationExecutor<TypeMaster>{

}