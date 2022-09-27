package com.netlink.rsk.controller;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TrainingMaterial;
import com.netlink.rsk.service.ITrainingMaterial;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("TrainingMaterial")
public class TrainingMaterialController {

    private static final Logger LOGGER = LogManager.getLogger(TrainingMaterialController.class);

    @Autowired
    private ITrainingMaterial materialService;

    @PostMapping(value ="/saveTrainingDocument", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Response> saveReward(@RequestPart(value = "file", required = false) List<MultipartFile> files,
                                      @RequestPart("training") List<TrainingMaterial> trainingMaterials) throws Exception {
      LOGGER.info("Saving training documents..");
        if (files != null) {
            Response response = materialService.saveTrainingDocuments(trainingMaterials,files);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else{
            LOGGER.error("Error: "+ StaticResponse.ERROR);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetTrainingMaterialList","/GetTrainingMaterialList/{id}"})
    public ResponseEntity<Response> getMaterials(@PathVariable(value = "id",required = false) Long id ) throws Exception {
        try {
            LOGGER.info("Fetching training material data.....");
            Response response = materialService.getTrainingMaterialData(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetTrainingMaterials/{trainingId}"})
    public ResponseEntity<Response> getMaterialData(@PathVariable(value = "trainingId") Long trainingId ) throws Exception {
        try {
            LOGGER.info("Fetching training material data for training id: "+trainingId);
            Response response = materialService.fetchByTrainingId(trainingId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/DeleteMaterial/{id}")
    public ResponseEntity<Response> deleteMaterial(@PathVariable(value = "id") Long id) throws Exception {
        try{
            LOGGER.info("Deleting material for id: "+id);
            Response response = materialService.deleteMaterial(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error!"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
