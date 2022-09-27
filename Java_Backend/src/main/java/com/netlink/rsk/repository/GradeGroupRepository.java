package com.netlink.rsk.repository;

import com.netlink.rsk.model.GradeGroups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeGroupRepository extends JpaRepository<GradeGroups, Long>, JpaSpecificationExecutor<GradeGroups> {

        }
