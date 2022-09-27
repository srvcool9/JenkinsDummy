package com.netlink.rsk.dto;

import com.netlink.rsk.model.QuestionMaster;
import lombok.Data;

import java.util.List;

@Data
public class AssessmentQuestionsDTO {
    private List<QuestionMaster> preQuestionList;
    private List<QuestionMaster> postQuestionList;
    private DailyQuestionDTO dailyQuestionDTO;
}
