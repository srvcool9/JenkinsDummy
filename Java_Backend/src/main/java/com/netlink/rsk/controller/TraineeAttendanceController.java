package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Trainee;
import com.netlink.rsk.model.TraineeAttendance;
import com.netlink.rsk.service.ITraineeAttendance;
import com.netlink.rsk.service.TraineeAttendanceService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("TraineeAttendance")
public class TraineeAttendanceController {

    private static final Logger LOGGER = LogManager.getLogger(TraineeAttendanceController.class);

    @Autowired
    private ITraineeAttendance traineeAttendanceService;

    @GetMapping(value={"/GetTraineeAttendanceList/{batchId}"})
    public ResponseEntity<Response> getAssessment(@PathVariable(value = "batchId") Long batchId ) throws Exception {
        try {
            LOGGER.info("Fetching training attendance list.....");
            Response response = traineeAttendanceService.getTrainees(batchId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateTraineesAttendance")
    public ResponseEntity<Response> saveTraineeAttendance(@RequestBody List<TraineeAttendance> traineeAttendanceList) throws Exception {
        try{
            LOGGER.info("Saving trainees attendance data.....");
            Response response = traineeAttendanceService.saveTraineeAttendance(traineeAttendanceList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
