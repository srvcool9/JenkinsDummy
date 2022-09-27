package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.TypeMaster;
import com.netlink.rsk.service.ITypeMasterService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders="*")
@RequestMapping("TypeMaster")
public class TypeMasterController {

    private static final Logger LOGGER = LogManager.getLogger(TypeMasterController.class);

    @Autowired
    ITypeMasterService typeMasterService;

    @GetMapping(value="/getAllTypes")
    public ResponseEntity<Response> getParameters() throws Exception {
        try {
            LOGGER.info("Fetching data of TypeMaster...");
            Response response= typeMasterService.getAllTypes();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value= "/saveTypes")
    public ResponseEntity<Response> saveParameter(@RequestBody List<TypeMaster> typeMasterList) throws Exception {
        try {
            LOGGER.info("Saving data of TypeMaster...");
            Response response= typeMasterService.saveTypes(typeMasterList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
