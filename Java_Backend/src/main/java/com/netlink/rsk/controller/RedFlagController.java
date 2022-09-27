package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.GroupMaster;
import com.netlink.rsk.model.RedFlag;
import com.netlink.rsk.service.IRedFlag;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("RedFlag")
public class RedFlagController {
    private static final Logger LOGGER = LogManager.getLogger(RedFlagController.class);

    @Autowired
    private IRedFlag iRedFlag;

    @PostMapping("/AddUpdateRedFlag")
    public ResponseEntity<Response> saveRedFlag
            (@RequestBody RedFlag redFlag) throws Exception {
        try{
            Response response = iRedFlag.saveUpdateRedFlag(redFlag);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            LOGGER.error("Error!"+e.getMessage());
            return new ResponseEntity(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
