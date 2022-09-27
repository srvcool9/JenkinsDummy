package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.BatchMaster;
import com.netlink.rsk.model.Coordinator;
import com.netlink.rsk.model.EmployeeMaster;
import com.netlink.rsk.model.EnumeratorRegistration;
import com.netlink.rsk.repository.CoordinatorRepository;
import jdk.dynalink.linker.LinkerServices;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CoordinatorService implements ICoordinator {

    @Autowired
    private CoordinatorRepository coordinatorRepository;

    private List<Coordinator> coordinatorList;
    private String text="Coordinator";

    private static final Logger LOGGER = LogManager.getLogger(CoordinatorService.class);

    @Override
    public Response saveUpdateCoordinator(List<Coordinator> coordinators) {

        if(coordinators.isEmpty()==false){
            coordinatorList  =new ArrayList<>();
            coordinators.forEach(coordinator -> {
                LOGGER.info("saving data of coordinator for batch id: "+coordinator.getBatch().getBatchId());
                Coordinator persisted = coordinatorRepository.save(coordinator);
                LOGGER.info("Data saved successfully coordinator id : "+coordinator.getCoordinatorId());
                coordinatorList.add(persisted);
            });
            if(coordinatorList.isEmpty()==false){
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,coordinatorList);
            }else{
                return new Response(StaticResponse.FAILURE_Status,text+StaticResponse.ADD_FAIL_MESSAGE,null);
            }
        }
        else{
            LOGGER.info("No data found for saving...");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }

    @Override
    public Response getCoodinatorData(String empCode, Long batchId) {
        if(empCode!=null){
            LOGGER.info("Fetching batches data: "+batchId);
            coordinatorList= new ArrayList<>();
            EmployeeMaster employeeMaster= new EmployeeMaster();
            employeeMaster.setEmployeeCode(empCode);
            coordinatorList= coordinatorRepository.findByEmpCode(employeeMaster);
        }else{
            coordinatorList=new ArrayList<>();
            LOGGER.info("Fetching coordinators for batch id: "+batchId);
            BatchMaster batchMaster= new BatchMaster();
            batchMaster.setBatchId(batchId);
            coordinatorList= coordinatorRepository.findByBatch(batchMaster);
        }
        if(coordinatorList.isEmpty()==true){
            LOGGER.error("No data found...");
            return  new Response(StaticResponse.FAILURE_Status,StaticResponse.NO_DATA,null);
        }
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,coordinatorList);
    }
}
