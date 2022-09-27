package com.netlink.rsk.dto;

import com.netlink.rsk.model.QuestionMaster;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class DailyQuestionDTO {

    Map<String,List<QuestionMaster>> dailyQuestion;
}
