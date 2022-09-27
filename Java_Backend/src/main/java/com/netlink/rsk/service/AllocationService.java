package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.ClassDTO;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Allocation;
import com.netlink.rsk.repository.AllocationRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AllocationService implements IAllocation {

    private static final Logger LOGGER = LogManager.getLogger(AllocationService.class);

    @Autowired
    private AllocationRepository allocationRepository;

    private List<Allocation> allocationList;
    private String text="Allocation";

    @Override
    public Response getAllAllocation(Long id) {
        if(id!=null){
            allocationList = new ArrayList<>();
            LOGGER.info("Fetching data for allocation id: "+id);
            Allocation allocation= allocationRepository.findById(id).get();
            allocationList.add(allocation);
        }else{
            allocationList = new ArrayList<>();
            LOGGER.info("Fetching all data of Allocation");
            allocationList= allocationRepository.findAll();
        }
        if(allocationList.isEmpty()==true){
            LOGGER.info("No data found");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }
        LOGGER.info("Converting class list from string to list...");
        allocationList.stream().filter(a-> {
            if(a.getClasses()!=null) {
                a.setClassList(getClasses(a.getClasses()));
            }return false;
        }).collect(Collectors.toList());
        List<Allocation> data =sorting(allocationList);
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,data);
    }

    @Override
    public Response addUpdateAllocation(Allocation allocation) {
        if(allocation!=null){
            Allocation allocation1= generateClassList(allocation);
            LOGGER.info("Allocating enumerator :"+allocation.getEnumerator().getEnumeratorName());
            Allocation persisted = allocationRepository.save(allocation1);
            if(persisted!=null && allocation.getAllocationId()!=null){
                LOGGER.info("Enumerator allocated successfully :"+allocation.getEnumerator().getEnumeratorName());
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.UPDATE_SUCCESS_MESSAGE,null);
            }else{
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,null);
            }
        }
        else {
            LOGGER.error("Field are missing! unable to save");
            return new Response(StaticResponse.FAILURE_Status, StaticResponse.FIELD_MISSING, null);
        }
    }

    private List<Allocation> sorting(List<Allocation> list) {
        //sorting data by time
        LOGGER.info("Sorting allocation list...");
        Collections.sort(list, new Comparator<Allocation>() {
            @Override
            public int compare(Allocation o1, Allocation o2) {
                try {
                    String currentDate = LocalDateTime.now().toString();
                    return currentDate.compareTo(String.valueOf(o1.getUpdatedOn()));
                } catch (Exception e) {
                    e.printStackTrace();
                    return 0;
                }
            }
        });
        return list;
    }

    public Allocation generateClassList(Allocation allocation){
        LOGGER.info("Converting class listing into string");
        StringJoiner joinerNew = new StringJoiner(",");
        List<ClassDTO> classDTOList = allocation.getClassList();
        classDTOList.forEach(c-> {
            if(c.getId()!=null){
                LOGGER.info("Appending class id :"+c.getId());
                joinerNew.add(String.valueOf(c.getId()));
            }
        });
        String classList= joinerNew.toString();
        allocation.setClasses(classList);
        return allocation;
    }

    public List<ClassDTO> getClasses(String classList){
        LOGGER.info("Converting classes string into list");
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

}
