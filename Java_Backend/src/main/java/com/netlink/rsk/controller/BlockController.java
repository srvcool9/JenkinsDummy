package com.netlink.rsk.controller;

import com.netlink.rsk.dto.Response;
import com.netlink.rsk.service.IBlock;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("Block")
public class BlockController {

    private static final Logger LOGGER = LogManager.getLogger(BlockController.class);

    @Autowired
    private IBlock blockService;

    @GetMapping(value={"/GetBlockList","/GetBlockList/{id}"})
    public ResponseEntity<Response> getGroups(@PathVariable(value = "id",required = false) String id ) throws Exception {
        try {
            LOGGER.info("Fetching data of blocks.... ");
            Response response = blockService.fetchALLBlock(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Error!  "+e.getMessage());
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
