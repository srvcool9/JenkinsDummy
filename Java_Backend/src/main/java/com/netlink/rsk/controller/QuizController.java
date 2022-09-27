package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.QuizMaster;
import com.netlink.rsk.service.IQuiz;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Quiz")
public class QuizController {

    private static final Logger LOGGER = LogManager.getLogger(QuizController.class);

    @Autowired
    private IQuiz quizService;

    @GetMapping(value={"/GetQuizList","/GetQuizList/{id}"})
    public ResponseEntity<Response> getTrainingArea(@PathVariable(value = "id",required = false) Long id) throws Exception {
        try {
            LOGGER.info("Fetching data for quiz...");
            Response response= quizService.getQuizs(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetQuizData/{trainingId}"})
    public ResponseEntity<Response> getQuiz(@PathVariable(value = "trainingId") Long id) throws Exception {
        try {
            LOGGER.info("Fetching data of quiz for training id: "+id);
            Response response= quizService.getQuizListByTraining(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateQuiz")
    public ResponseEntity<Response> saveQuiz(@RequestBody QuizMaster quiz) throws Exception {
        try{
            LOGGER.info("Saving quiz for training id: "+quiz.getTrainingId().getTrainingId());
            Response response = quizService.saveUpdateQuiz(quiz);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error!"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
