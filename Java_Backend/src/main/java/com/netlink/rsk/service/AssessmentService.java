package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.ClassDTO;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.AssessmentMaster;
import com.netlink.rsk.model.GroupMaster;
import com.netlink.rsk.repository.AssessmentMasterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AssessmentService implements IAssessment{

    private static final Logger LOGGER = LogManager.getLogger(AssessmentService.class);

    @Autowired
    private AssessmentMasterRepository assessmentRepository;

    private List<AssessmentMaster> assessmentList;
    private String text="Assessment";

    @Override
    public Response getAssessmentList(Long id) {
        LOGGER.info("Fetching assessment for id :"+id);
        if(id!=null){
            assessmentList = new ArrayList<>();
            AssessmentMaster assessment= assessmentRepository.findById(id).get();
            List<ClassDTO> classDTOList =getClasses(assessment.getClassList());
            assessment.setClasses(classDTOList);
            assessmentList.add(assessment);
        }else{
           assessmentList = new ArrayList<>();
            LOGGER.info("Fetching all assessment data...");
            assessmentList= assessmentRepository.findAll();
            assessmentList.stream().filter(a-> {
                if(a.getClassList()!=null) {
                    a.setClasses(getClasses(a.getClassList()));
                }return false;
            }).collect(Collectors.toList());

        }
        if(assessmentList.isEmpty()==true){
            LOGGER.info("No data found!!");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }
        List<AssessmentMaster> data =sorting(assessmentList);
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,data);
    }

    @Override
    public Response saveAssessment(AssessmentMaster assessmentMaster) {
        if(assessmentMaster!=null){
            AssessmentMaster assessment= generateClassList(assessmentMaster);
            AssessmentMaster persisted = assessmentRepository.save(assessment);
            LOGGER.info(persisted.getAssessmentName()+" data saved successfully..");
            assessmentList= new ArrayList<>();
            assessmentList.add(persisted);
            if(assessmentMaster.getAssessmentId()!=null){
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.UPDATE_SUCCESS_MESSAGE,null);
            }else{
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,null);
            }
        }
        else {
            LOGGER.error("Error! no data found..");
            return new Response(StaticResponse.FAILURE_Status, StaticResponse.FIELD_MISSING, null);
        }
    }

    @Override
    public Response getAssessmentByGroup(Long id) {
        GroupMaster groupMaster = new GroupMaster();
        LOGGER.info("Fetching data for assessment group id: "+id);
        groupMaster.setGroupId(id);
        List<AssessmentMaster> assessmentMasterList= assessmentRepository.findByGroup(groupMaster);
        assessmentMasterList.stream().filter(a-> {
            if(a.getClassList()!=null) {
                a.setClasses(getClasses(a.getClassList()));
            }return false;
        }).collect(Collectors.toList());
        if(assessmentMasterList.isEmpty()==false){
            return new Response(StaticResponse.SUCCESS_Status, StaticResponse.DATA_FETCHED, assessmentMasterList);
        }
        LOGGER.error("No data found..");
        return new Response(StaticResponse.FAILURE_Status, StaticResponse.NO_DATA, null);
    }

    public  AssessmentMaster generateClassList(AssessmentMaster assessment){
        LOGGER.info("Converting class list into string.....");
        StringJoiner joinerNew = new StringJoiner(",");
        List<ClassDTO> classDTOList = assessment.getClasses();
        classDTOList.forEach(c-> {
            if(c.getId()!=null){
                joinerNew.add(String.valueOf(c.getId()));
            }
        });
        String classList= joinerNew.toString();
        assessment.setClassList(classList);
        return assessment;
    }

    public List<ClassDTO> getClasses(String classList){
        LOGGER.info("Converting classes from string to list...");
        List<ClassDTO> classDTOList = new ArrayList<>();
        String[] ids = classList.split("\\,");
        for (String id : ids) {
            ClassDTO classDTO = new ClassDTO();
            Long classId= Long.parseLong(id);
            classDTO.setId(classId);
            classDTO.setName(classId.toString());
            classDTOList.add(classDTO);
        }
        return  classDTOList;
    }

    private List<AssessmentMaster> sorting(List<AssessmentMaster> list) {
        //sorting data by time
        LOGGER.info("Sorting assessment list...");
        Collections.sort(list, new Comparator<AssessmentMaster>() {
            @Override
            public int compare(AssessmentMaster o1, AssessmentMaster o2) {
                try {
                    String currentDate = LocalDateTime.now().toString();
                    return currentDate.compareTo(o1.getUpdatedOn().toString());
                } catch (Exception e) {
                    e.printStackTrace();
                    return 0;
                }
            }
        });
        return list;
    }
}
