package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.SchoolMaster;
import com.netlink.rsk.model.SectionMaster;
import com.netlink.rsk.model.VisitAssessment;
import com.netlink.rsk.service.IVisitAssessmentService;
import com.netlink.rsk.service.VisitAssessmentService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders="*")
@RequestMapping("VisitAssessment")
public class VisitAssessmentController {

    private static final Logger LOGGER = LogManager.getLogger(VisitAssessmentController.class);

    @Autowired
    IVisitAssessmentService visitAssessmentService;

    @GetMapping(value="getVisitAssessment")
    public ResponseEntity<Response> getVisitAssessment(@RequestBody SchoolMaster udiseCode) throws Exception {
        try {
            LOGGER.info("Fetching data of Visit Assessment...");
            Response response= visitAssessmentService.getVisitAssessment(udiseCode);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateVisitAssessment")
    public ResponseEntity<Response> saveVisitAssessment
            (@RequestBody VisitAssessment visitAssessment) throws Exception {
        try{
            LOGGER.info("Saving Visit Assessment.....");
            Response response = visitAssessmentService.saveVisitAssessment(visitAssessment);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error:"+ e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

}
