package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.QuestionMaster;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

public interface IQuestion {

    public Response getQuestions(Long quizId);
    public Response getQuestionByDay(Long quizId,Integer day);
    public Response saveUpdateQuestion(List<QuestionMaster> questionMaster);
    public Response deleteQuestion(Long id);
    public Response getQuestionListByTraining(Long quiz,Long training,Integer day);
}
