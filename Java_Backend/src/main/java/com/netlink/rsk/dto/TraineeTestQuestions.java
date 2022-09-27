package com.netlink.rsk.dto;

import com.netlink.rsk.model.EntityMaster;
import com.netlink.rsk.model.QuestionMaster;
import com.netlink.rsk.model.TraineeAnswerSheet;
import com.netlink.rsk.model.Training;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class TraineeTestQuestions {
    private Long traineeId;
private TrainingDTO training;
private EntityMaster testType;
private Date scheduledDate;
private EntityMaster status;
private AssessmentQuestionsDTO assessmentQuestions;
private List<TraineeAnswerSheet> attendedQuestions;
}

