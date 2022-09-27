package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.service.ITrainerBatch;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("TrainerBatch")
public class TrainerBatchController {

    private static final Logger LOGGER = LogManager.getLogger(TrainerBatchController.class);

    @Autowired
    private ITrainerBatch trainerBatchService;

    @GetMapping(value={"/GetTrainerList/{trainingId}/{batchId}"})
    public ResponseEntity<Response> getTrainerList(@PathVariable(value ="trainingId") Long trainingId,@PathVariable(value ="batchId") Integer batchId) throws Exception {
        try {
            LOGGER.info("Fetching trainers list  for batch...");
            Response response= trainerBatchService.getTrainerByBatch(trainingId,batchId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetTrainers/{batchId}"})
    public ResponseEntity<Response> getTrainers(@PathVariable(value ="batchId") Long batchId) throws Exception {
        try {
            LOGGER.info("Fetching trainers list for batch...");
            Response response= trainerBatchService.getTrainers(batchId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
