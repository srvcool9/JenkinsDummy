package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.MonitorQuestionsVerification;
import com.netlink.rsk.service.IMonitorQuestionsVerification;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Monitorquestionsverification")
public class MonitorQuestionsVerificationController {
    private static final Logger LOGGER = LogManager.getLogger(MonitorQuestionsVerificationController.class);
    @Autowired
    private IMonitorQuestionsVerification monitorQuestionsVerification;

    @PostMapping("/AddUpdateMonitorQuestionsVerification")
    public ResponseEntity<Response> saveMonitorQuestionsVerification(@RequestBody List<MonitorQuestionsVerification> monitorQuestionsVerificationList) throws Exception {
        try {
            LOGGER.info("Saving Monitor Questions Verification data.....");
            Response response = monitorQuestionsVerification.addUpdateMonitorQuestionsVerification(monitorQuestionsVerificationList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error" + e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = {"/GetMonitorQuestionsVerification/{trainingId}"})
    public ResponseEntity<Response> getMonitorQuestionsVerification(@PathVariable(value = "trainingId") Long trainingId) throws Exception {
        try {
            LOGGER.info("Fetching data of Monitor Questions Verification...");
            Response response = monitorQuestionsVerification.getMonitorQuestionsVerification(trainingId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: " + e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}