package com.netlink.rsk.mapper;

import io.swagger.models.auth.In;

import java.util.Date;

public interface TrainingMapper {

    Long getTrainingId();
    Long getSubGroupId();
    String getTrainingName();
    String getDescription();
    Long getTrainingLevelId();
    Integer getApproxTrainees();
    Date getStartDate();
    Date getEndDate();
    Integer getNoOfDays();
    Integer getMinimumTrainer();
    Integer getMaximumBatchSize();
    Integer getStatus();
    Integer getInitiateTrainingStatus();
    Boolean getIsActive();
    Long getCreatedBy();
    Date getCreatedOn();
    Long getUpdatedBy();
    Date getUpdatedOn();

}
