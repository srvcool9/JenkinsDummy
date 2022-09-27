package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.GroupMaster;
import com.netlink.rsk.service.IGroup;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Group")
public class GroupController {

    private static final Logger LOGGER = LogManager.getLogger(GroupController.class);

    @Autowired
    private IGroup group;

    @GetMapping(value={"/GetGroupList","/GetGroupList/{id}"})
    public ResponseEntity<Response> getGroups(@PathVariable(value = "id",required = false) Long id ) throws Exception {
        try {
            LOGGER.info("Fetching data for group....");
            Response response = group.getGroups(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error!"+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/AddUpdateGroup")
    public ResponseEntity<Response> saveRole(@RequestBody GroupMaster groupMaster) throws Exception {
        try{
              Response response = group.saveGroup(groupMaster);
             return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error!"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
