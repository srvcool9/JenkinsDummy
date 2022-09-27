package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.SectionMaster;
import com.netlink.rsk.service.ISectionMaster;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("SectionMaster")
public class SectionMasterController {

    private static final Logger LOGGER = LogManager.getLogger(SectionMasterController.class);

    @Autowired
    private ISectionMaster sectionMasterService;

    @GetMapping(value={"/getSectionList","/getSectionList/{id}"})
    public ResponseEntity<Response> getSectionData(@PathVariable(value = "id",required = false) Long id) throws Exception {
        try {
            LOGGER.info("Fetching data of section master...");
            Response response= sectionMasterService.getAllSectionMaster(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/getSelfAssessmentSectionList","/getSelfAssessmentSectionList/{id}"})
    public ResponseEntity<Response> getSelfAssessmentSectionList(@PathVariable(value = "id",required = false) Long id) throws Exception {
        try {
            LOGGER.info("Fetching data of section master...");
            Response response= sectionMasterService.getAllSelfAssessmentSection(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateSection")
    public ResponseEntity<Response> saveSection
            (@RequestBody SectionMaster sectionMaster) throws Exception {
        try{
            LOGGER.info("Saving section.....");
            Response response = sectionMasterService.saveUpdateSection(sectionMaster);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error:"+ e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
