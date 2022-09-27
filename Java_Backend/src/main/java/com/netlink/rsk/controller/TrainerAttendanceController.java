package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.MonitorQuestions;
import com.netlink.rsk.model.TrainerAttendance;
import com.netlink.rsk.service.IMonitorQuestions;
import com.netlink.rsk.service.ITrainerAttendance;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Trainerattendance")
public class TrainerAttendanceController {

    private static final Logger LOGGER = LogManager.getLogger(MonitorQuestionsController.class);
    @Autowired
    private ITrainerAttendance trainerAttendance;

    @PostMapping("/AddUpdateTrainerAttendance")
    public ResponseEntity<Response> saveTrainerAttendance(@RequestBody List<TrainerAttendance> trainerAttendanceList) throws Exception {
        try{
            LOGGER.info("Saving Trainer Attendance data.....");
            Response response = trainerAttendance.addUpdateTrainerAttendance(trainerAttendanceList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetTrainerAttendance/{batchId}"})
    public ResponseEntity<Response> getTrainerAttendance(@PathVariable(value = "batchId") Long batchId) throws Exception {
        try {
            LOGGER.info("Fetching data of Training Attendance...");
            Response response= trainerAttendance.getTrainerAttendance(batchId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
