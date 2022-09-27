package com.netlink.rsk.dto;

import com.netlink.rsk.model.EntityMaster;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.model.UserMaster;
import lombok.Data;

@Data
public class TrainingAreaDTO {
 private Long trainingAreaId;
 private Long areaId;
 private Training training;
 private EntityMaster trainingTypeId;
 private UserMaster createdBy;
 private Object trainingArea;
}
