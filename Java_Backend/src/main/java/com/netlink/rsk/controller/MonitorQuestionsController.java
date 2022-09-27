package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Coordinator;
import com.netlink.rsk.model.MonitorQuestions;
import com.netlink.rsk.service.IMonitorQuestions;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("MonitorQuestions")
public class MonitorQuestionsController {

    private static final Logger LOGGER = LogManager.getLogger(MonitorQuestionsController.class);
    @Autowired
    private IMonitorQuestions monitorQuestionsService;

    @PostMapping("/AddUpdateMonitorQuestions")
    public ResponseEntity<Response> saveMonitorQuestions(@RequestBody List<MonitorQuestions> monitorQuestionsList) throws Exception {
        try{
            LOGGER.info("Saving monitor questions data.....");
            Response response = monitorQuestionsService.addUpdateMonitorQuestions(monitorQuestionsList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetMonitorQuestionsList/{trainingId}"})
    public ResponseEntity<Response> getMonitorQuestionList(@PathVariable(value = "trainingId") Long trainingId) throws Exception {
        try {
            LOGGER.info("Fetching data of monitor questions...");
            Response response= monitorQuestionsService.getMonitorQues(trainingId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/DeleteMonitorQues/{Id}")
    public ResponseEntity<Response> deleteMonitorQuestion(@PathVariable(value = "Id") Long quesId) throws Exception {
        try{
            LOGGER.info("Deleting monitor question id: "+quesId);
            Response response = monitorQuestionsService.deleteMonitorQues(quesId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error!"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
