package com.netlink.rsk.dto;

import com.netlink.rsk.model.EntityMaster;
import lombok.Data;

@Data
public class QuizDTO {

    private Long quizId;
    private Integer numberOfQuestions;
    private EntityDTO selectedQuiz;
    private Integer day;
}
