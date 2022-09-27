package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.EnumeratorRegistration;
import com.netlink.rsk.service.IMonitorPhotos;
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
@RequestMapping("MonitorPhotos")
public class MonitorPhotosController {

    private static final Logger LOGGER = LogManager.getLogger(MonitorPhotosController.class);

    @Autowired
    private IMonitorPhotos monitorPhotosService;

    @PostMapping(value = "/uploadMonitorPhotos/{batchId}" ,consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Response> saveRole(@RequestPart(value = "image") List<MultipartFile> files,@PathVariable(value = "batchId") Long batchId) throws Exception {
        try{
            LOGGER.info("Uploading all images to the server....");
           Response response = monitorPhotosService.uploadPhotos(files,batchId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error "+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
