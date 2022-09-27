package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.MonitorComment;
import com.netlink.rsk.model.ScoringWeightage;
import com.netlink.rsk.service.IScoringWeightage;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("ScoringWeightage")
public class ScoringWeightageController {

    private static final Logger LOGGER = LogManager.getLogger(ScoringWeightageController.class);

    @Autowired
    private IScoringWeightage scoringWeightageService;


    @GetMapping(value={"/GetScoringWeightageList","/GetScoringWeightageList/{id}"})
    public ResponseEntity<Response> getAssessment(@PathVariable(value = "id",required = false) Long id ) throws Exception {
        try {
            LOGGER.info("Fetching scoring weightage data.....");
            Response response = scoringWeightageService.getScoringWeightage(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateScoringWeightage")
    public ResponseEntity<Response> saveUpdateScoringWeightage(@RequestBody ScoringWeightage scoringWeightage) throws Exception {
        try {
            LOGGER.info("Saving scoring weightage data.....");
            Response response = scoringWeightageService.saveUpdateScoringWeightage(scoringWeightage);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error" + e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
