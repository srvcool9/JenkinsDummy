package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Coordinator;
import com.netlink.rsk.model.Trainee;
import com.netlink.rsk.service.ITrainee;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Trainee")
public class TraineeController {

    private static final Logger LOGGER = LogManager.getLogger(TraineeController.class);

    @Autowired
    private ITrainee traineeService;

    @GetMapping(value="/GetTrainees/{batchId}")
    public ResponseEntity<Response> getTrainees(@PathVariable(value = "batchId") Long batchId) throws Exception {
        try {
            LOGGER.info("Fetching trainees data.....");
            Response response = traineeService.getTraineesData(batchId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateTrainees")
    public ResponseEntity<Response> saveTrainee(@RequestBody List<Trainee> traineeList) throws Exception {
        try{
            LOGGER.info("Saving trainees data.....");
            Response response = traineeService.saveUpdateTrainee(traineeList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("getTrainee/{empId}")
    public ResponseEntity<Response> getTrainee(@PathVariable(value = "empId") String employeeId) throws Exception {
        try {
            LOGGER.info("Fetching trainee data.....");
            Response response = traineeService.getTrainee(employeeId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
