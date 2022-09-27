package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Coordinator;
import com.netlink.rsk.service.ICoordinator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Coordinator")
public class CoordinatorController {

    private static final Logger LOGGER = LogManager.getLogger(CoordinatorController.class);

    @Autowired
    private ICoordinator coordinatorService;

    @PostMapping("/AddUpdateCoordinators")
    public ResponseEntity<Response> saveRole(@RequestBody List<Coordinator> coordinatorList) throws Exception {
        try{
            LOGGER.info("Saving coordinator data.....");
            Response response = coordinatorService.saveUpdateCoordinator(coordinatorList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetBatchDetails/{empCode}","/GetCoordinator/{batchId}"})
    public ResponseEntity<Response> getCoordinators(@PathVariable(value = "empCode",required = false) String empCode,@PathVariable(value = "batchId",required = false) Long batchId ) throws Exception {
        try {
            LOGGER.info("Fetching coordinator data.....");
            Response response = coordinatorService.getCoodinatorData(empCode,batchId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
