package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.service.IInstitute;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Institute")
public class InstituteController {

    private static final Logger LOGGER = LogManager.getLogger(InstituteController.class);

    @Autowired
    private IInstitute instituteService;

    @GetMapping(value={"/GetInstituteList","/GetInstituteList/{id}"})
    public ResponseEntity<Response> getInstitute(@PathVariable(value = "id",required = false) String id) throws Exception {
        try {
            LOGGER.info("Fetching data for institute...");
            Response response = instituteService.getInstitute(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
