package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BlockMaster;
import com.netlink.rsk.repository.BlockMasterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BlockService implements IBlock{

    private static final Logger LOGGER = LogManager.getLogger(BlockService.class);

    @Autowired
    private BlockMasterRepository blockRepository;

    private List<BlockMaster> blockList;
    private String text="Block";

    @Override
    public Response fetchALLBlock(String id) {
        if (id != null) {
            LOGGER.info("Fetching data for  block id:" +id);
            blockList = new ArrayList<>();
            BlockMaster blockMaster = blockRepository.findById(id).get();
            blockList.add(blockMaster);
        } else {
            blockList = new ArrayList<>();
            LOGGER.info("Fetching all data for  block");
            blockList = blockRepository.findAll();
        }
        if (blockList.isEmpty() == true) {
            LOGGER.error("No data found for block");
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.NO_DATA, null);
        } else {
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.DATA_FETCHED, blockList);
        }
    }
}
