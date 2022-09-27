package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.dto.RoleAreaDTO;
import com.netlink.rsk.model.TrainingArea;
import com.netlink.rsk.service.ITrainingArea;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("TrainingArea")
public class TrainingAreaController {

    private static final Logger LOGGER = LogManager.getLogger(TrainingAreaController.class);

    @Autowired
    private ITrainingArea trainingAreaService;

    @GetMapping(value={"/GetTrainingAreaList","/GetTrainingAreaList/{id}"})
    public ResponseEntity<Response> getTrainingArea(@PathVariable(value = "id",required = false) Long id) throws Exception {
        try {
            LOGGER.info("Fetching data for training areas...");
            Response response= trainingAreaService.getTrainingAreaList(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"GetTrainingAreas/{TrainingId}"})
    public ResponseEntity<Response> getAreas(@PathVariable(value = "TrainingId",required = false) Long id) throws Exception {
        try {
            LOGGER.info("Fetching data for training areas for training id: "+id);
            Response response= trainingAreaService.getAreasByTrainingId(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateTrainingArea")
    public ResponseEntity<Response> saveTrainingAreas(@RequestBody List<TrainingArea> trainingAreas) throws Exception {
        try{
            LOGGER.info("Saving training areas data...");
            Response response = trainingAreaService.saveUpdateTrainingArea(trainingAreas);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error!"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/DeleteTrainingArea/{id}")
    public ResponseEntity<Response> deleteCheckListMaster(@PathVariable(value = "id") Long id) throws Exception {
        try{
            LOGGER.info("Deleting training area id: "+id);
            Response response = trainingAreaService.deleteArea(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error!"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value ="/GetUsersTraining")
    public ResponseEntity<Response> getUserRespectiveTraining(@RequestBody List<RoleAreaDTO> roleAreaDTOList)
            throws Exception{
        try {
            LOGGER.info("Fetching training.....");
            Response response = trainingAreaService.getUserRespectiveTraining(roleAreaDTOList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

}
