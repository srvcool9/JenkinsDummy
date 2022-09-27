package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.dto.RoleAreaDTO;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.service.ITraining;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Training")
public class TrainingController {
    private static final Logger LOGGER = LogManager.getLogger(TrainingController.class);
    @Autowired
    private ITraining iTraining;

    @GetMapping(value ={"/GetTrainingList","/GetTrainingList/{id}"})
    public ResponseEntity<Response> getTrainings(@PathVariable(value = "id",required = false) Long id )
            throws Exception{
        try {
            LOGGER.info("Fetching training.....");
            Response response = iTraining.getTraining(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateTraining")
    public ResponseEntity<Response> saveTraining
            (@RequestBody Training training) throws Exception {
        try{
            LOGGER.info("Saving training.....");
            Response response = iTraining.saveTraining(training);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error:"+ e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value ="/GetTrainingByArea")
    public ResponseEntity<Response> getTrainingData(@RequestBody List<RoleAreaDTO> roleAreaDTOList)
            throws Exception{
        try {
            LOGGER.info("Fetching training.....");
            Response response = iTraining.getTrainingByArea(roleAreaDTOList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping(value = {"/GetTrainingBySubGroup/{id}"})
    public ResponseEntity<Response> getTrainingBySubGroup(@PathVariable(value = "id",required = false)Long id)throws Exception{
        try {
            LOGGER.info("Fetching Training by Sub Group id : "+id);
            Response response = iTraining.getTrainingBySubGroup(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        catch (Exception e){
            LOGGER.error("Error (in fetching Training by subGroup id) : "+id+" "+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

}
