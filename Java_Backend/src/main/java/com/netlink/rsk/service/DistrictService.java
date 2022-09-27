package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.DistrictMaster;
import com.netlink.rsk.repository.DistrictMasterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class DistrictService implements IDistrict{

    private static final Logger LOGGER = LogManager.getLogger(DistrictService.class);

    @Autowired
    private DistrictMasterRepository districtRepository;

    private List<DistrictMaster> districtList;
    private String text="District";

    @Override
    public Response getAllDistrict(String id) {
            if (id != null) {
                LOGGER.info("Fetching data of institute id :"+id);
                districtList = new ArrayList<>();
                DistrictMaster districtMaster = districtRepository.findById(id).get();
                districtList.add(districtMaster);
            } else {
                districtList = new ArrayList<>();
                LOGGER.info("Fetching all data of institutes");
                districtList = districtRepository.findAll();
            }
            if (districtList.isEmpty() == true) {
                LOGGER.info("No data found");
                return new Response(StaticResponse.SUCCESS_Status, StaticResponse.NO_DATA, null);
            } else {
                return new Response(StaticResponse.SUCCESS_Status, StaticResponse.DATA_FETCHED, districtList);
            }
    }
}
