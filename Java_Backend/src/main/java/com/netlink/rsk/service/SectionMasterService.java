package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.*;
import com.netlink.rsk.repository.GradeGroupRepository;
import com.netlink.rsk.repository.QuarterMasterRepository;
import com.netlink.rsk.repository.RoleMasterRepository;
import com.netlink.rsk.repository.SectionMasterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SectionMasterService implements ISectionMaster{

    private static final Logger LOGGER = LogManager.getLogger(SectionMasterService.class);

    @Autowired
    private SectionMasterRepository sectionRepository;

    @Autowired
    private RoleMasterRepository roleMasterRepository;

    @Autowired
    private GradeGroupRepository gradeGroupRepository;

    @Autowired
    private QuarterMasterRepository quarterMasterRepository;

    private String text="Section";
    private List<SectionMaster> sectionList;
    @Override
    public Response getAllSectionMaster(Long id) {
        if(id!=null){
            LOGGER.info("Fetching data for section id...."+id);
            SectionMaster sectionMaster= sectionRepository.findById(id).get();
            sectionList= new ArrayList<>();
            sectionList.add(sectionMaster);
        }else{
            sectionList=new ArrayList<>();
            LOGGER.info("Fetching all section data");
            Iterable<SectionMaster> sectionMasters= sectionRepository.findAll();
            for(SectionMaster sectionMaster: sectionMasters){
                List<Parameter> parameterList = mapStringToList(sectionMaster.getParameterList());
                sectionMaster.setParameterList(parameterList);
                sectionList.add(sectionMaster);
            }
        }
        if(sectionList.isEmpty()==true){
            LOGGER.info("No data found for section");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }else{
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,sectionList);
        }
    }

    @Override
    public Response getAllSelfAssessmentSection(Long id) {
        if(id!=null){
            LOGGER.info("Fetching data for section id...."+id);
            SectionMaster sectionMaster= sectionRepository.findById(id).get();
            sectionList= new ArrayList<>();
            sectionList.add(sectionMaster);
        }else{
            sectionList=new ArrayList<>();
            LOGGER.info("Fetching all section data");
            Iterable<SectionMaster> sectionMasters= sectionRepository.findAll();
            for(SectionMaster sectionMaster: sectionMasters){
                List<Parameter> parameterList = mapStringToList(sectionMaster.getParameterList());
                sectionMaster.setParameterList(parameterList);
                sectionList.add(sectionMaster);
            }
        }
        if(sectionList.isEmpty()==true){
            LOGGER.info("No data found for section");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }else{
            List<SectionMaster> selfAssessmentSections = new ArrayList<>();
            for(SectionMaster sectionMaster: sectionList){
                List<Parameter> parameterList = sectionMaster.getParameterList();
                parameterList = parameterList.stream().filter(p -> p.getPurposeId().getId().equals(78l)).collect(Collectors.toList());
                if(!parameterList.isEmpty()){
                    sectionMaster.setParameterList(parameterList);
                    selfAssessmentSections.add(sectionMaster);
                }
            }
            sectionList = selfAssessmentSections;
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,sectionList);
        }
    }

    public List<Parameter> mapStringToList(List<Parameter> parameterList){
        if(!parameterList.isEmpty()){
            for(Parameter parameter: parameterList){
                List<RoleMaster> roleMasters = new ArrayList<>();
                List<GradeGroups> gradeGroupList = new ArrayList<>();
                List<QuaterMaster> quaterMasterList = new ArrayList<>();
                String[] roles = parameter.getVisitorRoleIds().split(",");
                String[] gradeGroups = parameter.getGradeGroupIds().split(",");
                String[] quaters = parameter.getQuaterId().split(",");
                for(String role: roles){
                    LOGGER.info("Fetching role data for id: "+role);
                    roleMasters.add(roleMasterRepository.findById(Long.parseLong(role)).get());
                }
                for(String gradeGroup: gradeGroups){
                    LOGGER.info("Fetching grade group data for id: "+gradeGroup);
                    gradeGroupList.add(gradeGroupRepository.findById(Long.parseLong(gradeGroup)).get());
                }
                for(String quater:quaters) {
                    LOGGER.info("Fetching quater data for id: " + quater);
                   quaterMasterList.add(quarterMasterRepository.findById(Long.parseLong(quater)).get());
                }
                parameter.setRoleList(roleMasters);
                parameter.setGradeList(gradeGroupList);
                parameter.setQuaterMaster(quaterMasterList);
            }
        }
        return parameterList;
    }


    @Override
    public Response saveUpdateSection(SectionMaster sectionMaster) {
        if(sectionMaster!=null){
            LOGGER.info("Saving data for section  : "+sectionMaster.getSection());
            SectionMaster persisted = sectionRepository.save(sectionMaster);
            sectionList=new ArrayList<>();
            sectionList.add(persisted);
            if(sectionList.isEmpty()==false){
                LOGGER.info("Data saved successfully for section");
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,sectionList);
            }else{
                return new Response(StaticResponse.FAILURE_Status,text+StaticResponse.ADD_FAIL_MESSAGE,null);
            }
        }
        else{
            LOGGER.info("No data found for saving...");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }


}
