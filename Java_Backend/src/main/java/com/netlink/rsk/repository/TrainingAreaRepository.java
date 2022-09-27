package com.netlink.rsk.repository;

import com.netlink.rsk.dto.TrainingAreaParam;
import com.netlink.rsk.mapper.TrainingMapper;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.model.TrainingArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Repository
public interface TrainingAreaRepository extends JpaRepository<TrainingArea, Long>,
        JpaSpecificationExecutor<TrainingArea> {
    public List<TrainingArea> findByTraining(Training training);
    public List<TrainingArea> findByAreaId(Long areaId);

    @Transactional
    @Procedure("Training.up_GetTrainingAreaWise")
    List<TrainingMapper> getUpGetTrainingAreaWise(@Param("AreaList") String areaList);

}
