package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TraineeAnswerSheet;
import com.netlink.rsk.model.TrainerMaster;
import com.netlink.rsk.service.ITraineeAnswerSheet;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.openxml4j.opc.PackageRelationship;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("TrainingAnswerSheet")
public class TrainingAnswerSheetController {

    private static final Logger LOGGER = LogManager.getLogger(TrainingAnswerSheetController.class);

    @Autowired
    private ITraineeAnswerSheet traineeAnswerSheetService;


    @PostMapping("/addUpdateTrainingAnswerSheet")
    public ResponseEntity<Response> saveBatchInitiate
            (@RequestBody List<TraineeAnswerSheet> traineeAnswerSheets) throws Exception {
        try{
            LOGGER.info("Saving trainee answer.....");
            Response response = traineeAnswerSheetService.saveUpdateTraineeAnswerSheet(traineeAnswerSheets);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error:"+ e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
