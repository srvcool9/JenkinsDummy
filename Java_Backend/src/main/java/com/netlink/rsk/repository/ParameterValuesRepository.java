package com.netlink.rsk.repository;

import com.netlink.rsk.model.ParameterValues;
import com.netlink.rsk.model.QuestionMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ParameterValuesRepository extends JpaRepository<ParameterValues, Long>, JpaSpecificationExecutor<ParameterValues> {
}