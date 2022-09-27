package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.dto.TraineeTestQuestions;
import com.netlink.rsk.dto.TrainingDTO;
import com.netlink.rsk.model.EntityMaster;
import com.netlink.rsk.model.QuestionMaster;
import com.netlink.rsk.model.TraineeAnswerSheet;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.repository.TraineeAnswerSheetRepository;
import com.netlink.rsk.repository.TrainingRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TraineeAnswerSheetService implements ITraineeAnswerSheet{

    private static final Logger LOGGER = LogManager.getLogger(TraineeAnswerSheetService.class);

    @Autowired
    private TraineeAnswerSheetRepository traineeAnswerSheetRepository;

    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private IQuestion questionService;

    private List<TraineeAnswerSheet> traineeAnswerSheetList;
    private String text="Trainee Answer Sheet";

    @Override
    public Response saveUpdateTraineeAnswerSheet(List<TraineeAnswerSheet> traineeAnswerSheets) {
        if(traineeAnswerSheets.isEmpty()==false){
            traineeAnswerSheetList= new ArrayList<>();
            traineeAnswerSheetList= traineeAnswerSheetRepository.saveAll(traineeAnswerSheets);
            if(traineeAnswerSheetList.isEmpty()==false){
                LOGGER.info("Trainer answer Sheet saved successfully");
                return new Response(StaticResponse.SUCCESS_Status, text+StaticResponse.ADD_SUCCESS_MESSAGE, traineeAnswerSheetList);
            }
            LOGGER.error("Trainer answer Sheet not saved");
            return new Response(StaticResponse.FAILURE_Status, text+StaticResponse.ADD_FAIL_MESSAGE, null);
        }
        LOGGER.error("No Trainer answer Sheet found for save");
        return new Response(StaticResponse.FAILURE_Status, text+StaticResponse.FIELD_MISSING, null);
    }

}
