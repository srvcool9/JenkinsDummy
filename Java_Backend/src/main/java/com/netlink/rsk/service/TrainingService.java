package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.dto.RoleAreaDTO;
import com.netlink.rsk.dto.TrainingDataDTO;
import com.netlink.rsk.mapper.TrainingMapper;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.model.TrainingArea;
import com.netlink.rsk.model.TrainingSubGroupMaster;
import com.netlink.rsk.repository.TrainingAreaRepository;
import com.netlink.rsk.repository.TrainingRepository;
import com.netlink.rsk.repository.TrainingSubGroupMasterRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

@Service
public class TrainingService implements ITraining {

    private static final Logger LOGGER = LogManager.getLogger(TrainingService.class);

    @Autowired
    private TrainingRepository trainingRepository;

    @Autowired
    private TrainingAreaRepository trainingAreaRepository;

    @Autowired
    private TrainingSubGroupMasterRepository trainingSubGroupMasterRepository;

    private List<Training> trainingList;
    private  String text="Training Master";

    @Override
    public Response getTraining(Long id) {
        if(id!=null){
            LOGGER.info("Fetching training for training id: "+id);
            Training training = trainingRepository.findById(id).get();
            trainingList = new ArrayList<>();
            trainingList.add(training);

        }else{
            LOGGER.info("Fetching  all training");
            trainingList = new ArrayList<>();
            trainingList = trainingRepository.findAll(Sort.by(Sort.Direction.DESC,"updatedOn"));
        }
        if(trainingList.isEmpty()==false){
            List<TrainingDataDTO> trainingDataDTOS =trainingDTOMapper(trainingList);
            return new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED, trainingDataDTOS);
        }
        LOGGER.error("No data found");;
        return new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
    }

   public List<TrainingDataDTO> trainingDTOMapper(List<Training> trainingList){
     List<TrainingDataDTO> trainingDataDTOList = new ArrayList<>();
     trainingList.forEach(training -> {
         TrainingDataDTO trainingDataDTO = new TrainingDataDTO();
         trainingDataDTO.setTrainingId(training.getTrainingId());
         trainingDataDTO.setTrainingName(training.getTrainingName());
         trainingDataDTO.setStartDate(training.getStartDate());
         trainingDataDTO.setEndDate(training.getEndDate());
         trainingDataDTO.setApproxTrainees(training.getApproxTrainees());
         trainingDataDTO.setMaximumBatchSize(training.getMaximumBatchSize());
         trainingDataDTO.setApproxTrainees(training.getMaximumBatchSize());
         trainingDataDTO.setTrainingLevelId(training.getTrainingLevelId());
         trainingDataDTO.setSubGroupId(training.getSubGroupId());
         trainingDataDTO.setNoOfDays(training.getNoOfDays());
         trainingDataDTO.setSubGroupName(training.getSubGroupId().getSubGroupName());
         trainingDataDTO.setMinimumTrainer(training.getMinimumTrainer());
         trainingDataDTO.setDescription(training.getDescription());
         TrainingSubGroupMaster trainingSubGroupMaster = trainingSubGroupMasterRepository.findById(training.getSubGroupId().getSubGroupId()).get();
         if(trainingSubGroupMaster!=null){
             trainingDataDTO.setGroupId(trainingSubGroupMaster.getGroup().getGroupId());
             trainingDataDTO.setGroupName(trainingSubGroupMaster.getGroup().getGroupName());
         }
         trainingDataDTO.setConfigured(training.getStatus());
         trainingDataDTO.setStatus(training.getStatus());
         trainingDataDTO.setIsActive(training.getIsActive());
         trainingDataDTOList.add(trainingDataDTO);
     });
        return trainingDataDTOList;
    }

    @Override
    public Response saveTraining(Training training) {
        if(training!=null){
            LOGGER.info("Saving training  "+training.getTrainingName());
            Training persisted = trainingRepository.save(training);
            trainingList = new ArrayList<>();
            trainingList.add(persisted);
            if(training.getTrainingId()!=null){
                LOGGER.info(training.getTrainingName()+ "training updated successfully");
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.UPDATE_SUCCESS_MESSAGE,null);
            }else{
                LOGGER.info(training.getTrainingName()+ "training saved successfully");
                return new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,null);
            }
        }
        else{
            LOGGER.error("Mandatory fields not provided");
            return new Response(StaticResponse.FAILURE_Status,StaticResponse.FIELD_MISSING,null);
        }
    }

    @Override
    @Transactional
    public Response getTrainingByArea(List<RoleAreaDTO> roleAreaDTOList) {
        String areaId=null;
        List<Long> areaIds= new ArrayList<>();
        roleAreaDTOList.forEach(roleAreaDTO -> {
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
         StringJoiner joinerNew = new StringJoiner(",");
         areaIds.forEach(area->{
             joinerNew.add(String.valueOf(area));
         });
         areaId=joinerNew.toString();

       List<TrainingMapper> data  = trainingAreaRepository.getUpGetTrainingAreaWise(areaId);
       if(data.isEmpty()==false){
           trainingList= new ArrayList<>();
           data.forEach(trainingMapper -> {
               Training persist= trainingRepository.findById(trainingMapper.getTrainingId()).get();
               trainingList.add(persist);
           });
           return new Response(StaticResponse.SUCCESS_Status, text + StaticResponse.DATA_FETCHED, trainingList);
       }
         return new Response(StaticResponse.SUCCESS_Status, text + StaticResponse.NO_DATA, null);
     }
         return new Response(StaticResponse.FAILURE_Status, text + StaticResponse.FIELD_MISSING, null);
    }


    private List<Training> sorting(List<Training> list) {
        //sorting data by time
        LOGGER.info("Sorting trainings........");
        Collections.sort(list, new Comparator<Training>() {
            @Override
            public int compare(Training o1, Training o2) {
                try {
                    LOGGER.info("Sorting Training...");
                    Long time1= o1.getUpdatedOn().getTime();
                    Long time2=new Date().getTime();
                    return time1.compareTo(time2);
                } catch (Exception e) {
                    LOGGER.error("Error (in sorting training....)"+" "+e.getMessage());
                    e.printStackTrace();
                    return 0;
                }
            }
        });
        return list;
    }

    @Override
    public Response getTrainingBySubGroup(Long id) {
        TrainingSubGroupMaster trainingSubGroupMaster = new TrainingSubGroupMaster();
        trainingSubGroupMaster.setSubGroupId(id);
        List<Training> trainingList = trainingRepository.findBysubGroupId(trainingSubGroupMaster);
        if(trainingList.isEmpty()==false){
            LOGGER.info("Fetching Training by SubGroup id "+id);
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED,trainingList);
        }else {
            LOGGER.error("Error! No data found!");
            return new Response(StaticResponse.FAILURE_Status, StaticResponse.NO_DATA, null);
        }
    }


}
