package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.CheckListItems;
import com.netlink.rsk.model.CheckListMaster;
import com.netlink.rsk.service.ICheckList;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("TrainingCheckList")
public class TrainingCheckListController {

    private static final Logger LOGGER = LogManager.getLogger(TrainingCheckListController.class);
    @Autowired
    private ICheckList checkListService;

    @GetMapping(value={"/GetCheckList","/GetCheckList/{id}"})
    public ResponseEntity<Response> getAllCheckList(@PathVariable(value = "id",required = false) Long id) throws Exception {
        try {
            LOGGER.info("Fetching data for Checklist...");
            Response response= checkListService.getCheckList(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/AddUpdateCheckList")
    public ResponseEntity<Response> saveTraining
            (@RequestBody List<CheckListMaster> checkList) throws Exception {
        try{
            LOGGER.info("Saving checklist.....");
            Response response = checkListService.saveCheckList(checkList);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.info("Error:"+ e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value={"/GetCheckListData/{trainingId}"})
    public ResponseEntity<Response> getTrainingCheckList(@PathVariable(value = "trainingId") Long trainingId) throws Exception {
        try {
            LOGGER.info("Fetching data for Checklist...");
            Response response= checkListService.getCheckListByTrainingId(trainingId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error: "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @DeleteMapping("/DeleteCheckListMaster/{checkListId}")
    public ResponseEntity<Response> deleteCheckListMaster(@PathVariable(value = "checkListId") Long checkListId) throws Exception {
        try{
            LOGGER.info("Deleting check list data of  id: "+checkListId);
            Response response = checkListService.deleteCheckListMaster(checkListId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error!"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/DeleteCheckListItem/{itemId}")
    public ResponseEntity<Response> deleteItem(@PathVariable(value = "itemId") Long itemId) throws Exception {
        try{
            LOGGER.info("Deleting check list item data for id: "+itemId);
            Response response = checkListService.deleteCheckListItem(itemId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error!"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

}
