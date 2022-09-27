package com.netlink.rsk.repository;

import com.netlink.rsk.model.Allocation;
import com.netlink.rsk.model.AssessmentClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface AllocationRepository extends JpaRepository<Allocation, Long>, JpaSpecificationExecutor<Allocation> {
}
