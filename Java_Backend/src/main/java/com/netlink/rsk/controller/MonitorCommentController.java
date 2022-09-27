package com.netlink.rsk.controller;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.MonitorComment;
import com.netlink.rsk.service.IMonitorComment;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Monitorcomment")
public class MonitorCommentController {

    private static final Logger LOGGER = LogManager.getLogger(MonitorCommentController.class);

    @Autowired
    private IMonitorComment monitorCommentService;

    @PostMapping("/AddUpdateMonitorComments")
    public ResponseEntity<Response> saveUpdateMonitorComment(@RequestBody MonitorComment monitorComment) throws Exception {
        try {
            LOGGER.info("Saving monitorComment data.....");
            Response response = monitorCommentService.saveUpdateMonitorComment(monitorComment);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.info("Error" + e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}

