package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Parameter;
import com.netlink.rsk.service.IParameterService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Parameter")
public class ParameterController {

    private static final Logger LOGGER = LogManager.getLogger(ParameterController.class);

    @Autowired
    IParameterService parameterService;

    @GetMapping(value={"/getParameterList","/getParameterList/{id}"})
    public ResponseEntity<Response> getParameters(@PathVariable(value = "id",required = false) Long id) throws Exception {
        try {
            LOGGER.info("Fetching data of parameter master...");
            Response response= parameterService.getParameterBySection(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value= "/saveParameter")
    public ResponseEntity<Response> saveParameter(@RequestBody Parameter parameter) throws Exception {
        try {
            LOGGER.info("Fetching data of parameter master...");
            Response response= parameterService.saveParameter(parameter);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/deleteParameter/{id}")
    public ResponseEntity<Response> deleteParameter(@PathVariable(value = "id") Long id){
        try {
            LOGGER.info("Deleting parameter with id : "+id);
            Response response= parameterService.deleteParameter(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
