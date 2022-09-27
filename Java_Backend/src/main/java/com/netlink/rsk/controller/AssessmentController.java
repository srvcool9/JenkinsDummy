package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.AssessmentMaster;
import com.netlink.rsk.service.IAssessment;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Assessment")
public class AssessmentController {

    private static final Logger LOGGER = LogManager.getLogger(AssessmentController.class);

    @Autowired
    private IAssessment assessmentService;

    @GetMapping(value={"/GetAssessmentList","/GetAssessmentList/{id}"})
    public ResponseEntity<Response> getAssessment(@PathVariable(value = "id",required = false) Long id ) throws Exception {
        try {
            LOGGER.info("Fetching assessmentList.....");
            Response response = assessmentService.getAssessmentList(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateAssessment")
    public ResponseEntity<Response> saveRole(@RequestBody AssessmentMaster assessmentMaster) throws Exception {
        try{
            LOGGER.info("Saving assessment data for ....."+assessmentMaster.getAssessmentName());
            Response response = assessmentService.saveAssessment(assessmentMaster);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetAssessmentsByGroup/{id}"})
    public ResponseEntity<Response> getAssessments(@PathVariable(value = "id",required = false) Long id ) throws Exception {
        try {
            LOGGER.info("Fetching data for assessment group....");
            Response response = assessmentService.getAssessmentByGroup(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetTests"})
    public ResponseEntity<Response> getTodayTests() throws Exception {
        try {
            LOGGER.info("Fetching data for assessment group....");
            Response response = new Response(null,null,null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
