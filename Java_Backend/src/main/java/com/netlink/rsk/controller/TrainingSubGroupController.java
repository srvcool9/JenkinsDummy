package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TrainingSubGroupMaster;
import com.netlink.rsk.service.ITrainingSubGroup;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders="*")
@RequestMapping("TrainingSubGroup")
public class TrainingSubGroupController {

    private static final Logger LOGGER = LogManager.getLogger(TrainingSubGroupController.class);

    @Autowired
    private ITrainingSubGroup iTrainingSubGroup;

    @GetMapping(value = {"/GetTrainingSubGroupList","/GetTrainingSubGroupList/{id}"})
    public ResponseEntity<Response> getTrainingSubGroups(@PathVariable (value="id",
            required=false) Long id) throws  Exception{
        try{
            LOGGER.info("Fetching Training Sub Groups .....");
            Response response = iTrainingSubGroup.getTrainingSubGroupList(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error (in fetching training sub group) ...."+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateTrainingSubGroup")
    public ResponseEntity<Response> saveTrainingSubGroup(
            @RequestBody TrainingSubGroupMaster trainingSubGroupMaster)throws Exception{
        try {
            LOGGER.info("Saving Training Sub Group Data .....");
            Response response = iTrainingSubGroup.saveTrainingSubGroup(trainingSubGroupMaster);
            return new ResponseEntity<>(response,HttpStatus.OK);
        }
        catch (Exception e){
            LOGGER.error("Error (in saving training sub group) : "+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = {"/GetSubGroupByGroup/{id}"})
    public ResponseEntity<Response> getSubGroupByGroup(@PathVariable(value = "id", required = false) Long id)throws Exception{
        try{
            LOGGER.info("Fetching subGroup by Group id : "+id);
            Response response = iTrainingSubGroup.getSubGroupByGroup(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e){
            LOGGER.error("Error (in fetching subGroup by group id) : "+id+" "+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

}
