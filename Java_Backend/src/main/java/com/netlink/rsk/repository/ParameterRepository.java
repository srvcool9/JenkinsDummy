package com.netlink.rsk.repository;

import com.netlink.rsk.model.Parameter;
import com.netlink.rsk.model.QuestionMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParameterRepository extends JpaRepository<Parameter, Long>, JpaSpecificationExecutor<Parameter> {
    List<Parameter> findBySection(Long sectionId);
}