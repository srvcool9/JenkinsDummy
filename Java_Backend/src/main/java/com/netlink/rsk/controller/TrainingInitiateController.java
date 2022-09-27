package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchInitiate;

import com.netlink.rsk.service.IBatchInitiate;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("BatchInitiate")
public class TrainingInitiateController {
    private static final Logger LOGGER = LogManager.getLogger(TrainingInitiateController.class);

    @Autowired
    private IBatchInitiate batchInitiateService;

    @GetMapping(value={"/GetBatchInitiate","/GetBatchInitiate/{id}"})
    public ResponseEntity<Response> getBatchInitiate(@PathVariable(value = "id",required = false) Long id) throws Exception {
        try {
            LOGGER.info("Fetching data for BatchInitiate...");
            Response response= batchInitiateService.getBatchInitiate(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/AddUpdateBatchInitiate")
    public ResponseEntity<Response> saveBatchInitiate
            (@RequestBody BatchInitiate batchInitiate) throws Exception {
        try{
            LOGGER.info("Saving training.....");
            Response response = batchInitiateService.saveBatchInitiate(batchInitiate);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error:"+ e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetBatch/{trainingId}"})
    public ResponseEntity<Response> getBatches(@PathVariable(value = "trainingId") Long trainingId) throws Exception {
        try {
            LOGGER.info("Fetching data for BatchInitiate...");
            Response response= batchInitiateService.getBatchByTrainingId(trainingId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
