package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.dto.RoleAreaDTO;
import com.netlink.rsk.dto.TrainingAreaDTO;
import com.netlink.rsk.dto.TrainingDataDTO;
import com.netlink.rsk.model.*;
import com.netlink.rsk.repository.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainingAreaService implements ITrainingArea{

    private static final Logger LOGGER = LogManager.getLogger(TrainingAreaService.class);

    @Autowired
    private TrainingAreaRepository trainingAreaRepository;

    @Autowired
    private  StateMasterRepository stateRepository;

    @Autowired
    private  TrainingSubGroupMasterRepository trainingSubGroupMasterRepository;

    @Autowired
    private DivisionMasterRepository divisionRepository;

    @Autowired
    private DistrictMasterRepository districtRepository;

    @Autowired
    private BlockMasterRepository blockRepository;

    private String text="Training Area";
    private List<TrainingArea> trainingAreas;

    @Override
    public Response saveUpdateTrainingArea(List<TrainingArea> trainingAreas) {
        List<TrainingArea> savedTrainingAreas= new ArrayList<>();
        if(trainingAreas.isEmpty()!=true){
            trainingAreas.forEach(ta->{
                LOGGER.info("Saving training area :"+ ta.getAreaId());
           TrainingArea persisted=trainingAreaRepository.save(ta);
                LOGGER.info("Training area id "+ persisted.getAreaId()+ "saved successfully.");
           savedTrainingAreas.add(persisted);
            });
            if(savedTrainingAreas.isEmpty()!=true){
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,null);
            }
        }
        else {
            LOGGER.error("Error! No training area saved..");
            return new Response(StaticResponse.FAILURE_Status, StaticResponse.FIELD_MISSING, null);
        }
        return null;
    }

    @Override
    public Response getTrainingAreaList(Long id) {
        if(id!=null){
            LOGGER.info("Fetching training area for id: "+id);
            trainingAreas = new ArrayList<>();
            TrainingArea trainingArea = trainingAreaRepository.findById(id).get();
            trainingArea.setTrainingArea(getAreaData(trainingArea.getAreaId(),trainingArea.getTrainingTypeId().getId()));
            trainingAreas.add(trainingArea);
        }else {
            LOGGER.info("Fetching data for all training areas..");
            trainingAreas = new ArrayList<>();
            trainingAreas = trainingAreaRepository.findAll();
            trainingAreas.stream().filter(trainingArea -> {
                if(trainingArea.getAreaId()!=null) {
                    trainingArea.setTrainingArea(
                            getAreaData(trainingArea.getAreaId(), trainingArea.getTrainingTypeId().getId()));
                }return false;
            }).collect(Collectors.toList());
        }
        if(trainingAreas.isEmpty()==true){
            LOGGER.info("No data found...");
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }else{
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,trainingAreas);
        }
    }

    @Override
    public Response getAreasByTrainingId(Long id) {
        Training training=  new Training();
        training.setTrainingId(id);
        trainingAreas = new ArrayList<>();
        trainingAreas = trainingAreaRepository.findByTraining(training);
        trainingAreas.stream().filter(trainingArea -> {
            if(trainingArea.getAreaId()!=null) {
                trainingArea.setTrainingArea(
                        getAreaData(trainingArea.getAreaId(), trainingArea.getTrainingTypeId().getId()));
            }return false;
        }).collect(Collectors.toList());

        List<Object> list = new ArrayList<>();
        trainingAreas.stream().filter(trainingArea -> {
            TrainingAreaDTO trainingAreaDTO = new TrainingAreaDTO();
            Training training1 = new Training();
            training1.setTrainingId(trainingArea.getTraining().getTrainingId());
            trainingAreaDTO.setTraining(training1);
            trainingAreaDTO.setAreaId(trainingArea.getAreaId());
            trainingAreaDTO.setTrainingAreaId(trainingArea.getTrainingAreaId());
            EntityMaster trainingTypeId= new EntityMaster();
            trainingTypeId.setId(trainingArea.getTrainingTypeId().getId());
            trainingTypeId.setEntityName(trainingArea.getTrainingTypeId().getEntityName());
            trainingAreaDTO.setTrainingTypeId(trainingTypeId);
            trainingAreaDTO.setTrainingArea(trainingArea.getTrainingArea());
            list.add(trainingAreaDTO);
            return false;
        }).collect(Collectors.toList());

        if(list.isEmpty()==true){
            LOGGER.info("No data found...");
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }else{
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,list);
        }
    }

    public Object getAreaData(Long areaId,Long typeId){
        LOGGER.info("Fetching area data on the basis of training type....");
        if(typeId==40){
            LOGGER.info("Fetching state data for the training");
            StateMaster state = stateRepository.findById(areaId).get();
            if(state!=null){
                return state;
            }
        }
        else if (typeId==41){
            LOGGER.info("Fetching division data for the training");
            DivisionMaster division= divisionRepository.findById(areaId).get();
            if(division!=null){
                return division;
            }
        }
        else if(typeId==42){
            LOGGER.info("Fetching district data for the training");
            DistrictMaster districtMaster=  districtRepository.findById(String.valueOf(areaId)).get();
            if(districtMaster!=null) {
                return districtMaster;
            }
        }else {
            LOGGER.info("Fetching block data for the training");
            BlockMaster blockMaster = blockRepository.findById(String.valueOf(areaId)).get();
            if (blockMaster != null){
                return blockMaster;}
        }
        return new Object();
   }

    @Override
    public Response deleteArea(Long id) {
        trainingAreaRepository.deleteById(id);
        return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.DELETE_SUCCESS,null);
    }

    @Override
    public Response getUserRespectiveTraining(List<RoleAreaDTO> roleAreaDTOS) {
        List<TrainingArea> trainingAreaList= new ArrayList<>();
        List<Long> areaIds= new ArrayList<>();
        roleAreaDTOS.forEach(roleAreaDTO -> {
            LOGGER.info("Fetching all area id into list...");
            if(roleAreaDTO.getDivisionId()!=null){
                areaIds.add(roleAreaDTO.getDivisionId());
            }
            if (roleAreaDTO.getDistrictId()!=null) {
                areaIds.add(roleAreaDTO.getDistrictId());
            }
            if (roleAreaDTO.getBlockId()!=null) {
                areaIds.add(roleAreaDTO.getBlockId());
            }
            if (roleAreaDTO.getClusterId()!=null) {
                areaIds.add(roleAreaDTO.getClusterId());
            }
            if (roleAreaDTO.getSchoolId()!=null) {
                areaIds.add(roleAreaDTO.getSchoolId());
            }
        });

        if(areaIds.isEmpty()==false){
            areaIds.forEach(areaId->{
                LOGGER.info("Fetching trainings for  area id: " + areaId);
                List<TrainingArea> trainingAreas = trainingAreaRepository.findByAreaId(areaId);
                trainingAreaList.addAll(trainingAreas);
            });
            if(trainingAreaList.isEmpty()==false){
                List<TrainingDataDTO> trainingsData= new ArrayList<>();
//                trainingsData = getTrainingGroups(trainingAreaList);
                trainingsData = trainingAreaDTOMapper(trainingAreaList);
                LOGGER.info("Fetching training area whose training status is configured");
              List<TrainingDataDTO> configuredTraining= new ArrayList<>();
//                configuredTraining= trainingsData.stream().filter(trainingArea -> trainingArea.getTraining().getStatus().getId().equals(52l)).collect(Collectors.toList());
                configuredTraining= trainingsData.stream().filter(trainingArea -> trainingArea.getConfigured().getId().equals(52l)).collect(Collectors.toList());
                return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,configuredTraining);
            }else{
                LOGGER.info("No data found for training area ids");
                return new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
            }
        }
        LOGGER.info("Invalid/No area ids provided");
        return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
    }

  public List<TrainingArea>  getTrainingGroups(List<TrainingArea> list){

      List<TrainingArea> trainingAreaList= new ArrayList<>();
      list.forEach(trainingArea -> {
          TrainingArea trainingArea1= new TrainingArea();
            TrainingSubGroupMaster trainingSubGroupMaster=new TrainingSubGroupMaster();
            trainingSubGroupMaster= trainingSubGroupMasterRepository.findById(trainingArea.getTraining().getSubGroupId().getSubGroupId()).get();
            Training training= new Training();
            training=trainingArea.getTraining();
            training.setGroup(trainingSubGroupMaster.getGroup());
          trainingArea.setTraining(training);

        });
        return list;
  }

    public List<TrainingDataDTO> trainingAreaDTOMapper(List<TrainingArea> trainingList){
        List<TrainingDataDTO> trainingDataDTOList = new ArrayList<>();
        trainingList.forEach(trainingArea -> {
            TrainingDataDTO trainingDataDTO = new TrainingDataDTO();
            trainingDataDTO.setTrainingId(trainingArea.getTraining().getTrainingId());
            trainingDataDTO.setTraining(trainingArea.getTraining());
            trainingDataDTO.setTrainingName(trainingArea.getTraining().getTrainingName());
            trainingDataDTO.setTrainingTypeId(trainingArea.getTrainingTypeId());
            trainingDataDTO.setAreaId(trainingArea.getAreaId());
            trainingDataDTO.setTrainingAreaId(trainingArea.getTrainingAreaId());
            trainingDataDTO.setStartDate(trainingArea.getTraining().getStartDate());
            trainingDataDTO.setEndDate(trainingArea.getTraining().getEndDate());
            trainingDataDTO.setApproxTrainees(trainingArea.getTraining().getApproxTrainees());
            trainingDataDTO.setMaximumBatchSize(trainingArea.getTraining().getMaximumBatchSize());
            trainingDataDTO.setApproxTrainees(trainingArea.getTraining().getMaximumBatchSize());
            trainingDataDTO.setTrainingLevelId(trainingArea.getTraining().getTrainingLevelId());
            trainingDataDTO.setSubGroupId(trainingArea.getTraining().getSubGroupId());
            trainingDataDTO.setNoOfDays(trainingArea.getTraining().getNoOfDays());
            trainingDataDTO.setInitiateTrainingStatus(trainingArea.getStatus());
            trainingDataDTO.setSubGroupName(trainingArea.getTraining().getSubGroupId().getSubGroupName());
            TrainingSubGroupMaster trainingSubGroupMaster = trainingSubGroupMasterRepository.findById(trainingArea.getTraining().getSubGroupId().getSubGroupId()).get();
            if(trainingSubGroupMaster!=null){
                trainingDataDTO.setGroupId(trainingSubGroupMaster.getGroup().getGroupId());
                trainingDataDTO.setGroupName(trainingSubGroupMaster.getGroup().getGroupName());
            }
            trainingDataDTO.setConfigured(trainingArea.getTraining().getStatus());
            trainingDataDTO.setStatus(trainingArea.getTraining().getStatus());
            trainingDataDTO.setIsActive(trainingArea.getTraining().getIsActive());
            trainingDataDTOList.add(trainingDataDTO);
        });
        return trainingDataDTOList;
    }

}
