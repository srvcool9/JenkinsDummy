package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.ClassDTO;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.AssessmentMaster;
import com.netlink.rsk.model.DistrictMaster;
import com.netlink.rsk.model.InstitutionMaster;
import com.netlink.rsk.repository.InstitutionMasterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InstituteService implements IInstitute{

    private static final Logger LOGGER = LogManager.getLogger(InstituteService.class);

    @Autowired
    private InstitutionMasterRepository institutionRepository;

    private String text="Institute";
    private List<InstitutionMaster> institutionList;

    @Override
    public Response getInstitute(String id) {
        if(id!=null){
            LOGGER.info("Fetching institute data for id: "+id);
            institutionList = new ArrayList<>();
            DistrictMaster districtMaster = new DistrictMaster();
            districtMaster.setDistrictId(id);
            institutionList = institutionRepository.findAllByDistrictCode(districtMaster);
        }else {
            LOGGER.info("Fetching data for all institutes..");
            institutionList = new ArrayList<>();
            institutionList = institutionRepository.findAll();
        }
        if(institutionList.isEmpty()==true){
            LOGGER.info("No data found...");
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }else{
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,institutionList);
        }
    }
}
