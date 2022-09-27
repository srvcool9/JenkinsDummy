package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.MonitorComment;
import com.netlink.rsk.repository.MonitorCommentRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class MonitorCommentService implements IMonitorComment {

    private static final Logger LOGGER = LogManager.getLogger(MonitorCommentService.class);

    @Autowired
    private MonitorCommentRepository monitorCommentRepository;

    private String text="Monitorcomment";
    private List<MonitorComment> monitorCommentList;

    @Override
    public Response saveUpdateMonitorComment(MonitorComment monitorComment) {
        if(monitorComment!=null){
            LOGGER.info("Saving data for quiz id : "+monitorComment.getMonitorCommentId());
            MonitorComment persisted = monitorCommentRepository.save(monitorComment);
            monitorCommentList=new ArrayList<>();
            monitorCommentList.add(persisted);
            if(monitorComment.getMonitorCommentId()!=null){
                LOGGER.info("Data saved successfully for quiz");
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.UPDATE_SUCCESS_MESSAGE,monitorCommentList);
            }else{
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,monitorCommentList);
            }
        }
        else{
            LOGGER.info("No data found for saving...");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }
}
