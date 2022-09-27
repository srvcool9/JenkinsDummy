package com.netlink.rsk.service;

import com.netlink.rsk.constants.StaticResponse;
import com.netlink.rsk.dto.Response;
import com.netlink.rsk.model.Training;
import com.netlink.rsk.model.TrainingMaterial;
import com.netlink.rsk.repository.TrainingMaterialRepository;
import com.netlink.rsk.utility.FileUtility;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
public class TrainingMaterialService implements ITrainingMaterial{

    private static final Logger LOGGER = LogManager.getLogger(TrainingMaterialService.class);

    private  List<TrainingMaterial> materialList;
    private  String text="Training Material ";

    @Autowired
    private TrainingMaterialRepository materialRepository;

    @Autowired
    private FileUtility fileUtility;

    @Override
    @Transactional
    public Response saveTrainingDocuments(List<TrainingMaterial> trainingMaterials, List<MultipartFile> files) throws Exception {
        if(trainingMaterials.isEmpty()!=true)
        {
            Long trainingId =trainingMaterials.get(0).getTrainingId().getTrainingId();
           trainingMaterials.forEach(tm-> {
               LOGGER.info("Adding document for training id: "+trainingId);
               if(tm.getLinkName()!=null || tm.getLinkPath()!=null){
               TrainingMaterial persist= materialRepository.save(tm);
               }
           });
            for (MultipartFile file : files) {
                TrainingMaterial material = new TrainingMaterial();
                Training training = new Training();
                training.setTrainingId(trainingId);
                String docType = file.getContentType();
                String fileName = StaticResponse.TRAINING_DOC_PREFIX + trainingId+ StaticResponse.SEPRATOR +files.indexOf(file)+ file.getOriginalFilename();
                fileUtility.save(file);
                Path filePath = fileUtility.getRoot(file.getOriginalFilename());
                material.setTrainingId(training);
                material.setDocumentName(fileName);
                material.setDocumentPath(filePath.toString());
                LOGGER.info("Adding document for training id: "+trainingId);
                TrainingMaterial persisted= materialRepository.save(material);
            }
        }else{
            LOGGER.info("No data found for training material");
            return  new Response(StaticResponse.FAILURE_Status,StaticResponse.NO_DATA,null);
        }
        return  new Response(StaticResponse.SUCCESS_Status,text+StaticResponse.ADD_SUCCESS_MESSAGE,null);
    }

    @Override
    public Response getTrainingMaterialData(Long id) {
        if(id!=null){
            LOGGER.info("Fetching data for training material id...."+id);
            TrainingMaterial trainingMaterial= materialRepository.findById(id).get();
            materialList= new ArrayList<>();
            materialList.add(trainingMaterial);
        }else{
            materialList=new ArrayList<>();
            LOGGER.info("Fetching all data for training material");
            materialList= materialRepository.findAll();
        }
        if(materialList.isEmpty()==true){
            LOGGER.info("No data found for training material");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,materialList);
    }

    @Override
    public Response fetchByTrainingId(Long id) {
        materialList= new ArrayList<>();
        Training training= new Training();
        training.setTrainingId(id);
        materialList= materialRepository.findByTrainingId(training);
        if(materialList.isEmpty()==true){
            LOGGER.info("No data found for training material");
            return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.NO_DATA,null);
        }
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DATA_FETCHED ,materialList);
    }

    @Override
    public Response deleteMaterial(Long id) {
        materialRepository.deleteById(id);
        return  new Response(StaticResponse.SUCCESS_Status,StaticResponse.DELETE_SUCCESS,null);
    }
}
