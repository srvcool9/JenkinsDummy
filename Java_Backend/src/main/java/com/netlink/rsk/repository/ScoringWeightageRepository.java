package com.netlink.rsk.repository;

import com.netlink.rsk.model.ScoringWeightage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoringWeightageRepository extends JpaRepository<ScoringWeightage, Long>, JpaSpecificationExecutor<ScoringWeightage> {

}