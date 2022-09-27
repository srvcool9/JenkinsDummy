package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.*;
import com.netlink.rsk.repository.VisitAssessmentRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VisitAssessmentService implements IVisitAssessmentService{

    private static final Logger LOGGER = LogManager.getLogger(VisitAssessmentService.class);

    private List<VisitAssessment> visitAssessmentList;
    private  String text="VisitAssessment";

    @Autowired
    VisitAssessmentRepository visitAssessmentRepository;

    @Override
    public Response saveVisitAssessment(VisitAssessment visitAssessment) {
        visitAssessmentList = new ArrayList<>();
        if(visitAssessment.getVisitAssessmentId()==null){
            LOGGER.info("Creating new assessment");
            VisitAssessment alreadyExists = new VisitAssessment();
            if(visitAssessment.getYear()!=null){
                alreadyExists = visitAssessmentRepository.findByYear(visitAssessment.getYear());
            }
            if(alreadyExists!=null){
                return new Response(StaticResponse.FAILURE_Status,text+StaticResponse.YEAR_ALREADY_EXIST,null);
            }
            VisitAssessment persist = visitAssessmentRepository.save(visitAssessment);
            visitAssessmentList.add(persist);
        }else{
            LOGGER.info("Saving Data for visit assessment: "+visitAssessment.getVisitAssessmentId());
            VisitAssessment persist = visitAssessmentRepository.save(visitAssessment);
            visitAssessmentList.add(persist);
        }
        if(!visitAssessmentList.isEmpty()){
            LOGGER.info("Data saved successfully for Visit Assessment");
            return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,visitAssessmentList);
        }else{
            return new Response(StaticResponse.FAILURE_Status,text+StaticResponse.ADD_FAIL_MESSAGE,null);
        }
    }

    @Override
    public Response getVisitAssessment(SchoolMaster udiseCode) {
        visitAssessmentList = new ArrayList<>();
        if(udiseCode!=null){
            LOGGER.info("Fetching data for UDISE Code...."+udiseCode.getUdiseCode());
            VisitAssessment visitAssessment= visitAssessmentRepository.findByUdiseCode(udiseCode);
            visitAssessmentList.add(visitAssessment);
        }
        if(visitAssessmentList.isEmpty()){
            LOGGER.info("No data found for UDISE Code");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }else{
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,visitAssessmentList);
        }
    }
}
