
package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TraineeAttendanceVerification;
import com.netlink.rsk.service.ITraineeAttendanceVerification;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Traineeattendanceverification")
public class TraineeAttendanceVerificationController {

    private static final Logger LOGGER = LogManager.getLogger(TrainerAttendanceVerificationController.class);
    @Autowired
    private ITraineeAttendanceVerification trainerAttendanceVerification;

    @PostMapping("/AddUpdateTraineeAttendanceVerification")
    public ResponseEntity<Response> saveTrainerAttendanceVerification(@RequestBody List<TraineeAttendanceVerification> traineeAttendanceVerificationList) throws Exception {
        try{
            LOGGER.info("Saving Trainer Attendance Verification data.....");
            Response response = trainerAttendanceVerification.addUpdateTraineeAttendanceVerification(traineeAttendanceVerificationList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

//    @GetMapping(value={"/GetTrainerAttendanceVerification/{batchId}"})
//    public ResponseEntity<Response> getTrainerAttendanceVerification(@PathVariable(value = "batchId") Long batchId) throws Exception {
//        try {
//            LOGGER.info("Fetching data of Training Attendance...");
//            Response response= trainerAttendanceVerification.getTrainerAttendanceVerification(batchId);
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        } catch (Exception e) {
//            LOGGER.error("Error: "+e.getMessage());
//            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//    }
}
