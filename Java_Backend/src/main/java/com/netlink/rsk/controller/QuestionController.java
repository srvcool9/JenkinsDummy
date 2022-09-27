package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.QuestionMaster;
import com.netlink.rsk.service.IQuestion;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Question")
public class QuestionController {

    private static final Logger LOGGER = LogManager.getLogger(QuestionController.class);

    @Autowired
    private IQuestion questionService;

    @GetMapping(value={"/GetQuestionsList/{quizId}"})
    public ResponseEntity<Response> getQuestionByQuiz(@PathVariable(value = "quizId") Long quizId) throws Exception {
        try {
            LOGGER.info("Fetching questions for quiz id: "+quizId);
            Response response= questionService.getQuestions(quizId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetQuestionsList/{quizId}/{day}"})
    public ResponseEntity<Response> getQuestionByDay(@PathVariable(value = "quizId") Long quizId,@PathVariable(value = "day") Integer day) throws Exception {
        try {
            LOGGER.info("Fetching questions for day: "+day);
            Response response= questionService.getQuestionByDay(quizId,day);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateQuestions")
    public ResponseEntity<Response> saveQuestions(@RequestBody List<QuestionMaster> questionList) throws Exception {
        try{
            LOGGER.info("Saving questions for quiz ");
            Response response = questionService.saveUpdateQuestion(questionList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error!"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/DeleteQuestion/{id}")
    public ResponseEntity<Response> deleteQuestion(@PathVariable(value = "id") Long id) throws Exception {
        try{
            LOGGER.info("Deleting question for id: "+id);
            Response response = questionService.deleteQuestion(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error!"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetQuestionsList/{quizId}/{trainingId}/{day}"})
    public ResponseEntity<Response> getQuestionByTraining(@PathVariable(value = "quizId") Long quizId,
                                                          @PathVariable(value = "trainingId") Long trainingId,
                                                          @PathVariable(value = "day") Integer day
    ) throws Exception {
        try {
            LOGGER.info("Fetching questions for training id: "+trainingId);
            Response response= questionService.getQuestionListByTraining(quizId,trainingId,day);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
