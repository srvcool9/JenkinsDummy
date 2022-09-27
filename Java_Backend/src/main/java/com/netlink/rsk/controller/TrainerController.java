package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TrainerMaster;
import com.netlink.rsk.service.ITrainer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Trainer")
public class TrainerController {
    private static final Logger LOGGER = LogManager.getLogger(TrainerController.class);

    @Autowired
    private ITrainer trainerMasterService;

    @GetMapping(value={"/GetTrainerList","/GetTrainerList/{id}"})
    public ResponseEntity<Response> getTrainerList(@PathVariable(value = "id",required = false) Long id) throws Exception {
        try {
            LOGGER.info("Fetching data for Trainer...");
            Response response= trainerMasterService.getTrainerList(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/AddUpdateTrainer/{batchId}")
    public ResponseEntity<Response> saveBatchInitiate
            (@RequestBody List<TrainerMaster> trainerMasterList,@PathVariable(value = "batchId") Long batchId) throws Exception {
        try{
            LOGGER.info("Saving trainer.....");
            Response response = trainerMasterService.saveTrainer(trainerMasterList,batchId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error:"+ e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}

