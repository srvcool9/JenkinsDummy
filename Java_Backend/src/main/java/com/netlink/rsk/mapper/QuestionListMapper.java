package com.netlink.rsk.mapper;

public interface QuestionListMapper {

    Long getQuizId();
    String getQuizTypeId();
    String getEntityName();
    Integer getDay();
    Long getQuestionId();
    Integer getDisplayOrder();
    String getQuestion();
    String getOption1();
    String getOption2();
    String getOption3();
    String getOption4();
    String getAnswer();
}
