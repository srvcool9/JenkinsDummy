package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Allocation;
import com.netlink.rsk.service.IAllocation;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Allocation")
public class AllocationController {

    private static final Logger LOGGER = LogManager.getLogger(AllocationController.class);

    @Autowired
    private IAllocation allocationService;

    @GetMapping(value={"/GetAllocationList","/GetAllocationList/{id}"})
    public ResponseEntity<Response> getGroups(@PathVariable(value = "id",required = false) Long id ) throws Exception {
        try {
            LOGGER.info("Fetching allocation data.....");
            Response response = allocationService.getAllAllocation(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateAllocation")
    public ResponseEntity<Response> saveRole(@RequestBody Allocation allocation) throws Exception {
        try{
            LOGGER.info("Saving allocation data.....");
            Response response = allocationService.addUpdateAllocation(allocation);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error :"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
