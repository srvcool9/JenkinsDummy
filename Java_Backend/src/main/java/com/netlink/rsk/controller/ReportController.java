package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.service.IReport;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Report")
public class ReportController {

    private static final Logger LOGGER = LogManager.getLogger(ReportController.class);

    @Autowired
    private IReport reportService;

    @GetMapping("/getReport/{reportId}/{assessmentId}")
    @Transactional
    public ResponseEntity<Response> getReport(@PathVariable(value = "reportId") Long reportId,@PathVariable(value = "assessmentId") Long assessmentId)  {
        try {
            LOGGER.info("Fetching assessment report....");
            Response response = reportService.getStateLevelEnumerator(reportId,assessmentId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
