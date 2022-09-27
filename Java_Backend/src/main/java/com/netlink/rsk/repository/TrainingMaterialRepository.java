package com.netlink.rsk.repository;

import com.netlink.rsk.model.Training;
import com.netlink.rsk.model.TrainingMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingMaterialRepository extends JpaRepository<TrainingMaterial, Long>,
        JpaSpecificationExecutor<TrainingMaterial> {

    public List<TrainingMaterial> findByTrainingId(Training training);
}
