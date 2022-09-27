package com.netlink.rsk.service;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.dto.TraineeTestQuestions;
import com.netlink.rsk.model.TraineeAnswerSheet;

import java.util.List;

public interface ITraineeAnswerSheet {

    public Response saveUpdateTraineeAnswerSheet(List<TraineeAnswerSheet> traineeAnswerSheetList);
}
