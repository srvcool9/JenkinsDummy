package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.QuizMaster;

public interface IQuiz {
    public Response getQuizs(Long id);
    public Response saveUpdateQuiz(QuizMaster quiz);
    public Response getQuizListByTraining(Long id);
}
