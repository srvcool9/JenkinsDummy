package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TrainingGroupMaster;
import com.netlink.rsk.service.ITrainingGroup;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("TrainingGroup")

public class TrainingGroupController {

    private static final Logger LOGGER = LogManager.getLogger(TrainingGroupController.class);

    @Autowired
    private ITrainingGroup iTrainingGroup;

    @GetMapping(value ={"/GetTrainingGroupList","/GetTrainingGroupList/{id}"})
    public ResponseEntity<Response> getTrainingGroups(@PathVariable(value = "id",required = false) Long id )
            throws Exception{
        try {
            LOGGER.info("Fetching training groups.....");
            Response response = iTrainingGroup.getTrainingGroups(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateTrainingGroup")
    public ResponseEntity<Response> saveTrainingGroup
            (@RequestBody TrainingGroupMaster trainingGroupMaster) throws Exception {
        try{
            LOGGER.info("Saving training groups ....");
            Response response = iTrainingGroup.saveTrainingGroups(trainingGroupMaster);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error (in saving training groups...)"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
