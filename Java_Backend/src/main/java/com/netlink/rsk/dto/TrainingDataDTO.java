package com.netlink.rsk.dto;

import com.netlink.rsk.model.EntityMaster;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.model.TrainingSubGroupMaster;
import lombok.Data;

import java.util.Date;

@Data
public class TrainingDataDTO {

    private Long trainingId;
    private String trainingName;
    private Training training;
    private Long trainingAreaId;
    private EntityMaster trainingTypeId;
    private Long areaId;
    private Long groupId;
    private String groupName;
    private Date startDate;
    private Date endDate;
    private TrainingSubGroupMaster subGroupId;
    private String subGroupName;
    private Integer approxTrainees;
    private Integer noOfDays;
    private Integer minimumTrainer;
    private Integer maximumBatchSize;
    private EntityMaster trainingLevelId;
    private EntityMaster configured;
    private EntityMaster status;
    private Boolean isActive;
    private EntityMaster initiateTrainingStatus;
    private String description;
}
